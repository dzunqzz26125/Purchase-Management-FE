import VndInput from "../../components/UI/VndInput";
import { formatVnd } from "../../utils/formatVnd";
import type { Provider } from "../../types/provider";
import type { Product } from "../../types/product";
import type { PoLineItem } from "../../hooks/usePoForm";
import POLineItemsEditor from "./POLineItemsEditor";
import PODebtPaySection from "./PODebtPaySection";

type POCreateFormProps = {
  providerId: string;
  providers: Provider[];
  filteredProducts: Product[];
  items: PoLineItem[];
  paidAmount: number;
  debtPayAmount: number;
  debtPayNote: string;
  grandTotal: number;
  selectedProvider?: Provider;
  isCreating: boolean;
  isPayingDebt: boolean;
  onProviderChange: (id: string) => void;
  onPaidAmountChange: (value: number) => void;
  onDebtPayAmountChange: (value: number) => void;
  onDebtPayNoteChange: (value: string) => void;
  onUpdateLine: (index: number, patch: Partial<PoLineItem>) => void;
  onAddLine: () => void;
  onRemoveLine: (index: number) => void;
  onPayDebt: () => void;
  onSubmit: () => void;
};

export default function POCreateForm({
  providerId,
  providers,
  filteredProducts,
  items,
  paidAmount,
  debtPayAmount,
  debtPayNote,
  grandTotal,
  selectedProvider,
  isCreating,
  isPayingDebt,
  onProviderChange,
  onPaidAmountChange,
  onDebtPayAmountChange,
  onDebtPayNoteChange,
  onUpdateLine,
  onAddLine,
  onRemoveLine,
  onPayDebt,
  onSubmit,
}: POCreateFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="rounded-2xl border border-surface-container bg-surface-bright p-lg space-y-md"
    >
      <h2 className="font-semibold text-primary">Tạo đơn nhập mới</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <label className="block">
          <span className="text-label-sm text-secondary">Nhà cung cấp</span>
          <select
            className="mt-xs w-full rounded-xl border border-outline-variant px-sm py-xs bg-white"
            value={providerId}
            onChange={(e) => onProviderChange(e.target.value)}
            required
          >
            <option value="">Chọn NCC</option>
            {providers.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} {p.debt > 0 ? `(Nợ: ${formatVnd(p.debt)})` : ""}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-label-sm text-secondary">Đã thanh toán (VNĐ)</span>
          <VndInput
            className="mt-xs w-full rounded-xl border border-outline-variant px-sm py-xs"
            value={paidAmount}
            onChange={onPaidAmountChange}
          />
        </label>
      </div>

      <div className="space-y-sm">
        <label className="block text-label-sm text-secondary font-medium">
          Danh sách sản phẩm nhập
        </label>
        {!providerId ? (
          <p className="text-secondary text-label-sm italic py-xs">
            Vui lòng chọn Nhà cung cấp trước để hiển thị danh sách sản phẩm tương ứng.
          </p>
        ) : (
          <POLineItemsEditor
            items={items}
            products={filteredProducts}
            onUpdate={onUpdateLine}
            onAdd={onAddLine}
            onRemove={onRemoveLine}
          />
        )}
      </div>

      {selectedProvider && (
        <PODebtPaySection
          provider={selectedProvider}
          debtPayAmount={debtPayAmount}
          debtPayNote={debtPayNote}
          isPending={isPayingDebt}
          onAmountChange={onDebtPayAmountChange}
          onNoteChange={onDebtPayNoteChange}
          onSubmit={onPayDebt}
        />
      )}

      {providerId && (
        <div className="pt-sm border-t border-surface-container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
          <p className="text-body-md font-semibold text-primary">
            Tổng tiền hàng: {formatVnd(grandTotal)} &mdash; Còn nợ NCC:{" "}
            {formatVnd(Math.max(0, grandTotal - paidAmount))}
          </p>
          <button
            type="submit"
            disabled={isCreating}
            className="rounded-xl bg-primary px-lg py-sm text-on-primary font-semibold disabled:opacity-60 cursor-pointer active:scale-95 transition-all"
          >
            {isCreating ? "Đang tạo..." : "Tạo đơn nhập"}
          </button>
        </div>
      )}
    </form>
  );
}
