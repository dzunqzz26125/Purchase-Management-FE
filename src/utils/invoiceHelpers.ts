import type { PurchaseOrder } from "../api/purchaseOrderApi";
import type { SalesOrder } from "../api/salesOrderApi";

export type InvoiceType = "PO" | "SO";

export type InvoiceOrder = PurchaseOrder | SalesOrder;

export const isPurchaseOrder = (
  order: InvoiceOrder,
  type: InvoiceType,
): order is PurchaseOrder => type === "PO";

export const getInvoiceCode = (type: InvoiceType, order: InvoiceOrder): string => {
  if (type === "PO") return (order as PurchaseOrder).batchCode;
  return (order as SalesOrder).orderCode;
};

export const getInvoiceViewPath = (type: InvoiceType, orderId: string): string =>
  `/app/invoices/${type.toLowerCase()}/${orderId}`;

export const getInvoiceViewUrl = (type: InvoiceType, orderId: string): string => {
  const path = getInvoiceViewPath(type, orderId);
  if (typeof window !== "undefined") {
    return `${window.location.origin}${path}`;
  }
  return path;
};

export const getInvoicePdfFilename = (type: InvoiceType, order: InvoiceOrder): string => {
  const code = getInvoiceCode(type, order);
  const prefix = type === "PO" ? "Phieu-nhap" : "Hoa-don-ban";
  return `${prefix}-${code}.pdf`;
};

export const parseInvoiceRouteType = (value: string | undefined): InvoiceType | null => {
  const normalized = value?.toUpperCase();
  if (normalized === "PO" || normalized === "SO") return normalized;
  return null;
};
