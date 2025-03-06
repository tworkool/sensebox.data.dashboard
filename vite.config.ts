import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
/* import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory */

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@public": path.resolve(__dirname, "public"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@stores": path.resolve(__dirname, "src/stores"),
      "@api": path.resolve(__dirname, "src/api"),
      "@packages": path.resolve(__dirname, "src/packages"),
    },
  },
  plugins: [react()],
});
