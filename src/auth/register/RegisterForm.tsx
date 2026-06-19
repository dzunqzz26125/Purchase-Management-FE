import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";
import { getApiErrorMessage } from "../../api/getApiErrorMessage";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const password = watch("password");

  const onSubmit = async (data: any) => {
    setServerError("");
    try {
      setLoading(true);
      const res = await api.post("/auth/register", {
        name: String(data.name).trim(),
        email: String(data.email).trim().toLowerCase(),
        password: data.password,
        phoneNumber: data.phone ? String(data.phone).trim() : undefined,
      });
      const emailVerificationRequired =
        res?.data?.data?.emailVerificationRequired !== false;
      navigate("/login", {
        state: {
          registered: true,
          emailVerificationRequired,
          email: String(data.email).trim().toLowerCase(),
        },
      });
    } catch (error: unknown) {
      setServerError(
        getApiErrorMessage(error, "Đăng ký thất bại. Vui lòng thử lại."),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-md">
        {serverError && (
          <div className="p-sm bg-error-container text-on-error-container rounded-xl text-label-sm font-medium">
            {serverError}
          </div>
        )}

        <div className="flex flex-col gap-xs">
          <label
            className="font-label-sm text-label-sm text-on-surface-variant"
            htmlFor="name"
          >
            Họ và tên
          </label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
              person
            </span>
            <input
              {...register("name", { required: "Vui lòng nhập họ và tên" })}
              className={`w-full h-13 pl-12 pr-md bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary-container focus:bg-surface-container transition-all placeholder:text-outline/60 focus:placeholder-transparent ${errors.name ? "ring-1 ring-error focus:ring-error" : ""}`}
              id="name"
              placeholder="Nguyễn Văn A"
              type="text"
            />
          </div>
          {errors.name && <span className="text-error text-label-xs">{errors.name.message as string}</span>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="flex flex-col gap-xs">
            <label
              className="font-label-sm text-label-sm text-on-surface-variant"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                mail
              </span>
              <input
                {...register("email", { 
                  required: "Vui lòng nhập email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email không hợp lệ"
                  }
                })}
                className={`w-full h-[52px] pl-[48px] pr-md bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary-container focus:bg-surface-container transition-all placeholder:text-outline/60 focus:placeholder-transparent ${errors.email ? "ring-1 ring-error focus:ring-error" : ""}`}
                id="email"
                placeholder="example@logiflow.vn"
                type="email"
              />
            </div>
            {errors.email && <span className="text-error text-label-xs">{errors.email.message as string}</span>}
          </div>

          <div className="flex flex-col gap-xs">
            <label
              className="font-label-sm text-label-sm text-on-surface-variant"
              htmlFor="phone"
            >
              Số điện thoại
            </label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                call
              </span>
              <input
                {...register("phone", { required: "Vui lòng nhập số điện thoại" })}
                className={`w-full h-[52px] pl-[48px] pr-md bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary-container focus:bg-surface-container transition-all placeholder:text-outline/60 focus:placeholder-transparent ${errors.phone ? "ring-1 ring-error focus:ring-error" : ""}`}
                id="phone"
                placeholder="0901234567"
                type="tel"
              />
            </div>
            {errors.phone && <span className="text-error text-label-xs">{errors.phone.message as string}</span>}
          </div>
        </div>

        <div className="flex flex-col gap-xs">
          <label
            className="font-label-sm text-label-sm text-on-surface-variant"
            htmlFor="password"
          >
            Mật khẩu
          </label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
              lock
            </span>
            <input
              {...register("password", { 
                required: "Vui lòng nhập mật khẩu",
                minLength: { value: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" }
              })}
              className={`w-full h-[52px] pl-[48px] pr-md bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary-container focus:bg-surface-container transition-all placeholder:text-outline/60 focus:placeholder-transparent ${errors.password ? "ring-1 ring-error focus:ring-error" : ""}`}
              id="password"
              placeholder="••••••••"
              type="password"
            />
          </div>
          {errors.password && <span className="text-error text-label-xs">{errors.password.message as string}</span>}
        </div>

        <div className="flex flex-col gap-xs">
          <label
            className="font-label-sm text-label-sm text-on-surface-variant"
            htmlFor="confirm_password"
          >
            Xác nhận mật khẩu
          </label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
              lock_reset
            </span>
            <input
              {...register("confirm_password", { 
                required: "Vui lòng xác nhận mật khẩu",
                validate: value => value === password || "Mật khẩu xác nhận không khớp"
              })}
              className={`w-full h-[52px] pl-[48px] pr-md bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary-container focus:bg-surface-container transition-all placeholder:text-outline/60 focus:placeholder-transparent ${errors.confirm_password ? "ring-1 ring-error focus:ring-error" : ""}`}
              id="confirm_password"
              placeholder="••••••••"
              type="password"
            />
          </div>
          {errors.confirm_password && <span className="text-error text-label-xs">{errors.confirm_password.message as string}</span>}
        </div>

        <div className="flex items-center gap-xs my-xs">
          <input
            {...register("terms", { required: "Bạn cần đồng ý với điều khoản" })}
            className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary-container"
            id="terms"
            type="checkbox"
          />
          <label
            className="font-label-sm text-label-sm text-on-surface-variant"
            htmlFor="terms"
          >
            Tôi đồng ý với các{" "}
            <a className="text-primary font-semibold hover:underline" href="#">Điều khoản</a>{" "}
            và{" "}
            <a className="text-primary font-semibold hover:underline" href="#">Chính sách bảo mật</a>.
          </label>
        </div>
        {errors.terms && <span className="text-error text-label-xs mt-[-10px]">{errors.terms.message as string}</span>}

        <button
          className={`w-full h-[52px] cursor-pointer bg-primary text-on-primary font-label-sm text-label-sm rounded-xl soft-shadow hover:bg-primary-container transition-all active:scale-[0.98] mt-xs flex items-center justify-center gap-2 ${loading ? 'opacity-70 pointer-events-none' : ''}`}
          type="submit"
          disabled={loading}
        >
          {loading && <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>}
          {loading ? "Đang xử lý..." : "Tạo tài khoản"}
        </button>
      </form>
    </>
  );
};

export default RegisterForm;