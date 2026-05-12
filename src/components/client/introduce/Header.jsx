const HeaderIntro = () => {
  return (
    <header className="sticky top-0 z-40 flex justify-between items-center w-full px-md py-xs bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md shadow-[0_10px_30px_-5px_rgba(30,58,138,0.05)]">
      <div className="flex items-center gap-md">
        <div className="font-h3 text-h3 font-bold text-primary dark:text-primary-fixed">
          LogiFlow WMS
        </div>
        <nav className="hidden md:flex gap-md ml-lg">
          <a
            className="font-label-sm text-label-sm text-primary border-b-2 border-primary pb-1"
            href="#"
          >
            Trang chủ
          </a>
          <a
            className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors"
            href="#"
          >
            Tính năng
          </a>
          <a
            className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors"
            href="#"
          >
            Giải pháp
          </a>
          <a
            className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors"
            href="#"
          >
            Bảng giá
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-sm">
        <button className="px-md py-xs font-label-sm text-label-sm text-primary hover:bg-surface-container-low rounded-lg transition-all">
          Đăng nhập
        </button>
        <button className="px-md py-xs font-label-sm text-label-sm bg-primary text-on-primary rounded-lg shadow-sm hover:scale-[1.02] transition-transform active:scale-95">
          Đăng ký ngay
        </button>
      </div>
    </header>
  );
};

export default HeaderIntro;
