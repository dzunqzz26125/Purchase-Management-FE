import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { clearAccessToken } from "../../api/client";
import { agencyApi } from "../../api/agencyApi";
import ProfileModal from "../profile/ProfileModal";

const Topbar = () => {
  const navigate = useNavigate();
  const { user, updateProfile, isUpdating } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: agency } = useQuery({
    queryKey: ["agencies", "me"],
    queryFn: agencyApi.getMine,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const handleLogout = async () => {
    clearAccessToken();
    navigate("/login");
  };

  const roleLabel = (role?: string) => {
    if (role === "admin") return "Quản lý kho";
    if (role === "staff") return "Nhân viên kho";
    return "Người dùng";
  };

  return (
    <>
      <header className="sticky top-0 z-40 flex w-full items-center justify-between bg-surface/80 px-md py-xs shadow-[0_10px_30px_-5px_rgba(30,58,138,0.05)] backdrop-blur-md">
        <div className="flex max-w-100 flex-1 items-center">
          <div className="relative w-100 overflow-hidden rounded-xl bg-surface-container-low transition-all duration-200 focus-within:ring-2 focus-within:ring-primary-container">
            <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-secondary">
              search
            </span>
            <input
              className="bg-transparent w-full min-w-[320px] border-none pl-xl pr-2 py-sm text-body-md placeholder:text-outline outline-none focus:outline-none focus:ring-0"
              placeholder="Tìm kiếm hàng hóa, đơn hàng..."
              type="text"
            />
          </div>
        </div>

        <div className="ml-md flex items-center gap-md">
          <button
            type="button"
            className="rounded-full p-xs text-secondary transition-all hover:bg-surface-container-low"
          >
            <span className="material-symbols-outlined">notifications</span>
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="ml-xs flex items-center gap-sm cursor-pointer p-xs rounded-xl hover:bg-surface-container-low transition-all"
            >
              <div className="h-10 w-10 rounded-full border-2 border-primary-container/20 bg-primary/10 text-primary font-bold flex items-center justify-center text-label-md">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="hidden lg:block text-left max-w-[200px]">
                <p className="text-label-sm font-bold text-primary truncate">
                  {user?.name || "Đang tải..."}
                </p>
                <p className="text-label-xs text-secondary truncate">
                  {agency?.name || roleLabel(user?.role)}
                </p>
              </div>
              <span className="material-symbols-outlined text-[16px] text-secondary">
                keyboard_arrow_down
              </span>
            </button>

            {dropdownOpen && (
              <>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(false)}
                  className="fixed inset-0 z-10 w-full h-full cursor-default"
                  aria-label="Đóng menu"
                />
                <div className="absolute right-0 mt-xs w-52 rounded-xl bg-surface-bright shadow-lg border border-surface-container py-xs z-20">
                  {agency && (
                    <p className="px-md py-xs text-label-xs text-secondary border-b border-surface-container mb-1 truncate">
                      {agency.name}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setModalOpen(true);
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-md py-sm text-body-md hover:bg-surface-container-low text-primary flex items-center gap-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      account_circle
                    </span>
                    Hồ sơ & Đại lý
                  </button>
                  <hr className="border-surface-container my-1" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-md py-sm text-body-md hover:bg-error-container/10 text-error flex items-center gap-sm cursor-pointer font-semibold"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      logout
                    </span>
                    Đăng xuất
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <ProfileModal
        open={modalOpen}
        user={user}
        isUpdating={isUpdating}
        onClose={() => setModalOpen(false)}
        onSaveProfile={updateProfile}
      />
    </>
  );
};

export default Topbar;
