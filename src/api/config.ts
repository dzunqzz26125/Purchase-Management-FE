/**
 * Base URL API — lấy từ biến môi trường build-time VITE_API_URL (.env / Netlify).
 * Mọi module *Api.ts và auth forms dùng axios client → URL này.
 */
const raw = import.meta.env.VITE_API_URL?.trim();

if (!raw) {
  throw new Error(
    "Thiếu VITE_API_URL. Tạo .env với VITE_API_URL=https://.../api hoặc cấu hình trên Netlify.",
  );
}

if (import.meta.env.PROD && /localhost|127\.0\.0\.1/i.test(raw)) {
  throw new Error(
    "Production không được dùng VITE_API_URL trỏ localhost. Sửa biến môi trường trên Netlify.",
  );
}

export const API_BASE_URL = raw.replace(/\/$/, "");
