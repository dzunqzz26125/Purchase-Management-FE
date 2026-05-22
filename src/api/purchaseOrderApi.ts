import api from "./client";
import { unwrap } from "./types";

export type POItem = {
  productId: string;
  qtyOrdered: number;
  qtyReceived: number;
  costPrice: number;
  total: number;
};

export type PurchaseOrder = {
  _id: string;
  batchCode: string;
  providerId: string | { _id: string; name: string; debt?: number };
  items: POItem[];
  expectedTotal: number;
  actualTotal: number;
  paidAmount: number;
  debtAmount: number;
  status: "created" | "checking" | "completed" | "cancelled";
  createdAt: string;
};

export type CreatePOInput = {
  providerId: string;
  items: { productId: string; qtyOrdered: number; costPrice: number }[];
  paidAmount?: number;
  note?: string;
};

export type CompletePOInput = {
  items: { productId: string; qtyReceived: number }[];
  paidAmount?: number;
};

export const purchaseOrderApi = {
  list: async (): Promise<PurchaseOrder[]> =>
    unwrap(await api.get("/purchase-orders")),
  getById: async (id: string) => unwrap(await api.get(`/purchase-orders/${id}`)),
  create: async (input: CreatePOInput) =>
    unwrap(await api.post("/purchase-orders", input)),
  complete: async (id: string, input: CompletePOInput) =>
    unwrap(await api.post(`/purchase-orders/${id}/complete`, input)),
  remove: async (id: string) => unwrap(await api.delete(`/purchase-orders/${id}`)),
};
