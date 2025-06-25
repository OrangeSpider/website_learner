import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Use GitHub Pages base path only for the production build
  base: command === "build" ? "/learning-quiz-ai/" : "/",
}));
