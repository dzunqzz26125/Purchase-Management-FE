/**
 * Tất cả module API dùng chung axios client → API_BASE_URL (Render).
 *
 * auth:        /auth/login, /auth/register, /auth/logout
 * products:    /products, /categories
 * providers:   /providers
 * customers:   /customers
 * purchase:    /purchase-orders
 * sales:       /sales-orders
 * payments:    /payments
 * analytics:   /analytics/dashboard
 */
export { API_BASE_URL } from "./config";
export { default as api } from "./client";
export * from "./productApi";
export * from "./providerApi";
export * from "./customerApi";
export * from "./purchaseOrderApi";
export * from "./salesOrderApi";
export * from "./paymentApi";
export * from "./analyticsApi";
