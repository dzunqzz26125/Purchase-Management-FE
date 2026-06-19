import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const apiUrl = env.VITE_API_URL?.trim() ?? "";

  if (!apiUrl) {
    throw new Error(
      `Thiếu VITE_API_URL (mode: ${mode}). Thêm vào .env / .env.development (local) hoặc .env.production (deploy).`,
    );
  }

  // Khi deploy Netlify thật, bật lại guard và đổi VITE_API_URL trong .env.production
  // if (
  //   mode === "production" &&
  //   /localhost|127\.0\.0\.1/i.test(apiUrl)
  // ) {
  //   throw new Error(
  //     "VITE_API_URL trỏ localhost trong production. Dùng URL deploy trong .env.production hoặc Netlify.",
  //   );
  // }

  const normalized = apiUrl.replace(/\/$/, "");

  return {
    plugins: [react()],
    define: {
      "import.meta.env.VITE_API_URL": JSON.stringify(normalized),
    },
    optimizeDeps: {
      include: ["react-qr-code", "react-to-print", "html2canvas", "jspdf"],
    },
  };
});
