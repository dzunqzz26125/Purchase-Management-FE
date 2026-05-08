const HeroSection = () => {
  return (
    <section className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div>
          <span className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full text-xs font-semibold">
            NEW: Giải pháp AI tối ưu SKU
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight mt-4">
            Quản lý kho thông minh,
            <br />
            <span className="text-on-primary-container">Tối ưu vận hành</span>
          </h1>

          <p className="text-secondary mt-4 text-lg leading-relaxed max-w-xl">
            LogiFlow giúp tự động hóa quy trình kho, giảm sai sót và tăng tốc xử
            lý đơn hàng.
          </p>

          <div className="flex gap-4 mt-6">
            <button className="px-6 py-3 bg-primary text-on-primary rounded-xl shadow hover:scale-[1.02] transition">
              Bắt đầu dùng thử
            </button>

            <button className="px-6 py-3 border border-surface-container rounded-xl text-primary hover:bg-surface-container-low transition">
              Xem demo
            </button>
          </div>
        </div>

        {/* Right image */}
        <div className="relative">
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary-fixed opacity-20 blur-3xl rounded-full" />

          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5jZ-Z3UApjJXtyGL7f4r6pmFmmspScadOgopOdRMwvNAr0lzZAPF8gGYHEGhbSX2sLmd8_jV7oeq6DwuBIKnxRjzHjqVGRsKo2tkLXkzBhvOYCB-Q0Yg6PWRut8_UNFp_c1dP4mJ71dqBQUZNh2d4715xRc2rt9zAw5KSeGbWjC3UU7KfoIt43I8zfOgn110ooZR_ZldUTehz3YdGtHloPgoJH_NFkmcN4u_zkVgznLMjLCoWv-zQ1joav0M6gWeeeTUz_dSXSqg"
            alt="dashboard"
            className="rounded-2xl shadow-xl relative"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
