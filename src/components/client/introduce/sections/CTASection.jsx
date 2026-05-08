const CTASection = () => {
  return (
    <section className="py-20 relative">
      <div className="max-w-4xl mx-auto bg-primary text-on-primary text-center rounded-2xl p-12 shadow-xl">
        <h2 className="text-3xl font-bold mb-4">
          Sẵn sàng tối ưu kho hàng của bạn?
        </h2>

        <p className="text-white/80 mb-8">
          Tham gia cùng hàng trăm doanh nghiệp đã sử dụng LogiFlow
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:scale-[1.02] transition">
            Đăng ký ngay
          </button>

          <button className="border border-white/40 px-6 py-3 rounded-xl hover:bg-white/10 transition">
            Liên hệ tư vấn
          </button>
        </div>
      </div>

      {/* glow background */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-primary-container/30 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary-container/30 blur-[120px] rounded-full" />
    </section>
  );
};

export default CTASection;
