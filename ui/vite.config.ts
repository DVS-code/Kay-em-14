import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "../certs/key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "../certs/cert.pem")),
    },
    proxy: {
      "/system": { target: "https://localhost:8000", changeOrigin: true, secure: false },
      "/pm2": { target: "https://localhost:8000", changeOrigin: true, secure: false },
      "/systemd": { target: "https://localhost:8000", changeOrigin: true, secure: false },
      "/nas": { target: "https://localhost:8000", changeOrigin: true, secure: false },
      "/recommendations": { target: "https://localhost:8000", changeOrigin: true, secure: false },
    },
  },
});
