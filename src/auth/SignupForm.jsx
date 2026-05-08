import SocialLogin from "./SocialLogin";

const Input = ({ icon, placeholder, type = "text" }) => {
  return (
    <div className="relative">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
        {icon}
      </span>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-[52px] pl-12 pr-4 bg-surface-container-low rounded-xl focus:ring-2 focus:ring-primary-container outline-none"
      />
    </div>
  );
};

const SignupForm = () => {
  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center lg:text-left">
        <h2 className="text-3xl font-bold text-primary">Tạo tài khoản</h2>
        <p className="text-secondary mt-2">Bắt đầu quản lý kho với LogiFlow</p>
      </div>

      <form className="space-y-4">
        <Input icon="person" placeholder="Họ và tên" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input icon="mail" placeholder="Email" type="email" />
          <Input icon="call" placeholder="Số điện thoại" />
        </div>

        <Input icon="lock" placeholder="Mật khẩu" type="password" />
        <Input
          icon="lock_reset"
          placeholder="Xác nhận mật khẩu"
          type="password"
        />

        {/* checkbox */}
        <div className="flex items-center gap-2 text-sm text-secondary">
          <input type="checkbox" />
          <span>
            Tôi đồng ý với{" "}
            <span className="text-primary font-semibold">điều khoản</span>
          </span>
        </div>

        {/* submit */}
        <button
          type="submit"
          className="w-full h-[52px] bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary-container transition"
        >
          Tạo tài khoản
        </button>
      </form>

      {/* divider */}
      <div className="my-6 text-center text-xs text-secondary">
        Hoặc đăng ký bằng
      </div>

      {/* social login */}
      <SocialLogin />

      <p className="text-center mt-6 text-sm text-secondary">
        Đã có tài khoản?
        <span className="text-primary font-bold ml-1 cursor-pointer">
          Đăng nhập
        </span>
      </p>
    </div>
  );
};

export default SignupForm;
