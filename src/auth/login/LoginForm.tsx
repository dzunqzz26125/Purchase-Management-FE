import { useForm } from "react-hook-form";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import SocialLogin from "./SocialLogin";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import api from "../../api/client";
import { setAccessToken } from "../../api/client";
import { getApiErrorMessage } from "../../api/getApiErrorMessage";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const verified = searchParams.get("verified") === "true";
  const registered = (location.state as { registered?: boolean })?.registered;
  const registeredEmail = (location.state as { email?: string })?.email;
  const emailVerificationRequired = (
    location.state as { emailVerificationRequired?: boolean }
  )?.emailVerificationRequired;
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [lastEmail, setLastEmail] = useState("");

  const showResend =
    serverError.includes("chưa được xác nhận") ||
    serverError.includes("xác nhận kích hoạt");

  const handleResendVerification = async () => {
    const email =
      lastEmail ||
      registeredEmail ||
      String(watch("email") || "")
        .trim()
        .toLowerCase();
    if (!email) {
      setResendMessage("Vui lòng nhập email đăng ký trước.");
      return;
    }
    setResending(true);
    setResendMessage("");
    try {
      await api.post("/auth/resend-verification", { email });
      setResendMessage("Đã gửi lại email xác thực. Vui lòng kiểm tra hộp thư (cả spam).");
    } catch (error: unknown) {
      setResendMessage(
        getApiErrorMessage(error, "Không gửi được email xác thực."),
      );
    } finally {
      setResending(false);
    }
  };

  const onSubmit = async (data: any) => {
    setServerError("");
    setResendMessage("");
    const email = String(data.email).trim().toLowerCase();
    setLastEmail(email);
    try {
      setLoading(true);
      const res = await api.post("/auth/login", {
        email,
        password: data.password,
      });
      const accessToken = res?.data?.data?.accessToken;
      if (accessToken) setAccessToken(accessToken);
      navigate("/app/dashboard");
    } catch (error: unknown) {
      setServerError(
        getApiErrorMessage(error, "Đăng nhập thất bại. Vui lòng thử lại."),
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
          {registered && (
            <div className="p-sm bg-primary-container text-on-primary-container rounded-xl text-label-sm font-medium">
              Đăng ký thành công{registeredEmail ? ` với ${registeredEmail}` : ""}!
              {emailVerificationRequired !== false
                ? " Vui lòng kiểm tra email (cả thư spam) và bấm link xác thực trước khi đăng nhập."
                : " Bạn có thể đăng nhập ngay bây giờ."}
            </div>
          )}
          {verified && (
            <div className="p-sm bg-primary-container text-on-primary-container rounded-xl text-label-sm font-medium">
              Xác thực email thành công! Bạn có thể đăng nhập ngay bây giờ.
            </div>
          )}
          {serverError && (
            <div className="p-sm bg-error-container text-on-error-container rounded-xl text-label-sm font-medium space-y-sm">
              <p>{serverError}</p>
              {showResend && (
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={resending}
                  className="text-primary font-semibold underline underline-offset-2 disabled:opacity-60"
                >
                  {resending ? "Đang gửi lại..." : "Gửi lại email xác thực"}
                </button>
              )}
            </div>
          )}
          {resendMessage && (
            <div className="p-sm bg-primary-container text-on-primary-container rounded-xl text-label-sm font-medium">
              {resendMessage}
            </div>
          )}
          <InputField
            {...register("email", {
              required: "Vui lòng nhập email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email không hợp lệ",
              },
            })}
            label="Email"
            icon="mail"
            type="email"
            placeholder="example@logiflow.vn"
          />
          {errors.email && (
            <span className="text-error text-label-xs">
              {errors.email.message as string}
            </span>
          )}

          <PasswordField
            {...register("password", {
              required: "Vui lòng nhập mật khẩu",
              minLength: {
                value: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự",
              },
            })}
          />
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

        <SocialLogin />
      </div>
    </section>
  );
}
