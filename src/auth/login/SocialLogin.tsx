import { Link } from "react-router-dom";

export default function SocialLogin() {
  return (
    <>
      <div className="mt-lg">
        <footer className="mt-xl pt-lg border-t border-surface-container text-center">
          <p className="font-body-md text-body-md text-secondary">
            Chưa có tài khoản?
            <Link
              className="text-primary font-semibold hover:underline underline-offset-4 ml-xs"
              to="/register"
            >
              Đăng ký ngay
            </Link>
          </p>
        </footer>
        <div className="mt-lg">
          <div className="relative flex items-center justify-center mb-lg">
            <div className="border-t border-surface-container w-full"></div>
            <span className="absolute bg-surface-container-lowest px-md font-label-xs text-label-xs text-outline uppercase tracking-wider">
              Hoặc đăng nhập với
            </span>
          </div>
          <div className="grid grid-cols-2 gap-md">
            <button className="flex items-center justify-center gap-xs py-sm px-md bg-surface-container-low rounded-xl font-label-sm text-on-surface hover:bg-surface-container-high transition-colors">
              <img
                alt="Google"
                className="w-5 h-5"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDA5UxtrIUCyb1HZLEGawc7R6j8ItRslIlkohvALs6HLUHxsWxawY1unS15lxHrS1AsHZe6DfoLW-MWf8Avh_8_WdPUb6yh1q1T3idhaEIRsj4x7JmqhmUODfHD1FudpGIX1Y03IoS2O7ZhFllp1TxY_4cNIYbcOYbcwRZem09buJICAxQ77i56ANT1s0BJafZLOq6wnvFVCG3qHg0xA9L5jTklxC-PDVtHs9rKU1G66Aj2Ej-Qsug48JzvZXlHlVyZHDQnx9uvCH0"
              />
              Google
            </button>
            <button className="flex items-center justify-center gap-xs py-sm px-md bg-surface-container-low rounded-xl font-label-sm text-on-surface hover:bg-surface-container-high transition-colors">
              <span
                className="material-symbols-outlined text-[#1877F2]"
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
