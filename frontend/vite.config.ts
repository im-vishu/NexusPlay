import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "../dist", // Vercel serves the root dist folder as the static output.
    emptyOutDir: true,
    chunkSizeWarningLimit: 800, // increase warning threshold (kB)
  },
  server: {
    proxy: {
      "/api": "http://localhost:3030",
    },
  },
});
