export function formatVnd(value: number): string {
  if (!Number.isFinite(value)) return "0đ";
  const rounded = Math.round(value);
  return `${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`;
}

/** Chỉ giữ chữ số, tối đa 15 ký tự (đủ cho số tiền VND). */
export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "").slice(0, 15);
}

/** Parse "30.000.000" hoặc "30000000" → number */
export function parseVndInput(value: string): number {
  const digits = digitsOnly(value);
  if (!digits) return 0;
  const num = Number(digits);
  return Number.isFinite(num) ? num : 0;
}

/** Format chuỗi số thành dạng 1.234.567 (không có đuôi đ) */
export function formatDigitsWithDots(digits: string): string {
  if (!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatVndInput(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "";
  return formatDigitsWithDots(String(Math.round(value)));
}

/** digits → hiển thị có dấu chấm */
export function formatDigitsForDisplay(digits: string): string {
  return formatDigitsWithDots(digitsOnly(digits));
}

/** Chuỗi nhập → { digits, number, display } */
export function parseVndTyping(raw: string) {
  const digits = digitsOnly(raw);
  return {
    digits,
    number: digits ? Number(digits) : 0,
    display: formatDigitsWithDots(digits),
  };
}
