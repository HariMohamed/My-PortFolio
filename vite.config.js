import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve("index.html"),
        syndicai: resolve("projects/syndicai/index.html"),
        elalaouiLabo: resolve("projects/elalaoui-labo/index.html"),
        gymCoachingSaas: resolve("projects/gym-coaching-saas/index.html"),
        cfqmaPlatform: resolve("projects/cfqma-platform/index.html"),
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
