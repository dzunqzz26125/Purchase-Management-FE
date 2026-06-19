import type { PurchaseOrder } from "../api/purchaseOrderApi";
import type { SalesOrder } from "../api/salesOrderApi";
import type { InvoiceOrder, InvoiceType } from "./invoiceHelpers";

type PopulatedRef = {
  name?: string;
  phone?: string;
  email?: string;
};

type LineItem = {
  productId?: string | { name?: string; unit?: string };
  qtyOrdered?: number;
  qty?: number;
  costPrice?: number;
  price?: number;
  total?: number;
};

const asObject = (value: unknown): PopulatedRef | null =>
  typeof value === "object" && value !== null ? (value as PopulatedRef) : null;

export const getInvoicePartnerName = (
  type: InvoiceType,
  order: InvoiceOrder,
): string => {
  if (type === "PO") {
    return asObject((order as PurchaseOrder).providerId)?.name ?? "Nhà cung cấp";
  }
  const so = order as SalesOrder;
  return (
    so.customerName ??
    asObject(so.customerId)?.name ??
    "Khách hàng lẻ"
  );
};

export const getInvoicePartnerPhone = (
  type: InvoiceType,
  order: InvoiceOrder,
): string => {
  if (type === "PO") {
    return asObject((order as PurchaseOrder).providerId)?.phone ?? "—";
  }
  const so = order as SalesOrder;
  return so.customerPhone ?? asObject(so.customerId)?.phone ?? "—";
};

export const getInvoicePartnerEmail = (
  type: InvoiceType,
  order: InvoiceOrder,
): string => {
  if (type === "PO") {
    return asObject((order as PurchaseOrder).providerId)?.email ?? "—";
  }
  return asObject((order as SalesOrder).customerId)?.email ?? "—";
};

export const getInvoiceProductName = (item: LineItem): string => {
  const product = asObject(item.productId);
  if (product?.name) return product.name;
  return "Sản phẩm";
};

export const getInvoiceProductUnit = (item: LineItem): string => {
  const product = item.productId;
  if (typeof product === "object" && product?.unit) return product.unit;
  return "cái";
};

export const getInvoiceLineQty = (type: InvoiceType, item: LineItem): number => {
  if (type === "PO") return item.qtyOrdered ?? 0;
  return item.qty ?? 0;
};

export const getInvoiceLinePrice = (type: InvoiceType, item: LineItem): number => {
  if (type === "PO") return item.costPrice ?? 0;
  return item.price ?? 0;
};

export const getInvoiceLineTotal = (
  type: InvoiceType,
  item: LineItem,
): number => {
  if (item.total != null) return item.total;
  const qty = getInvoiceLineQty(type, item);
  const price = getInvoiceLinePrice(type, item);
  return qty * price;
};
