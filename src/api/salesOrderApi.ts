import api from "./client";
import { unwrap } from "./types";

export type SOItem = {
  productId: string;
  qty: number;
  price: number;
  total: number;
};

export type SalesOrder = {
  _id: string;
  orderCode: string;
  customerName?: string;
  customerPhone?: string;
  customerId?: string | { _id: string; name: string; debt?: number };
  items: SOItem[];
  grandTotal: number;
  paidAmount: number;
  debtAmount: number;
  paymentMethod: "cash" | "transfer";
  paymentStatus: "unpaid" | "partial" | "paid";
  status: string;
  createdAt: string;
};

export type CreateSOInput = {
  customerId?: string;
  customerName?: string;
  customerPhone?: string;
  items: { productId: string; qty: number; price: number }[];
  paymentMethod: "cash" | "transfer";
  paidAmount?: number;
  note?: string;
};

export const salesOrderApi = {
  list: async (): Promise<SalesOrder[]> => unwrap(await api.get("/sales-orders")),
  create: async (input: CreateSOInput) =>
    unwrap(await api.post("/sales-orders", input)),
  remove: async (id: string) => unwrap(await api.delete(`/sales-orders/${id}`)),
};
