import axios from "axios";
import { API_BASE_URL } from "./config";

export { API_BASE_URL };

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

/** Luôn gọi backend Render; chặn localhost / URL tuyệt đối lệch host. */
api.interceptors.request.use((config) => {
  config.baseURL = API_BASE_URL;

  const url = config.url ?? "";
  if (/^https?:\/\//i.test(url)) {
    if (/localhost|127\.0\.0\.1/i.test(url)) {
      const path = url.replace(/^https?:\/\/[^/]+/i, "") || "/";
      config.url = path.startsWith("/") ? path : `/${path}`;
    }
  } else if (url && !url.startsWith("/")) {
    config.url = `/${url}`;
  }

  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default api;
