import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/BuildMaster/", // 👈 matches your repo name
  plugins: [react()],
});
