import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  let apiUrl = env.VITE_API_URL?.trim() ?? "";

  if (/localhost|127\.0\.0\.1/i.test(apiUrl)) {
    if (mode === "production") {
      throw new Error(
        "VITE_API_URL trỏ localhost. Xóa biến môi trường Windows/Netlify cũ; dùng .env.production hoặc netlify.toml.",
      );
    }
    apiUrl = "";
  }

  if (!apiUrl) {
    throw new Error(
      `Thiếu VITE_API_URL (mode: ${mode}). Thêm vào .env / .env.production hoặc Netlify Environment variables.`,
    );
  }

  const normalized = apiUrl.replace(/\/$/, "");

  return {
    plugins: [react()],
    define: {
      "import.meta.env.VITE_API_URL": JSON.stringify(normalized),
    },
  };
});
