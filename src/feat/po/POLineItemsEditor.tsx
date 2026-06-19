import type { Product } from "../../types/product";
import VndInput from "../../components/UI/VndInput";
import { formatVnd } from "../../utils/formatVnd";
import type { PoLineItem } from "../../hooks/usePoForm";

type POLineItemsEditorProps = {
  items: PoLineItem[];
  products: Product[];
  onUpdate: (index: number, patch: Partial<PoLineItem>) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
};

export default function POLineItemsEditor({
  items,
  products,
  onUpdate,
  onAdd,
  onRemove,
}: POLineItemsEditorProps) {
  return (
    <div className="space-y-xs">
      {items.map((line, idx) => (
        <div key={idx} className="grid grid-cols-12 gap-sm items-center">
          <div className="col-span-5">
            <select
              className="w-full rounded-xl border border-outline-variant px-sm py-xs bg-white"
              value={line.productId}
              onChange={(e) => {
                const product = products.find((p) => p._id === e.target.value);
                onUpdate(idx, {
                  productId: e.target.value,
                  costPrice: product?.costPrice ?? line.costPrice,
                });
              }}
              required
            >
              <option value="">Sản phẩm</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} (Tồn: {p.stock})
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <input
              type="number"
              min={1}
              placeholder="SL"
              className="w-full rounded-xl border border-outline-variant px-sm py-xs"
              value={line.qtyOrdered}
              onChange={(e) =>
                onUpdate(idx, { qtyOrdered: Number(e.target.value) })
              }
              required
            />
          </div>
          <div className="col-span-2">
            <VndInput
              value={line.costPrice}
              onChange={(val) => onUpdate(idx, { costPrice: val })}
              placeholder="Giá vốn"
            />
          </div>
          <div className="col-span-2">
            <input
              type="text"
              readOnly
              className="w-full rounded-xl border border-surface-container bg-surface-container-low px-sm py-xs text-right font-semibold text-secondary"
              value={formatVnd(line.qtyOrdered * line.costPrice)}
            />
          </div>
          <div className="col-span-1 text-center">
            <button
              type="button"
              onClick={() => onRemove(idx)}
              disabled={items.length <= 1}
              className="p-xs text-secondary hover:text-error disabled:opacity-40 cursor-pointer"
              title="Xóa dòng"
            >
              <span className="material-symbols-outlined text-[20px] block">
                delete
              </span>
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="text-primary text-label-sm font-semibold hover:underline flex items-center gap-0.5 cursor-pointer mt-xs"
      >
        <span className="material-symbols-outlined text-[16px]">add</span>
        Thêm dòng sản phẩm
      </button>
    </div>
  );
}
