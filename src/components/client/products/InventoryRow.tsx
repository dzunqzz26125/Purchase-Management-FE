import StockProgress from "./StockProgress";
import StatusBadge from "./StatusBadge";

const InventoryRow = ({ item }: any) => {
  return (
    <tr className="hover:bg-surface-container-low/20 transition-colors">
      <td className="px-md py-md">
        <span className="font-label-sm text-label-sm text-primary">{item.sku}</span>
      </td>

      <td className="px-md py-md">
        <div className="flex items-center gap-sm">
          <div className="w-10 h-10 bg-surface-container rounded-lg flex-shrink-0 overflow-hidden">
            <img src={item.image} className="w-full h-full object-cover" />
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
        <button className="p-xs text-secondary hover:text-primary transition-colors">
          <span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
        </button>
      </td>
    </tr>
  );
};

export default InventoryRow;
