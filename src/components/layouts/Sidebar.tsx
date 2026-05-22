import { NavLink, useNavigate } from "react-router-dom";
import api from "../../api/client";
import { clearAccessToken } from "../../api/client";

const Sidebar = () => {
  const navigate = useNavigate();

  const menu = [
    { icon: "dashboard", link: "/app/dashboard", label: "Dashboard" },
    { icon: "inventory_2", link: "/app/inventory", label: "Tồn kho" },
    { icon: "input", link: "/app/po", label: "Nhập kho (PO)" },
    { icon: "output", link: "/app/so", label: "Xuất kho (SO)" },
    { icon: "groups", link: "/app/providers", label: "Nhà cung cấp" },
    { icon: "analytics", link: "/app/report", label: "Báo cáo" },
  ];

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      /* ignore */
    }
    clearAccessToken();
    navigate("/login");
  };

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
            <p className="text-label-xs text-secondary">WMS</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {menu.map((item) => (
          <NavLink
            to={item.link}
            key={item.link}
            className={({ isActive }) =>
              `mx-xs flex items-center gap-sm rounded-lg px-sm py-xs transition-colors duration-150 ${
                isActive
                  ? "bg-secondary-container font-semibold text-primary"
                  : "text-secondary hover:bg-surface-container-high"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className="material-symbols-outlined"
                  style={
                    isActive
                      ? { fontVariationSettings: "'FILL' 1" }
                      : undefined
                  }
                >
                  {item.icon}
                </span>
                <span className="text-label-sm">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-xs">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-sm rounded-lg px-sm py-xs text-secondary transition-colors hover:bg-surface-container-high"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="text-label-sm">Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
