const RegisterMain = () => {
  return (
    <section className="flex flex-col justify-center items-center p-md lg:p-xl bg-surface-container-lowest">
      <div className="w-full max-w-110">
        <header className="mb-xl text-center lg:text-left">
          <h2 className="font-h2 text-h2 text-primary mb-xs">Tạo tài khoản</h2>
          <p className="font-body-md text-body-md text-secondary">
            Bắt đầu quản lý kho bãi chuyên nghiệp cùng LogiFlow WMS.
          </p>
        </header>
        <form className="flex flex-col gap-md">
          <div className="flex flex-col gap-xs">
            <label
              className="font-label-sm text-label-sm text-on-surface-variant"
              htmlFor="full_name"
            >
              Họ và tên
            </label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                person
              </span>
              <input
                className="w-full h-13 pl-12 pr-md bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary-container focus:bg-surface-container transition-all placeholder:text-outline/60 focus:placeholder-transparent"
                id="full_name"
                placeholder="Nguyễn Văn A"
                type="text"
              />
            </div>
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
                  className="w-full h-[52px] pl-[48px] pr-md bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary-container focus:bg-surface-container transition-all placeholder:text-outline/60 focus:placeholder-transparent"
                  id="email"
                  placeholder="example@logiflow.vn"
                  type="email"
                />
              </div>
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
                  className="w-full h-[52px] pl-[48px] pr-md bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary-container focus:bg-surface-container transition-all placeholder:text-outline/60 focus:placeholder-transparent"
                  id="phone"
                  placeholder="0901234567"
                  type="tel"
                />
              </div>
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
                className="w-full h-[52px] pl-[48px] pr-md bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary-container focus:bg-surface-container transition-all placeholder:text-outline/60 focus:placeholder-transparent"
                id="password"
                placeholder="••••••••"
                type="password"
              />
            </div>
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
                className="w-full h-[52px] pl-[48px] pr-md bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary-container focus:bg-surface-container transition-all placeholder:text-outline/60 focus:placeholder-transparent"
                id="confirm_password"
                placeholder="••••••••"
                type="password"
              />
            </div>
          </div>
          <div className="flex items-center gap-xs my-xs">
            <input
              className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary-container"
              id="terms"
              type="checkbox"
            />
            <label
              className="font-label-sm text-label-sm text-on-surface-variant"
              htmlFor="terms"
            >
              Tôi đồng ý với các{" "}
              <a
                className="text-primary font-semibold hover:underline"
                href="#"
              >
                Điều khoản
              </a>{" "}
              và{" "}
              <a
                className="text-primary font-semibold hover:underline"
                href="#"
              >
                Chính sách bảo mật
              </a>
              .
            </label>
          </div>
          <button
            className="w-full h-[52px] bg-primary text-on-primary font-label-sm text-label-sm rounded-xl soft-shadow hover:bg-primary-container transition-all active:scale-[0.98] mt-xs"
            type="submit"
          >
            Tạo tài khoản
          </button>
        </form>
        <div className="relative my-xl">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-surface-container-highest"></div>
          </div>
          <div className="relative flex justify-center text-label-xs text-outline bg-surface-container-lowest px-sm uppercase tracking-widest">
            Hoặc đăng ký bằng
          </div>
        </div>
        <div className="grid grid-cols-2 gap-md">
          <button className="flex items-center justify-center gap-xs h-[52px] bg-surface-container-lowest border border-surface-container-highest rounded-xl hover:bg-surface-container-low transition-colors font-label-sm text-label-sm text-on-surface">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              ></path>
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              ></path>
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              ></path>
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              ></path>
            </svg>
            Google
          </button>
          <button className="flex items-center justify-center gap-xs h-[52px] bg-surface-container-lowest border border-surface-container-highest rounded-xl hover:bg-surface-container-low transition-colors font-label-sm text-label-sm text-on-surface">
            <svg className="w-5 h-5" viewBox="0 0 23 23">
              <path d="M0 0h23v23H0z" fill="#f3f3f3"></path>
              <path d="M1 1h10v10H1z" fill="#f35325"></path>
              <path d="M12 1h10v10H12z" fill="#81bc06"></path>
              <path d="M1 12h10v10H1z" fill="#05a6f0"></path>
              <path d="M12 12h10v10H12z" fill="#ffba08"></path>
            </svg>
            Microsoft
          </button>
        </div>
        <footer className="mt-xl text-center">
          <p className="font-body-md text-body-md text-secondary">
            Bạn đã có tài khoản?
            <a
              className="text-primary font-bold hover:underline ml-xs"
              href="#"
            >
              Đăng nhập ngay
            </a>
          </p>
        </footer>
      </div>
    </section>
  );
};

export default RegisterMain;
