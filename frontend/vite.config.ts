import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
<<<<<<< codex/run-website-with-node.js
  // Use GitHub Pages base path only for the production build
  base: command === "build" ? "/learning-quiz-ai/" : "/",
}));
=======
  // Base path needed for GitHub Pages deployment
  base: "/website_learner/",
});
>>>>>>> main
