import { formatVnd } from "../../utils/formatVnd";
import type { PurchaseOrder } from "../../api/purchaseOrderApi";

type POOrderTableProps = {
  orders: PurchaseOrder[];
  isLoading: boolean;
  isCompleting: boolean;
  onComplete: (order: PurchaseOrder) => void;
  onShowInvoice: (order: PurchaseOrder) => void;
};

const providerName = (po: PurchaseOrder) => {
  const p = po.providerId;
  return typeof p === "object" && p && "name" in p ? p.name : "—";
};

export default function POOrderTable({
  orders,
  isLoading,
  isCompleting,
  onComplete,
  onShowInvoice,
}: POOrderTableProps) {
  return (
    <div className="rounded-2xl border border-surface-container bg-surface-bright overflow-hidden">
      <div className="px-lg py-md border-b border-surface-container">
        <h2 className="font-semibold text-primary">Danh sách đơn nhập</h2>
      </div>
      {isLoading ? (
        <p className="p-lg text-secondary">Đang tải...</p>
      ) : (
        <table className="w-full text-left text-label-sm">
          <thead className="bg-surface-container-low text-secondary">
            <tr>
              <th className="px-lg py-sm">Mã lô</th>
              <th className="px-lg py-sm">NCC</th>
              <th className="px-lg py-sm">Tổng</th>
              <th className="px-lg py-sm">Công nợ</th>
              <th className="px-lg py-sm">Trạng thái</th>
              <th className="px-lg py-sm text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((po) => (
              <tr
                key={po._id}
                className="border-t border-surface-container hover:bg-surface-container-low/10"
              >
                <td className="px-lg py-sm font-medium">{po.batchCode}</td>
                <td className="px-lg py-sm">{providerName(po)}</td>
                <td className="px-lg py-sm">{formatVnd(po.expectedTotal)}</td>
                <td className="px-lg py-sm">{formatVnd(po.debtAmount)}</td>
                <td className="px-lg py-sm">
                  <span
                    className={`px-sm py-0.5 rounded-full text-label-xs font-semibold ${
                      po.status === "completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {po.status === "completed" ? "Đã nhập kho" : "Đang kiểm hàng"}
                  </span>
                </td>
                <td className="px-lg py-sm text-right">
                  <div className="flex items-center justify-end gap-sm">
                    {po.status !== "completed" && (
                      <button
                        type="button"
                        onClick={() => onComplete(po)}
                        disabled={isCompleting}
                        className="text-emerald-600 font-semibold hover:underline cursor-pointer"
                      >
                        Nhập kho
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onShowInvoice(po)}
                      className="text-primary font-semibold hover:underline cursor-pointer flex items-center gap-0.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        print
                      </span>
                      Hóa đơn
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-lg text-secondary">
                  Chưa có đơn nhập kho nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
