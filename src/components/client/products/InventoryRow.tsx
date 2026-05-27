import { useState } from "react";
import type { ProductTableItem } from "../../../types/product";
import { PLACEHOLDER_PRODUCT_IMAGE } from "../../../utils/productHelpers";
import StockProgress from "./StockProgress";
import StatusBadge from "./StatusBadge";

type InventoryRowProps = {
  item: ProductTableItem;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const InventoryRow = ({ item, onEdit, onDelete }: InventoryRowProps) => {
  const [imageSrc, setImageSrc] = useState(
    item.image || PLACEHOLDER_PRODUCT_IMAGE,
  );

  return (
    <tr className="hover:bg-surface-container-low/20 transition-colors">
      <td className="px-md py-md">
        <span className="font-label-sm text-label-sm text-primary">
          {item.sku}
        </span>
      </td>

      <td className="px-md py-md">
        <div className="flex items-center gap-sm">
          <div className="w-10 h-10 bg-surface-container rounded-lg flex-shrink-0 overflow-hidden">
            <img
              src={imageSrc}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={() => setImageSrc(PLACEHOLDER_PRODUCT_IMAGE)}
            />
          </div>
          <span className="font-body-md text-body-md font-medium">
            {item.name}
          </span>
        </div>
      </td>

      <td className="px-md py-md">
        <span className="text-body-md text-secondary">{item.category}</span>
      </td>

      <td className="px-md py-md">
        <span className="text-body-md text-secondary">{item.providerName}</span>
      </td>

      <td className="px-md py-md max-w-50 overflow-hidden">
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
            <span className="material-symbols-outlined text-[20px]">
              delete
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default InventoryRow;
