/** Format number as VND with dot thousands separator: 1.000.000đ */
export function formatVnd(value: number): string {
  if (!Number.isFinite(value)) return "0đ";
  const rounded = Math.round(value);
  return `${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`;
}

/** Parse user input like "1.000.000" or "1000000" to number */
export function parseVndInput(value: string): number {
  const digits = value.replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
}

/** Format for editable money input (no currency suffix) */
export function formatVndInput(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "";
  return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
