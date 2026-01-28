import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite base is set to "/" because this is deployed to username.github.io root.
export default defineConfig({
  base: "/",
  plugins: [react()]
});
