import api from "./client";
import { unwrap } from "./types";

export type DashboardAnalytics = {
  summary: {
    totalProducts: number;
    lowStockProducts: number;
    completedSalesOrders: number;
    providerDebt: number;
    customerDebt: number;
    
    periodRevenue?: number;
    periodCollected?: number;
    periodOrders?: number;
    periodImported?: number;
    periodPaidToProviders?: number;
    periodPOCount?: number;

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

export type StockActivity = {
  _id: string;
  productId: {
    _id: string;
    name: string;
    sku: string;
    unit: string;
  } | null;
  type: "import" | "export" | "adjustment";
  qty: number;
  before: number;
  after: number;
  referenceType: "purchase" | "sale" | "manual";
  referenceId: string;
  batchCode?: string;
  note?: string;
  createdBy: {
    _id: string;
    name: string;
  } | null;
  createdAt: string;
};

export type PaginatedActivities = {
  activities: StockActivity[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
};

export const analyticsApi = {
  dashboard: async (params?: { startDate?: string; endDate?: string }): Promise<DashboardAnalytics> =>
    unwrap(await api.get("/analytics/dashboard", { params })),
  activities: async (params: { page: number; limit: number; startDate?: string; endDate?: string }): Promise<PaginatedActivities> =>
    unwrap(await api.get("/analytics/activities", { params })),
};
