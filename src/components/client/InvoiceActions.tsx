import { useCallback, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import InvoiceDocument from "./InvoiceDocument";
import {
  exportElementToPdf,
  INVOICE_PRINT_PAGE_STYLE,
} from "../../utils/exportInvoicePdf";
import {
  getInvoicePdfFilename,
  getInvoiceViewUrl,
  type InvoiceOrder,
  type InvoiceType,
} from "../../utils/invoiceHelpers";

type InvoiceActionsProps = {
  type: InvoiceType;
  order: InvoiceOrder;
  variant?: "modal" | "page";
  onClose?: () => void;
};

export default function InvoiceActions({
  type,
  order,
  variant = "modal",
  onClose,
}: InvoiceActionsProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const qrUrl = getInvoiceViewUrl(type, order._id);
  const pdfFilename = getInvoicePdfFilename(type, order);

  const handleExportPdf = useCallback(async () => {
    const node = printRef.current;
    if (!node) return;

    setExporting(true);
    setStatusMessage("");
    try {
      await exportElementToPdf(node, pdfFilename);
      setStatusMessage("Đã tải file PDF.");
    } catch {
      setStatusMessage(
        "Không xuất được PDF. Thử In hóa đơn → chọn Lưu thành PDF.",
      );
    } finally {
      setExporting(false);
    }
  }, [pdfFilename]);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: pdfFilename.replace(".pdf", ""),
    pageStyle: INVOICE_PRINT_PAGE_STYLE,
    onPrintError: () => {
      setStatusMessage("Không in được — đang chuyển sang xuất PDF...");
      void handleExportPdf();
    },
  });

  const onPrintClick = () => {
    setStatusMessage("");
    if (typeof handlePrint === "function") {
      handlePrint();
    } else {
      setStatusMessage("Không mở được hộp thoại in — đang xuất PDF...");
      void handleExportPdf();
    }
  };

  const toolbarClass =
    variant === "modal"
      ? "flex items-center justify-between border-b border-surface-container px-md py-sm bg-surface-container-low print:hidden rounded-t-3xl"
      : "flex flex-wrap items-center justify-between gap-sm mb-md print:hidden";

  return (
    <>
      <div className={toolbarClass}>
        <h3 className="font-semibold text-primary">
          {variant === "modal" ? "Xem trước hóa đơn" : "Chi tiết hóa đơn"}
        </h3>
        <div className="flex flex-wrap items-center gap-xs">
          <button
            type="button"
            onClick={onPrintClick}
            className="px-md py-xs bg-primary text-white text-label-sm font-semibold rounded-xl active:scale-95 transition-all flex items-center gap-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            In hóa đơn
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-xs text-secondary hover:text-primary rounded-lg"
              aria-label="Đóng"
            >
              <span className="material-symbols-outlined cursor-pointer">
                close
              </span>
            </button>
          )}
        </div>
      </div>

      {statusMessage && (
        <p className="text-label-sm text-secondary px-md py-xs print:hidden">
          {statusMessage}
        </p>
      )}

      <div
        id="invoice-print-area"
        ref={printRef}
        className="invoice-print-area bg-white text-black"
        style={{ backgroundColor: "#ffffff", color: "#111827" }}
      >
        <InvoiceDocument type={type} order={order} qrUrl={qrUrl} showQr />
      </div>
    </>
  );
}
