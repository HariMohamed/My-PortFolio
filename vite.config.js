import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import fs from "fs";

const projectsFile = fs.readFileSync(resolve("src/data/projects.js"), "utf8");
const slugs = [...projectsFile.matchAll(/slug: "(.*?)"/g)].map(m => m[1]);

const projectInputs = {};
slugs.forEach((slug) => {
  projectInputs[slug] = resolve(`projects/${slug}/index.html`);
});

export default defineConfig({
  plugins: [
    react(),
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
