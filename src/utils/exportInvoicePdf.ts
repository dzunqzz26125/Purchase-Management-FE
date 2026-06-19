import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const MARGIN_MM = 10;

/**
 * Clone nội dung ra khỏi modal (fixed/overflow) để html2canvas chụp đủ dữ liệu.
 */
function mountCaptureClone(source: HTMLElement): {
  target: HTMLElement;
  cleanup: () => void;
} {
  const clone = source.cloneNode(true) as HTMLElement;
  clone.id = "invoice-capture-clone";
  clone.style.width = "794px";
  clone.style.maxWidth = "794px";
  clone.style.background = "#ffffff";
  clone.style.color = "#111827";

  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText = [
    "position: fixed",
    "inset: 0 auto auto 0",
    "width: 794px",
    "z-index: 99999",
    "background: #ffffff",
    "overflow: visible",
    "pointer-events: none",
  ].join(";");

  host.appendChild(clone);
  document.body.appendChild(host);

  return {
    target: clone,
    cleanup: () => host.remove(),
  };
}

/**
 * Xuất phần tử HTML thành file PDF (hỗ trợ nhiều trang nếu hóa đơn dài).
 */
export async function exportElementToPdf(
  element: HTMLElement,
  filename: string,
): Promise<void> {
  const { target, cleanup } = mountCaptureClone(element);

  try {
    await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));

    const canvas = await html2canvas(target, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: target.scrollWidth,
      height: target.scrollHeight,
      windowWidth: target.scrollWidth,
      windowHeight: target.scrollHeight,
      onclone: (doc) => {
        const root =
          doc.getElementById("invoice-capture-clone") ??
          doc.getElementById("invoice-print-area");
        if (!root) return;
        root.style.background = "#ffffff";
        root.style.color = "#111827";
        root.querySelectorAll("*").forEach((node) => {
          const el = node as HTMLElement;
          el.style.visibility = "visible";
          el.style.opacity = "1";
        });
      },
    });

    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error("Canvas rỗng");
    }

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = A4_WIDTH_MM - MARGIN_MM * 2;
    const pageHeight = A4_HEIGHT_MM - MARGIN_MM * 2;
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;
    const imgData = canvas.toDataURL("image/png");

    pdf.addImage(imgData, "PNG", MARGIN_MM, MARGIN_MM, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(
        imgData,
        "PNG",
        MARGIN_MM,
        position + MARGIN_MM,
        imgWidth,
        imgHeight,
      );
      heightLeft -= pageHeight;
    }

    pdf.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
  } finally {
    cleanup();
  }
}

export const INVOICE_PRINT_PAGE_STYLE = `
  @page {
    size: A4;
    margin: 10mm;
  }
  @media print {
    html, body {
      height: auto !important;
      overflow: visible !important;
      background: #ffffff !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body * {
      visibility: visible !important;
    }
    #invoice-print-area {
      visibility: visible !important;
      display: block !important;
      position: relative !important;
      left: auto !important;
      top: auto !important;
      width: 100% !important;
      max-width: 100% !important;
      overflow: visible !important;
      background: #ffffff !important;
      color: #111827 !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    #invoice-print-area * {
      visibility: visible !important;
    }
  }
`;
