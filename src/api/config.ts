/**
 * Một base URL duy nhất cho toàn bộ app (DB online trên Render).
 * Mọi request: API_BASE_URL + path, ví dụ:
 *   /auth/login    → .../api/auth/login
 *   /products      → .../api/products
 */
export const API_BASE_URL =
  "https://purchase-management-be.onrender.com/api" as const;
