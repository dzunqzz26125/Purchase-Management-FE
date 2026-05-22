import type { AxiosError } from "axios";
import type { ApiResponse } from "./types";

export const getApiErrorMessage = (
  error: unknown,
  fallback = "Có lỗi xảy ra. Vui lòng thử lại.",
): string => {
  const axiosError = error as AxiosError<ApiResponse<unknown>>;
  const message = axiosError.response?.data?.message;
  if (typeof message === "string" && message.trim()) {
    return message;
  }
  if (axiosError.message) {
    return axiosError.message;
  }
  return fallback;
};
