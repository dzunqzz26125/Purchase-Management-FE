import axios from "axios";

/** Backend production trên Render */
export const DEPLOYED_API_BASE =
  "https://purchase-management-be.onrender.com/api";

/**
 * Luôn ưu tiên API public. Bỏ qua VITE_API_URL trỏ localhost (từ .env.local hoặc biến môi trường cũ).
 */
export const resolveApiBaseUrl = (): string => {
  const fromEnv = import.meta.env.VITE_API_URL?.trim();
  if (fromEnv && !/localhost|127\.0\.0\.1/i.test(fromEnv)) {
    return fromEnv.replace(/\/$/, "");
  }
  return DEPLOYED_API_BASE;
};

export const API_BASE_URL = resolveApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const getAccessToken = (): string | null => {
  const raw = localStorage.getItem("accessToken");
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "string" ? parsed : raw;
  } catch {
    return raw;
  }
};

export const setAccessToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const clearAccessToken = () => {
  localStorage.removeItem("accessToken");
};

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
