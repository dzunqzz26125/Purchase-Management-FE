import VndInput from "../../components/UI/VndInput";
import { formatVnd } from "../../utils/formatVnd";
import type { Provider } from "../../types/provider";

type PODebtPaySectionProps = {
  provider: Provider;
  debtPayAmount: number;
  debtPayNote: string;
  isPending: boolean;
  onAmountChange: (value: number) => void;
  onNoteChange: (value: string) => void;
  onSubmit: () => void;
};

export default function PODebtPaySection({
  provider,
  debtPayAmount,
  debtPayNote,
  isPending,
  onAmountChange,
  onNoteChange,
  onSubmit,
}: PODebtPaySectionProps) {
  if (provider.debt <= 0) return null;

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-md space-y-sm">
      <p className="text-label-sm font-semibold text-amber-800">
        NCC đang nợ: {formatVnd(provider.debt)} — Thanh toán công nợ
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-sm">
        <VndInput
          value={debtPayAmount}
          onChange={onAmountChange}
          placeholder="Số tiền trả"
        />
        <input
          type="text"
          placeholder="Ghi chú biên lai"
          className="rounded-xl border border-outline-variant px-sm py-xs md:col-span-2"
          value={debtPayNote}
          onChange={(e) => onNoteChange(e.target.value)}
        />
      </div>
      <button
        type="button"
        disabled={isPending || debtPayAmount <= 0}
        onClick={onSubmit}
        className="rounded-xl bg-amber-600 px-md py-xs text-white font-semibold disabled:opacity-60"
      >
        {isPending ? "Đang xử lý..." : "Lập biên lai trả nợ"}
      </button>
    </div>
  );
}
