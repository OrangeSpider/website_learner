import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Base path needed for GitHub Pages deployment
  base: "/learning-quiz-ai/",
});
