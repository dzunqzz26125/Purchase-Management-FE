const FilterBar = () => {
  return (
    <section className="flex flex-col md:flex-row md:items-center justify-between gap-md">
      <div className="flex flex-wrap items-center gap-sm">
        {/* Category Filter */}
        <div className="relative group">
          <select className="appearance-none flex items-center gap-xs px-md py-sm pr-10 bg-surface-container-lowest border border-surface-container rounded-xl text-label-sm font-label-sm text-secondary hover:bg-surface-container transition-all outline-none focus:ring-2 focus:ring-primary/20">
            <option value="">Phân loại</option>
            <option value="dientu">Điện tử</option>
            <option value="giadung">Gia dụng</option>
            <option value="noithat">Nội thất</option>
          </select>
          <span className="material-symbols-outlined text-[18px] absolute right-sm top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
            keyboard_arrow_down
          </span>
        </div>

        {/* Status Filter */}
        <div className="relative group">
          <select className="appearance-none flex items-center gap-xs px-md py-sm pr-10 bg-surface-container-lowest border border-surface-container rounded-xl text-label-sm font-label-sm text-secondary hover:bg-surface-container transition-all outline-none focus:ring-2 focus:ring-primary/20">
            <option value="">Trạng thái</option>
            <option value="ok">Còn hàng</option>
            <option value="low">Sắp hết</option>
            <option value="pending">Đang đặt hàng</option>
          </select>
          <span className="material-symbols-outlined text-[18px] absolute right-sm top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
            filter_list
          </span>
        </div>

        {/* Date Sort */}
        <div className="relative group">
          <select className="appearance-none flex items-center gap-xs px-md py-sm pr-10 bg-surface-container-lowest border border-surface-container rounded-xl text-label-sm font-label-sm text-secondary hover:bg-surface-container transition-all outline-none focus:ring-2 focus:ring-primary/20">
            <option value="newest">Sắp xếp: Mới nhất</option>
            <option value="oldest">Sắp xếp: Cũ nhất</option>
            <option value="az">Tên: A-Z</option>
          </select>
          <span className="material-symbols-outlined text-[18px] absolute right-sm top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
            sort
          </span>
        </div>
      </div>

      <div className="flex items-center gap-sm">
        <button className="px-md py-sm bg-secondary-container text-primary font-label-sm text-label-sm rounded-xl flex items-center gap-xs hover:bg-secondary-container/80 transition-all outline-none">
          <span className="material-symbols-outlined text-[18px]">file_download</span>
          Xuất báo cáo
        </button>
        <button className="px-md py-sm bg-primary text-on-primary font-label-sm text-label-sm rounded-xl flex items-center gap-xs shadow-md active:scale-95 transition-all outline-none">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Thêm SKU mới
        </button>
      </div>
    </section>
  );
};

export default FilterBar;
