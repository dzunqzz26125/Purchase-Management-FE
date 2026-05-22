import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const DEPLOYED_API = "https://purchase-management-be.onrender.com/api";

/** Bỏ qua VITE_API_URL trỏ localhost (biến hệ thống / .env.local cũ). */
function resolveApiUrl(mode: string): string {
  const env = loadEnv(mode, ".", "");
  const raw = env.VITE_API_URL?.trim();
  if (raw && !/localhost|127\.0\.0\.1/i.test(raw)) {
    return raw.replace(/\/$/, "");
  }
  return DEPLOYED_API;
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const apiUrl = resolveApiUrl(mode);

  return {
    plugins: [react()],
    define: {
      "import.meta.env.VITE_API_URL": JSON.stringify(apiUrl),
    },
  };
});
