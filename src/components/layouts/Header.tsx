import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { clearAccessToken } from "../../api/client";

const Topbar = () => {
  const navigate = useNavigate();
  const { user, updateProfile, isUpdating } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      password: "",
    },
  });

  const handleLogout = async () => {
    clearAccessToken();
    navigate("/login");
  };

  const openModal = () => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber ? String(user.phoneNumber) : "",
        address: user.address || "",
        password: "",
      });
    }
    setErrorMessage("");
    setSuccessMessage("");
    setModalOpen(true);
    setDropdownOpen(false);
  };

  const onSubmit = async (data: any) => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const payload: any = {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        address: data.address.trim(),
      };
      if (data.phoneNumber) {
        payload.phoneNumber = Number(data.phoneNumber);
      }
      if (data.password) {
        payload.password = data.password;
      }

      await updateProfile(payload);
      setSuccessMessage("Cập nhật hồ sơ thành công!");
      setTimeout(() => setModalOpen(false), 1500);
    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.message || "Cập nhật thất bại. Vui lòng thử lại."
      );
    }
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
          <button className="rounded-full p-xs text-secondary transition-all hover:bg-surface-container-low">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="rounded-full p-xs text-secondary transition-all hover:bg-surface-container-low">
            <span className="material-symbols-outlined">settings</span>
          </button>

          {/* User profile dropdown trigger */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="ml-xs flex items-center gap-sm cursor-pointer p-xs rounded-xl hover:bg-surface-container-low transition-all"
            >
              <div className="h-10 w-10 rounded-full border-2 border-primary-container/20 bg-primary/10 text-primary font-bold flex items-center justify-center text-label-md">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-label-sm font-bold text-primary">
                  {user?.name || "Đang tải..."}
                </p>
                <p className="text-label-xs text-secondary">
                  {roleLabel(user?.role)}
                </p>
              </div>
              <span className="material-symbols-outlined text-[16px] text-secondary">
                keyboard_arrow_down
              </span>
            </button>

            {dropdownOpen && (
              <>
                <button
                  onClick={() => setDropdownOpen(false)}
                  className="fixed inset-0 z-10 w-full h-full cursor-default"
                />
                <div className="absolute right-0 mt-xs w-48 rounded-xl bg-surface-bright shadow-lg border border-surface-container py-xs z-20">
                  <button
                    onClick={openModal}
                    className="w-full text-left px-md py-sm text-body-md hover:bg-surface-container-low text-primary flex items-center gap-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      account_circle
                    </span>
                    Hồ sơ cá nhân
                  </button>
                  <hr className="border-surface-container my-1" />
                  <button
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

      {/* Profile Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-md">
          <button
            type="button"
            className="absolute inset-0 bg-on-surface/40"
            onClick={() => setModalOpen(false)}
            aria-label="Đóng"
          />
          <div className="relative z-10 w-full max-w-md max-h-[90vh] overflow-y-auto bg-surface-container-lowest rounded-3xl shadow-xl border border-surface-container">
            <div className="sticky top-0 bg-surface-container-lowest border-b border-surface-container px-md py-md flex items-center justify-between">
              <h2 className="text-h3 font-semibold">Cập nhật hồ sơ</h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-xs text-secondary hover:text-primary rounded-lg"
              >
                <span className="material-symbols-outlined cursor-pointer">
                  close
                </span>
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-md space-y-md">
              {errorMessage && (
                <div className="p-sm bg-error-container text-on-error-container rounded-xl text-label-sm font-medium">
                  {errorMessage}
                </div>
              )}
              {successMessage && (
                <div className="p-sm bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-label-sm font-medium">
                  {successMessage}
                </div>
              )}

              <div className="space-y-xs">
                <label className="text-label-sm text-on-surface font-medium">
                  Họ và tên *
                </label>
                <input
                  className="w-full px-md py-sm bg-surface-container-low border border-surface-container rounded-xl text-body-md outline-none focus:ring-2 focus:ring-primary/20"
                  {...register("name", { required: "Vui lòng nhập họ và tên" })}
                />
                {errors.name && (
                  <p className="text-error text-label-xs">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-xs">
                <label className="text-label-sm text-on-surface font-medium">
                  Email *
                </label>
                <input
                  type="email"
                  className="w-full px-md py-sm bg-surface-container-low border border-surface-container rounded-xl text-body-md outline-none focus:ring-2 focus:ring-primary/20"
                  {...register("email", {
                    required: "Vui lòng nhập email",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email không hợp lệ",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-error text-label-xs">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-xs">
                <label className="text-label-sm text-on-surface font-medium">
                  Số điện thoại
                </label>
                <input
                  className="w-full px-md py-sm bg-surface-container-low border border-surface-container rounded-xl text-body-md outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="090..."
                  {...register("phoneNumber", {
                    pattern: {
                      value: /^[0-9]{9,12}$/,
                      message: "Số điện thoại gồm 9-12 chữ số",
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <p className="text-error text-label-xs">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              <div className="space-y-xs">
                <label className="text-label-sm text-on-surface font-medium">
                  Địa chỉ
                </label>
                <input
                  className="w-full px-md py-sm bg-surface-container-low border border-surface-container rounded-xl text-body-md outline-none focus:ring-2 focus:ring-primary/20"
                  {...register("address")}
                />
              </div>

              <div className="space-y-xs">
                <label className="text-label-sm text-on-surface font-medium">
                  Mật khẩu mới (để trống nếu không đổi)
                </label>
                <input
                  type="password"
                  className="w-full px-md py-sm bg-surface-container-low border border-surface-container rounded-xl text-body-md outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="••••••••"
                  {...register("password", {
                    minLength: {
                      value: 6,
                      message: "Mật khẩu tối thiểu 6 ký tự",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-error text-label-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-sm pt-sm border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-md py-sm cursor-pointer rounded-xl border border-surface-container text-secondary hover:bg-surface-container transition-all"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-md py-sm cursor-pointer bg-primary text-on-primary rounded-xl font-label-sm disabled:opacity-60 flex items-center gap-xs"
                >
                  {isUpdating && (
                    <span className="material-symbols-outlined animate-spin text-[18px]">
                      progress_activity
                    </span>
                  )}
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;
