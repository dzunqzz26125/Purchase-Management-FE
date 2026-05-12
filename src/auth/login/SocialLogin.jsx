import { Link } from "react-router-dom";

export default function SocialLogin() {
  return (
    <>
      <div className="mt-lg">
        <div class="flex items-center justify-between py-xs">
          <label class="flex items-center gap-xs cursor-pointer group">
            <div class="relative flex items-center">
              <input
                class="peer h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary/20 bg-surface-container-low transition-all"
                type="checkbox"
              />
            </div>
            <span class="font-label-sm text-label-sm text-secondary group-hover:text-on-surface transition-colors">
              Ghi nhớ đăng nhập
            </span>
          </label>
          <a
            class="font-label-sm text-label-sm text-primary hover:underline underline-offset-4 font-semibold"
            href="#"
          >
            Quên mật khẩu?
          </a>
        </div>
        <button
          class="w-full py-[14px] bg-primary text-white rounded-xl font-h3 text-[16px] font-semibold soft-shadow hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-xs"
          type="submit"
        >
          Đăng nhập
          <span
            class="material-symbols-outlined text-[20px]"
            data-icon="arrow_forward"
          >
            arrow_forward
          </span>
        </button>
        <footer class="mt-xl pt-lg border-t border-surface-container text-center">
          <p class="font-body-md text-body-md text-secondary">
            Chưa có tài khoản?
            <Link
              class="text-primary font-semibold hover:underline underline-offset-4 ml-xs"
              href="#"
            >
              Đăng ký ngay
            </Link>
          </p>
        </footer>
        <div class="mt-lg">
          <div class="relative flex items-center justify-center mb-lg">
            <div class="border-t border-surface-container w-full"></div>
            <span class="absolute bg-surface-container-lowest px-md font-label-xs text-label-xs text-outline uppercase tracking-wider">
              Hoặc đăng nhập với
            </span>
          </div>
          <div class="grid grid-cols-2 gap-md">
            <button class="flex items-center justify-center gap-xs py-sm px-md bg-surface-container-low rounded-xl font-label-sm text-on-surface hover:bg-surface-container-high transition-colors">
              <img
                alt="Google"
                class="w-5 h-5"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDA5UxtrIUCyb1HZLEGawc7R6j8ItRslIlkohvALs6HLUHxsWxawY1unS15lxHrS1AsHZe6DfoLW-MWf8Avh_8_WdPUb6yh1q1T3idhaEIRsj4x7JmqhmUODfHD1FudpGIX1Y03IoS2O7ZhFllp1TxY_4cNIYbcOYbcwRZem09buJICAxQ77i56ANT1s0BJafZLOq6wnvFVCG3qHg0xA9L5jTklxC-PDVtHs9rKU1G66Aj2Ej-Qsug48JzvZXlHlVyZHDQnx9uvCH0"
              />
              Google
            </button>
            <button class="flex items-center justify-center gap-xs py-sm px-md bg-surface-container-low rounded-xl font-label-sm text-on-surface hover:bg-surface-container-high transition-colors">
              <span
                class="material-symbols-outlined text-[#1877F2]"
                data-icon="hub"
              >
                hub
              </span>
              SSO Doanh nghiệp
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
