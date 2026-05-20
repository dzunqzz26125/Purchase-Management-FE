import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../mock/api";

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data: any) => {
    setServerError("");
    try {
      setLoading(true);
      const res = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
      const accessToken = res?.data?.data?.accessToken;
      if (accessToken) {
        localStorage.setItem("accessToken", JSON.stringify(accessToken));
      }
      navigate("/app/inventory");
    } catch (error: any) {
      setServerError(
        error.response?.data?.message ||
          "Đăng nhập thất bại. Vui lòng thử lại.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="flex flex-col justify-center px-md py-xl md:px-xl">
      <div className="max-w-110 mx-auto w-full">
        <h2 className="text-h2 mb-xs">Chào mừng trở lại</h2>

        <form className="space-y-md" onSubmit={handleSubmit(onSubmit)}>
          {serverError && (
            <div className="p-sm bg-error-container text-on-error-container rounded-xl text-label-sm font-medium">
              {serverError}
            </div>
          )}
          {errors.email && (
            <span className="text-error text-label-xs">
              {errors.email.message as string}
            </span>
          )}
          {errors.password && (
            <span className="text-error text-label-xs">
              {errors.password.message as string}
            </span>
          )}

          <div className="flex items-center justify-between py-xs">
            <label className="flex items-center gap-xs cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  className="peer h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary/20 bg-surface-container-low transition-all"
                  type="checkbox"
                />
              </div>
              <span className="font-label-sm text-label-sm text-secondary group-hover:text-on-surface transition-colors">
                Ghi nhớ đăng nhập
              </span>
            </label>
            <a
              className="font-label-sm text-label-sm text-primary hover:underline underline-offset-4 font-semibold"
              href="#"
            >
              Quên mật khẩu?
            </a>
          </div>
          <button
            className={`w-full h-13 cursor-pointer bg-primary text-on-primary font-label-sm text-label-sm rounded-xl soft-shadow hover:bg-primary-container transition-all active:scale-[0.98] mt-xs flex items-center justify-center gap-2 ${loading ? "opacity-70 pointer-events-none" : ""}`}
            type="submit"
            disabled={loading}
          >
            {loading && (
              <span className="material-symbols-outlined animate-spin text-[18px]">
                progress_activity
              </span>
            )}
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            <span
              className="material-symbols-outlined text-[20px]"
              data-icon="arrow_forward"
            >
              arrow_forward
            </span>
          </button>
        </form>
      </div>
    </section>
  );
}
