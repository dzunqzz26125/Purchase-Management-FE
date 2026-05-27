import type { PurchaseOrder } from "../../api/purchaseOrderApi";

type InvoiceModalProps = {
  open: boolean;
  onClose: () => void;
  type: "PO" | "SO";
  order: any; // PurchaseOrder or SalesOrder
};

export default function InvoiceModal({ open, onClose, type, order }: InvoiceModalProps) {
  if (!open || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const getPartnerName = () => {
    if (type === "PO") {
      const p = order.providerId;
      return typeof p === "object" && p ? p.name : "Nhà cung cấp";
    } else {
      return order.customerName || "Khách hàng lẻ";
    }
  };

  const getPartnerPhone = () => {
    if (type === "PO") {
      const p = order.providerId;
      return typeof p === "object" && p ? p.phone : "—";
    } else {
      return order.customerPhone || "—";
    }
  };

  const getPartnerEmail = () => {
    if (type === "PO") {
      const p = order.providerId;
      return typeof p === "object" && p ? p.email : "—";
    }
    return "";
  };

  const items = order.items || [];
  const totalAmount = type === "PO" ? (order.actualTotal ?? order.expectedTotal) : order.grandTotal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-md overflow-y-auto">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-on-surface/40 print:hidden"
        onClick={onClose}
        aria-label="Đóng"
      />

      <div className="relative z-10 w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-surface-container flex flex-col my-lg print:my-0 print:border-none print:shadow-none">
        
        {/* Modal Toolbar (hidden in print) */}
        <div className="flex items-center justify-between border-b border-surface-container px-md py-sm bg-surface-container-low print:hidden rounded-t-3xl">
          <h3 className="font-semibold text-primary">Xem trước hóa đơn</h3>
          <div className="flex items-center gap-xs">
            <button
              onClick={handlePrint}
              className="px-md py-xs bg-primary text-white text-label-sm font-semibold rounded-xl active:scale-95 transition-all flex items-center gap-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              In hóa đơn
            </button>
            <button
              onClick={onClose}
              className="p-xs text-secondary hover:text-primary rounded-lg"
              aria-label="Đóng"
            >
              <span className="material-symbols-outlined cursor-pointer">close</span>
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div id="invoice-print-area" className="p-xl text-black bg-white flex-1 font-sans">
          
          {/* Company Header */}
          <div className="flex justify-between items-start border-b-2 border-gray-300 pb-md">
            <div>
              <h2 className="text-body-lg font-bold text-gray-900 leading-tight">
                CÔNG TY CỔ PHẦN QUẢN LÝ MUA HÀNG & KHO VẬN ANTIGRAVITY
              </h2>
              <p className="text-label-sm text-gray-600 mt-xs">
                Địa chỉ: Tòa nhà Antigravity, 123 Đường Láng, Đống Đa, Hà Nội
              </p>
              <p className="text-label-sm text-gray-600">
                Hotline: 1900 6789 | Email: contact@antigravity.vn
              </p>
            </div>
            <div className="text-right">
              <h1 className="text-h3 font-bold text-primary tracking-wide">HÓA ĐƠN</h1>
              <p className="text-label-xs text-gray-500 mt-xs">Mã chứng từ: {type === "PO" ? order.batchCode : order.orderCode}</p>
              <p className="text-label-xs text-gray-500">Ngày tạo: {order.createdAt ? new Date(order.createdAt).toLocaleDateString("vi-VN") : "—"}</p>
            </div>
          </div>

          {/* Invoice Subject Title */}
          <div className="text-center my-md">
            <h2 className="text-h2 font-bold text-gray-800 tracking-wide uppercase">
              {type === "PO" ? "Phiếu Nhập Kho" : "Hóa Đơn Bán Hàng"}
            </h2>
            <p className="text-label-sm text-gray-500 italic mt-xs">
              {type === "PO" 
                ? "Inbound Warehouse Receipt" 
                : "Sales & Outbound Receipt"}
            </p>
          </div>

          {/* Partner & General Info */}
          <div className="grid grid-cols-2 gap-lg bg-gray-50 p-md rounded-2xl border border-gray-100 mb-lg">
            <div className="space-y-xs">
              <p className="text-label-xs text-gray-400 uppercase tracking-wider font-semibold">Thông tin đối tác</p>
              <p className="text-body-md font-bold text-gray-900">{getPartnerName()}</p>
              <p className="text-label-sm text-gray-600">SĐT: {getPartnerPhone()}</p>
              {type === "PO" && <p className="text-label-sm text-gray-600">Email: {getPartnerEmail()}</p>}
            </div>

            <div className="space-y-xs">
              <p className="text-label-xs text-gray-400 uppercase tracking-wider font-semibold">Thông tin chứng từ</p>
              <p className="text-label-sm text-gray-600">
                <span className="font-semibold text-gray-800">Trạng thái:</span>{" "}
                <span className="capitalize">{order.status}</span>
              </p>
              <p className="text-label-sm text-gray-600">
                <span className="font-semibold text-gray-800">Người lập phiếu:</span>{" "}
                {typeof order.createdBy === "object" && order.createdBy ? order.createdBy.name : "—"}
              </p>
              {type === "SO" && (
                <p className="text-label-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Thanh toán:</span>{" "}
                  <span className="capitalize">{order.paymentMethod === "cash" ? "Tiền mặt" : "Chuyển khoản"}</span>
                </p>
              )}
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full text-left text-label-sm mb-lg border-collapse">
            <thead>
              <tr className="border-b border-gray-400 bg-gray-100 text-gray-800">
                <th className="py-sm px-xs text-center font-bold">STT</th>
                <th className="py-sm px-xs font-bold">Tên Sản phẩm / SKU</th>
                <th className="py-sm px-xs font-bold text-center">ĐVT</th>
                <th className="py-sm px-xs font-bold text-right">Số lượng</th>
                <th className="py-sm px-xs font-bold text-right">Đơn giá</th>
                <th className="py-sm px-xs font-bold text-right">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: any, idx: number) => {
                const prodName = typeof item.productId === "object" && item.productId ? item.productId.name : "Sản phẩm";
                const prodSku = typeof item.productId === "object" && item.productId ? item.productId.sku : "—";
                const prodUnit = typeof item.productId === "object" && item.productId ? item.productId.unit : "cái";
                
                const itemQty = type === "PO" ? item.qtyOrdered : item.qty;
                const itemPrice = type === "PO" ? item.costPrice : item.price;
                const itemTotal = item.total ?? (itemQty * itemPrice);

                return (
                  <tr key={item._id || idx} className="border-b border-gray-200">
                    <td className="py-sm px-xs text-center text-gray-500">{idx + 1}</td>
                    <td className="py-sm px-xs">
                      <p className="font-semibold text-gray-800">{prodName}</p>
                      <p className="text-label-xs text-gray-400">SKU: {prodSku}</p>
                    </td>
                    <td className="py-sm px-xs text-center text-gray-600">{prodUnit}</td>
                    <td className="py-sm px-xs text-right text-gray-800">{itemQty}</td>
                    <td className="py-sm px-xs text-right text-gray-800">{itemPrice.toLocaleString()}đ</td>
                    <td className="py-sm px-xs text-right text-gray-900 font-semibold">{itemTotal.toLocaleString()}đ</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Financial Summary */}
          <div className="w-1/2 ml-auto space-y-xs pb-lg border-b border-gray-200">
            <div className="flex justify-between text-label-sm text-gray-600">
              <span>Tổng tiền hàng:</span>
              <span className="font-medium">{totalAmount.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between text-label-sm text-gray-600">
              <span>Đã thanh toán:</span>
              <span className="font-medium text-emerald-700">{order.paidAmount.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between text-body-md font-bold text-gray-900 border-t border-dashed border-gray-300 pt-xs">
              <span>Còn nợ đối tác:</span>
              <span className={order.debtAmount > 0 ? "text-error" : "text-emerald-700"}>
                {order.debtAmount.toLocaleString()}đ
              </span>
            </div>
          </div>

          {/* Note section */}
          {order.note && (
            <div className="mt-md text-label-sm text-gray-600 italic">
              <span className="font-semibold not-italic text-gray-800">Ghi chú:</span> {order.note}
            </div>
          )}

          {/* Signatures */}
          <div className="grid grid-cols-3 gap-md text-center mt-xl pt-lg border-t border-gray-100">
            <div className="space-y-lg">
              <p className="font-semibold text-gray-800">Người lập phiếu</p>
              <p className="text-label-xs text-gray-400 italic">(Ký, ghi rõ họ tên)</p>
            </div>
            <div className="space-y-lg">
              <p className="font-semibold text-gray-800">{type === "PO" ? "Người giao hàng" : "Người nhận hàng"}</p>
              <p className="text-label-xs text-gray-400 italic">(Ký, ghi rõ họ tên)</p>
            </div>
            <div className="space-y-lg">
              <p className="font-semibold text-gray-800">Thủ kho</p>
              <p className="text-label-xs text-gray-400 italic">(Ký, ghi rõ họ tên)</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
