import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
// We're keeping the runtime error overlay commented out since it was causing issues
// import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

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
    // Removing runtime error overlay since it was causing issues
    // runtimeErrorOverlay(),
    themePlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
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
