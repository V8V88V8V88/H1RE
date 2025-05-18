import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react({
      // Improve React plugin performance
      babel: {
        plugins: [
          // Add plugin for better React performance 
          ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }]
        ]
      }
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    // Improve build performance
    target: "es2020",
    sourcemap: process.env.NODE_ENV !== "production",
    minify: process.env.NODE_ENV === "production",
  },
  // Add server configuration for better development experience
  server: {
    hmr: {
      // Improve HMR reliability
      timeout: 10000,
      overlay: false,
    },
    // Prevent CORS issues during development
    cors: true,
  },
  // Improve error handling
  optimizeDeps: {
    exclude: [], // List packages that should be excluded from optimization
  },
});
