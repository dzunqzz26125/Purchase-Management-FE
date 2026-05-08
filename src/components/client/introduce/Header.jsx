const HeaderIntro = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-surface/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-between">
        <div className="text-xl font-bold text-primary">LogiFlow WMS</div>

        <nav className="hidden md:flex gap-6">
          <a className="text-primary border-b-2 border-primary pb-1" href="#">
            Trang chủ
          </a>
          <a className="text-secondary hover:text-primary transition" href="#">
            Tính năng
          </a>
          <a className="text-secondary hover:text-primary transition" href="#">
            Giải pháp
          </a>
          <a className="text-secondary hover:text-primary transition" href="#">
            Bảng giá
          </a>
        </nav>

        <div className="flex gap-3">
          <button className="px-4 py-2 text-primary hover:bg-surface-container-low rounded-lg transition">
            Đăng nhập
          </button>
          <button className="px-4 py-2 bg-primary text-on-primary rounded-lg hover:scale-[1.02] transition">
            Đăng ký ngay
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderIntro;
