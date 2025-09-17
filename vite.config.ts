import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router", "react-router-dom"],
          ui: ["formik", "yup"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: "terser",
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "formik", "yup"],
  },
});
