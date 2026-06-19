import InvoiceQrCode from "./InvoiceQrCode";
import { formatVnd } from "../../utils/formatVnd";
import {
  getInvoicePartnerEmail,
  getInvoicePartnerName,
  getInvoicePartnerPhone,
  getInvoiceLinePrice,
  getInvoiceLineQty,
  getInvoiceLineTotal,
  getInvoiceProductName,
  getInvoiceProductUnit,
} from "../../utils/invoiceDisplay";
import {
  getInvoiceCode,
  type InvoiceOrder,
  type InvoiceType,
} from "../../utils/invoiceHelpers";

type InvoiceDocumentProps = {
  type: InvoiceType;
  order: InvoiceOrder;
  qrUrl?: string;
  showQr?: boolean;
};

export default function InvoiceDocument({
  type,
  order,
  qrUrl,
  showQr = true,
}: InvoiceDocumentProps) {
  const items = order.items || [];
  const totalAmount =
    type === "PO"
      ? ((order as { actualTotal?: number; expectedTotal?: number }).actualTotal ??
        (order as { expectedTotal?: number }).expectedTotal ??
        0)
      : (order as { grandTotal?: number }).grandTotal ?? 0;

  const documentCode = getInvoiceCode(type, order);
  const partnerEmail = getInvoicePartnerEmail(type, order);

  return (
    <div
      className="invoice-print-document p-xl text-black bg-white flex-1 font-sans text-[13px] leading-relaxed"
      style={{ backgroundColor: "#ffffff", color: "#111827" }}
    >
      <div className="flex justify-between items-start border-b-2 border-gray-300 pb-md">
        <div>
          <h2 className="text-lg font-bold text-gray-900 leading-tight">
            CÔNG TY CỔ PHẦN QUẢN LÝ MUA HÀNG & KHO VẬN LOGIFLOW
          </h2>
          <p className="text-sm text-gray-600 mt-xs">
            Địa chỉ: Tòa nhà LogiFlow, 123 Đường Láng, Đống Đa, Hà Nội
          </p>
          <p className="text-sm text-gray-600">
            Hotline: 1900 6789 | Email: contact@logiflow.vn
          </p>
        </div>
        <div className="text-right">
          <h1 className="text-2xl font-bold tracking-wide" style={{ color: "#00236f" }}>
            HÓA ĐƠN
          </h1>
          <p className="text-xs text-gray-500 mt-xs">Mã chứng từ: {documentCode}</p>
          <p className="text-xs text-gray-500">
            Ngày tạo:{" "}
            {order.createdAt
              ? new Date(order.createdAt).toLocaleDateString("vi-VN")
              : "—"}
          </p>
        </div>
      </div>

      <div className="text-center my-md">
        <h2 className="text-xl font-bold text-gray-800 tracking-wide uppercase">
          {type === "PO" ? "Phiếu Nhập Kho" : "Hóa Đơn Bán Hàng"}
        </h2>
        <p className="text-sm text-gray-500 italic mt-xs">
          {type === "PO"
            ? "Inbound Warehouse Receipt"
            : "Sales & Outbound Receipt"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-lg bg-gray-50 p-md rounded-2xl border border-gray-100 mb-lg">
        <div className="space-y-xs">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
            Thông tin đối tác
          </p>
          <p className="text-base font-bold text-gray-900">
            {getInvoicePartnerName(type, order)}
          </p>
          <p className="text-sm text-gray-600">
            SĐT: {getInvoicePartnerPhone(type, order)}
          </p>
          <p className="text-sm text-gray-600">Email: {partnerEmail}</p>
        </div>

        <div className="space-y-xs">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
            Thông tin chứng từ
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Trạng thái:</span>{" "}
            <span className="capitalize">{order.status}</span>
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Người lập phiếu:</span>{" "}
            {typeof order.createdBy === "object" && order.createdBy
              ? order.createdBy.name
              : "—"}
          </p>
          {type === "SO" && (
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">Thanh toán:</span>{" "}
              <span className="capitalize">
                {(order as { paymentMethod?: string }).paymentMethod === "cash"
                  ? "Tiền mặt"
                  : "Chuyển khoản"}
              </span>
            </p>
          )}
        </div>
      </div>

      <table className="w-full text-left text-sm mb-lg border-collapse">
        <thead>
          <tr className="border-b border-gray-400 bg-gray-100 text-gray-800">
            <th className="py-sm px-xs text-center font-bold">STT</th>
            <th className="py-sm px-xs font-bold">Tên sản phẩm</th>
            <th className="py-sm px-xs font-bold text-center">ĐVT</th>
            <th className="py-sm px-xs font-bold text-right">Số lượng</th>
            <th className="py-sm px-xs font-bold text-right">Đơn giá</th>
            <th className="py-sm px-xs font-bold text-right">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => {
            const prodName = getInvoiceProductName(item);
            const prodUnit = getInvoiceProductUnit(item);
            const itemQty = getInvoiceLineQty(type, item);
            const itemPrice = getInvoiceLinePrice(type, item);
            const itemTotal = getInvoiceLineTotal(type, item);

            return (
              <tr
                key={(item as { _id?: string })._id || idx}
                className="border-b border-gray-200"
              >
                <td className="py-sm px-xs text-center text-gray-500">{idx + 1}</td>
                <td className="py-sm px-xs font-semibold text-gray-800">{prodName}</td>
                <td className="py-sm px-xs text-center text-gray-600">{prodUnit}</td>
                <td className="py-sm px-xs text-right text-gray-800">{itemQty}</td>
                <td className="py-sm px-xs text-right text-gray-800">
                  {formatVnd(itemPrice)}
                </td>
                <td className="py-sm px-xs text-right text-gray-900 font-semibold">
                  {formatVnd(itemTotal)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex flex-col md:flex-row gap-lg justify-between items-start border-b border-gray-200 pb-lg">
        <div className="w-full md:w-1/2 ml-auto space-y-xs">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Tổng tiền hàng:</span>
            <span className="font-medium">{formatVnd(totalAmount)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Đã thanh toán:</span>
            <span className="font-medium text-emerald-700">
              {formatVnd(order.paidAmount)}
            </span>
          </div>
          <div className="flex justify-between text-base font-bold text-gray-900 border-t border-dashed border-gray-300 pt-xs">
            <span>Còn nợ đối tác:</span>
            <span className={order.debtAmount > 0 ? "text-red-600" : "text-emerald-700"}>
              {formatVnd(order.debtAmount)}
            </span>
          </div>
        </div>

        {showQr && qrUrl && (
          <div className="flex flex-col items-center gap-xs shrink-0">
            <div className="p-sm bg-white border border-gray-200 rounded-xl">
              <InvoiceQrCode value={qrUrl} size={96} />
            </div>
            <p className="text-xs text-gray-500 text-center max-w-[140px]">
              Quét mã để xem hóa đơn điện tử
            </p>
            <p className="text-[10px] text-gray-400 break-all max-w-[160px] text-center">
              {qrUrl}
            </p>
          </div>
        )}
      </div>

      {order.note && (
        <div className="mt-md text-sm text-gray-600 italic">
          <span className="font-semibold not-italic text-gray-800">Ghi chú:</span>{" "}
          {order.note}
        </div>
      )}

      <div className="grid grid-cols-3 gap-md text-center mt-xl pt-lg border-t border-gray-100">
        <div className="space-y-lg">
          <p className="font-semibold text-gray-800">Người lập phiếu</p>
          <p className="text-xs text-gray-400 italic">(Ký, ghi rõ họ tên)</p>
        </div>
        <div className="space-y-lg">
          <p className="font-semibold text-gray-800">
            {type === "PO" ? "Người giao hàng" : "Người nhận hàng"}
          </p>
          <p className="text-xs text-gray-400 italic">(Ký, ghi rõ họ tên)</p>
        </div>
        <div className="space-y-lg">
          <p className="font-semibold text-gray-800">Thủ kho</p>
          <p className="text-xs text-gray-400 italic">(Ký, ghi rõ họ tên)</p>
        </div>
      </div>
    </div>
  );
}
