import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "../server/dist_front", // ⬅ esto es CLAVE
    emptyOutDir: true,
  },
  server: {
    proxy: {
      "/room": "http://localhost:3000",
      "/game": "http://localhost:3000",
    },
  },
});
