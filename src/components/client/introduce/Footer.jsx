const FooterIntro = () => {
  return (
    <footer className="py-lg px-container-padding border-t border-surface-container">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-md">
        <div className="font-h3 text-h3 font-bold text-primary">LogiFlow</div>
        <div className="flex gap-lg">
          <a
            className="text-label-sm font-label-sm text-secondary hover:text-primary"
            href="#"
          >
            Điều khoản
          </a>
          <a
            className="text-label-sm font-label-sm text-secondary hover:text-primary"
            href="#"
          >
            Bảo mật
          </a>
          <a
            className="text-label-sm font-label-sm text-secondary hover:text-primary"
            href="#"
          >
            Hỗ trợ
          </a>
        </div>
        <p className="text-label-xs font-label-xs text-secondary">
          © 2026 LogiFlow WMS. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterIntro;
