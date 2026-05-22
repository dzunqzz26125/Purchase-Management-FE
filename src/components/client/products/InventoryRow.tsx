import type { ProductTableItem } from "../../../types/product";
import StockProgress from "./StockProgress";
import StatusBadge from "./StatusBadge";

const PLACEHOLDER_IMAGE =
  "https://placehold.co/80x80/e8eaf6/1e3a8a?text=SKU";

type InventoryRowProps = {
  item: ProductTableItem;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const InventoryRow = ({ item, onEdit, onDelete }: InventoryRowProps) => {
  return (
    <tr className="hover:bg-surface-container-low/20 transition-colors">
      <td className="px-md py-md">
        <span className="font-label-sm text-label-sm text-primary">{item.sku}</span>
      </td>

      <td className="px-md py-md">
        <div className="flex items-center gap-sm">
          <div className="w-10 h-10 bg-surface-container rounded-lg flex-shrink-0 overflow-hidden">
            <img
              src={item.image || PLACEHOLDER_IMAGE}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-body-md text-body-md font-medium">{item.name}</span>
        </div>
      </td>

      <td className="px-md py-md">
        <span className="text-body-md text-secondary">{item.category}</span>
      </td>

      <td className="px-md py-md min-w-[200px]">
        <StockProgress value={item.stock} />
      </td>

      <td className="px-md py-md">
        <StatusBadge status={item.status} />
      </td>

      <td className="px-md py-md text-right">
        <div className="flex items-center justify-end gap-xs">
          <button
            type="button"
            onClick={() => onEdit(item._id)}
            className="p-xs text-secondary hover:text-primary transition-colors"
            title="Chỉnh sửa"
          >
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
          <button
            type="button"
            onClick={() => onDelete(item._id)}
            className="p-xs text-secondary hover:text-error transition-colors"
            title="Xóa mềm"
          >
            <span className="material-symbols-outlined text-[20px]">delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default InventoryRow;
