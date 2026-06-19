import type { ComponentType, SVGProps } from "react";
import * as ReactQRCodeModule from "react-qr-code";

type QrProps = SVGProps<SVGSVGElement> & {
  value: string;
  size?: number;
  level?: "L" | "M" | "H" | "Q";
  title?: string;
  bgColor?: string;
  fgColor?: string;
};

const mod = ReactQRCodeModule as {
  QRCode?: ComponentType<QrProps>;
  default?: ComponentType<QrProps>;
};

const QRCodeComponent = mod.QRCode ?? mod.default;

if (!QRCodeComponent) {
  throw new Error(
    "react-qr-code: không load được QRCode. Kiểm tra cài đặt package.",
  );
}

type InvoiceQrCodeProps = {
  value: string;
  size?: number;
  title?: string;
};

export default function InvoiceQrCode({
  value,
  size = 96,
  title = "Mã QR tra cứu hóa đơn",
}: InvoiceQrCodeProps) {
  return (
    <QRCodeComponent
      value={value}
      size={size}
      level="M"
      title={title}
      bgColor="#FFFFFF"
      fgColor="#000000"
    />
  );
}
