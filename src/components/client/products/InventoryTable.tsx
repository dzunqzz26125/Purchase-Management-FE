import InventoryRow from "./InventoryRow";

const InventoryTable = ({ data }: { data: any[] }) => {
  return (
    <section className="bg-surface-container-lowest rounded-[24px] shadow-[0_10px_30px_-5px_rgba(30,58,138,0.05)] overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50 border-b border-surface-container/50">
              <th className="px-md py-md font-label-sm text-label-sm text-secondary">SKU</th>
              <th className="px-md py-md font-label-sm text-label-sm text-secondary">Sản phẩm</th>
              <th className="px-md py-md font-label-sm text-label-sm text-secondary">Phân loại</th>
              <th className="px-md py-md font-label-sm text-label-sm text-secondary">Mức tồn kho</th>
              <th className="px-md py-md font-label-sm text-label-sm text-secondary">Trạng thái</th>
              <th className="px-md py-md font-label-sm text-label-sm text-secondary text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container/30">
            {data.map((item) => (
              <InventoryRow key={item.sku} item={item} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-md py-md bg-surface-container-low/30 border-t border-surface-container flex items-center justify-between">
        <span className="font-label-sm text-label-sm text-secondary">Hiển thị 1-10 trên 156 sản phẩm</span>
        <div className="flex items-center gap-xs">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-surface-container text-secondary hover:bg-surface-container transition-all">
            <span className="material-symbols-outlined text-[20px]" data-icon="chevron_left">chevron_left</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-label-sm text-label-sm">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-surface-container text-secondary hover:bg-surface-container transition-all font-label-sm text-label-sm">2</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-surface-container text-secondary hover:bg-surface-container transition-all font-label-sm text-label-sm">3</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-surface-container text-secondary hover:bg-surface-container transition-all">
            <span className="material-symbols-outlined text-[20px]" data-icon="chevron_right">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default InventoryTable;
