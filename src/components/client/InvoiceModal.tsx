import { useQuery } from "@tanstack/react-query";
import InvoiceActions from "./InvoiceActions";
import { purchaseOrderApi } from "../../api/purchaseOrderApi";
import { salesOrderApi } from "../../api/salesOrderApi";
import type { InvoiceOrder, InvoiceType } from "../../utils/invoiceHelpers";

type InvoiceModalProps = {
  open: boolean;
  onClose: () => void;
  type: InvoiceType;
  order: InvoiceOrder | null;
};

async function fetchInvoiceOrder(
  type: InvoiceType,
  id: string,
): Promise<InvoiceOrder> {
  if (type === "PO") return purchaseOrderApi.getById(id);
  return salesOrderApi.getById(id);
}

export default function InvoiceModal({
  open,
  onClose,
  type,
  order,
}: InvoiceModalProps) {
  const orderId = order?._id;

  const { data: detailOrder, isLoading } = useQuery<InvoiceOrder>({
    queryKey: ["invoice-order", type, orderId],
    queryFn: () => fetchInvoiceOrder(type, orderId!),
    enabled: open && Boolean(orderId),
  });

  const displayOrder = detailOrder ?? order;

  if (!open || !displayOrder) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-md overflow-y-auto">
      <button
        type="button"
        className="absolute inset-0 bg-on-surface/40 print:hidden"
        onClick={onClose}
        aria-label="Đóng"
      />

      <div className="relative z-10 w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-surface-container flex flex-col my-lg max-h-[92vh] overflow-y-auto">
        {isLoading && !detailOrder ? (
          <p className="p-lg text-secondary text-center">Đang tải hóa đơn...</p>
        ) : (
          <InvoiceActions
            type={type}
            order={displayOrder}
            variant="modal"
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}
