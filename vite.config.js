import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { loadProjects } from "./scripts/load-projects.mjs";

const slugs = (await loadProjects()).map((project) => project.slug);

const projectInputs = {};
slugs.forEach((slug) => {
  projectInputs[slug] = resolve(`projects/${slug}/index.html`);
});

// Dev only: serves api/chat.js at /api/chat so the assistant works under `npm run dev`
// (in production Vercel runs the same handler as a serverless function).
function localChatApi() {
  return {
    name: "local-chat-api",
    apply: "serve",
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), "");
      if (env.GROQ_API_KEY && !process.env.GROQ_API_KEY) process.env.GROQ_API_KEY = env.GROQ_API_KEY;
      server.middlewares.use("/api/chat", async (req, res) => {
        const send = (status, payload) => {
          res.statusCode = status;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(payload));
        };
        try {
          const chunks = [];
          let size = 0;
          for await (const chunk of req) {
            size += chunk.length;
            if (size > 64 * 1024) return send(413, { error: "Request is too large." });
            chunks.push(chunk);
          }
          const raw = Buffer.concat(chunks).toString("utf8");
          let body = raw;
          try { body = raw ? JSON.parse(raw) : undefined; } catch { /* the handler answers 400 */ }
          const { default: handler } = await server.ssrLoadModule("/api/chat.js");
          res.status = (code) => { res.statusCode = code; return res; };
          res.json = (payload) => send(res.statusCode, payload);
          await handler(Object.assign(req, { body }), res);
        } catch (error) {
          server.config.logger.error("Local /api/chat failed: " + (error?.message || "unknown error"));
          if (!res.headersSent) send(500, { error: "An internal server error occurred." });
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    localChatApi(),
    {
      name: "preview-rewrite",
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url.match(/^\/projects\/[^/.\?]+$/)) {
            req.url = req.url + "/index.html";
          }
          next();
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve("index.html"),
        ...projectInputs,
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
