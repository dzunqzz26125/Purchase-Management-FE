import api from "./client";
import { unwrap } from "./types";

export type DashboardAnalytics = {
  summary: {
    totalProducts: number;
    lowStockProducts: number;
    completedSalesOrders: number;
    providerDebt: number;
    customerDebt: number;
    monthlyRevenue: number;
    monthlyCollected: number;
    monthlyOrders: number;
  };
  topProducts: {
    productId: string;
    name?: string;
    sku?: string;
    totalQty: number;
    revenue: number;
  }[];
  stockByCategory: {
    _id: string;
    categoryName?: string;
    totalStock: number;
    productCount: number;
  }[];
  debtReport: {
    payables: number;
    receivables: number;
  };
};

export const analyticsApi = {
  dashboard: async (): Promise<DashboardAnalytics> =>
    unwrap(await api.get("/analytics/dashboard")),
};
