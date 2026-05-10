const Sidebar = () => {
  const menu = [
    { icon: "dashboard", label: "Dashboard", active: true },
    { icon: "inventory_2", label: "Inventory" },
    { icon: "swap_horiz", label: "Stock Movements" },
    { icon: "analytics", label: "Reporting" },
    { icon: "map", label: "Warehouse Map" },
  ];

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-surface-container bg-surface-bright py-md">
      <div className="px-md mb-lg">
        <div className="flex items-center gap-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container">
            <span
              className="material-symbols-outlined text-on-primary-container"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              warehouse
            </span>
          </div>
          <div>
            <h2 className="text-[18px] font-bold text-primary">LogiFlow</h2>
            <p className="text-label-xs text-secondary">Central Hub</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {menu.map((item, i) => (
          <a
            key={i}
            href="#"
            className={`mx-xs flex items-center gap-sm rounded-lg px-sm py-xs transition-colors duration-150 ${
              item.active
                ? "bg-secondary-container font-semibold text-primary"
                : "text-secondary hover:bg-surface-container-high"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={
                item.active ? { fontVariationSettings: "'FILL' 1" } : undefined
              }
            >
              {item.icon}
            </span>
            <span className="text-label-sm">{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="mt-auto space-y-1 px-xs">
        <button className="mb-md flex w-full items-center justify-center gap-xs rounded-xl bg-primary py-sm text-label-sm text-on-primary shadow-lg transition-all hover:opacity-90 active:scale-95">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add New SKU
        </button>
        <a
          className="flex items-center gap-sm rounded-lg px-sm py-xs text-secondary transition-colors duration-150 hover:bg-surface-container-high"
          href="#"
        >
          <span className="material-symbols-outlined">help</span>
          <span className="text-label-sm">Help Center</span>
        </a>
        <a
          className="flex items-center gap-sm rounded-lg px-sm py-xs text-secondary transition-colors duration-150 hover:bg-surface-container-high"
          href="#"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="text-label-sm">Logout</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
