import type { Category } from "../../../types/product";

type FilterBarProps = {
  categories: Category[];
  categoryFilter: string;
  statusFilter: string;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onAddClick: () => void;
};

const FilterBar = ({
  categories,
  categoryFilter,
  statusFilter,
  onCategoryChange,
  onStatusChange,
  onAddClick,
}: FilterBarProps) => {
  return (
    <section className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-md">
      <div className="flex flex-wrap items-center gap-sm">
        <div className="relative group">
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="appearance-none flex items-center gap-xs px-md py-sm pr-10 bg-surface-container-lowest border border-surface-container rounded-xl text-label-sm font-label-sm text-secondary hover:bg-surface-container transition-all outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Phân loại</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined text-[18px] absolute right-sm top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
            keyboard_arrow_down
          </span>
        </div>

        <div className="relative group">
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="appearance-none flex items-center gap-xs px-md py-sm pr-10 bg-surface-container-lowest border border-surface-container rounded-xl text-label-sm font-label-sm text-secondary hover:bg-surface-container transition-all outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Trạng thái</option>
            <option value="ok">Còn hàng</option>
            <option value="low">Sắp hết</option>
            <option value="pending">Hết hàng</option>
          </select>
          <span className="material-symbols-outlined text-[18px] absolute right-sm top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
            filter_list
          </span>
        </div>
      </div>

      <div className="flex items-center gap-sm">
        <button
          type="button"
          onClick={onAddClick}
          className="px-md py-sm bg-primary text-on-primary font-label-sm text-label-sm rounded-xl flex items-center gap-xs shadow-md active:scale-95 transition-all outline-none"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Thêm Sản phẩm mới
        </button>
      </div>
    </section>
  );
};

export default FilterBar;
