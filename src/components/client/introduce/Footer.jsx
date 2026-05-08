const FooterIntro = () => {
  return (
    <footer className="border-t border-surface-container py-10">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xl font-bold text-primary">LogiFlow</div>

        <div className="flex gap-6 text-secondary">
          <a href="#" className="hover:text-primary">
            Điều khoản
          </a>
          <a href="#" className="hover:text-primary">
            Bảo mật
          </a>
          <a href="#" className="hover:text-primary">
            Hỗ trợ
          </a>
        </div>

        <p className="text-xs text-secondary">© 2024 LogiFlow WMS</p>
      </div>
    </footer>
  );
};

export default FooterIntro;
