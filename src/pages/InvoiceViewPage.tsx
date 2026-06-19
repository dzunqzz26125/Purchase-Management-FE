import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import InvoiceActions from "../components/client/InvoiceActions";
import { purchaseOrderApi, type PurchaseOrder } from "../api/purchaseOrderApi";
import { salesOrderApi, type SalesOrder } from "../api/salesOrderApi";
import {
  parseInvoiceRouteType,
  type InvoiceOrder,
  type InvoiceType,
} from "../utils/invoiceHelpers";

const InvoiceViewPage = () => {
  const { type: typeParam, id } = useParams<{ type: string; id: string }>();
  const invoiceType = parseInvoiceRouteType(typeParam);

  const poQuery = useQuery<PurchaseOrder>({
    queryKey: ["purchase-orders", "detail", id],
    queryFn: () => purchaseOrderApi.getById(id!),
    enabled: invoiceType === "PO" && Boolean(id),
  });

  const soQuery = useQuery<SalesOrder>({
    queryKey: ["sales-orders", "detail", id],
    queryFn: () => salesOrderApi.getById(id!),
    enabled: invoiceType === "SO" && Boolean(id),
  });

  if (!invoiceType || !id) {
    return (
      <div className="rounded-2xl border border-surface-container bg-surface-bright p-lg">
        <p className="text-error">Link hóa đơn không hợp lệ.</p>
        <Link to="/app/dashboard" className="text-primary underline mt-sm inline-block">
          Về trang chủ
        </Link>
      </div>
    );
  }

  const isLoading =
    invoiceType === "PO" ? poQuery.isLoading : soQuery.isLoading;
  const isError = invoiceType === "PO" ? poQuery.isError : soQuery.isError;
  const order: InvoiceOrder | undefined =
    invoiceType === "PO" ? poQuery.data : soQuery.data;

  if (isLoading) {
    return <p className="text-secondary">Đang tải hóa đơn...</p>;
  }

  if (isError || !order) {
    return (
      <div className="rounded-2xl border border-surface-container bg-surface-bright p-lg">
        <p className="text-error">Không tìm thấy hóa đơn hoặc bạn không có quyền xem.</p>
        <Link to="/app/dashboard" className="text-primary underline mt-sm inline-block">
          Về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-md">
      <div className="flex items-center gap-sm print:hidden">
        <Link
          to={invoiceType === "PO" ? "/app/po" : "/app/so"}
          className="text-primary text-label-sm font-semibold hover:underline flex items-center gap-0.5"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Quay lại {invoiceType === "PO" ? "đơn nhập" : "đơn bán"}
        </Link>
      </div>

      <div className="rounded-2xl border border-surface-container bg-white shadow-sm overflow-hidden">
        <InvoiceActions
          type={invoiceType as InvoiceType}
          order={order}
          variant="page"
        />
      </div>
    </div>
  );
};

export default InvoiceViewPage;
