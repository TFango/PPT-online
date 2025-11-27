import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/room": "http://localhost:3000",
      "/game": "http://localhost:3000",
    },
  },
});