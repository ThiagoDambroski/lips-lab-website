import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  const isNetlify = process.env.NETLIFY === "true"; // Netlify sets this automatically

  return {
    plugins: [react()],
    base: isNetlify ? "/" : "/lips-lab-website/",
  };
});
