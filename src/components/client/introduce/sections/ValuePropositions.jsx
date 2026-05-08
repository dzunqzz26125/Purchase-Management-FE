const features = [
  {
    title: "Dữ liệu thời gian thực",
    desc: "Cập nhật tồn kho ngay lập tức",
    icon: "📦",
    bg: "bg-primary-fixed",
  },
  {
    title: "Tự động hóa",
    desc: "Giảm thao tác thủ công",
    icon: "⚙️",
    bg: "bg-tertiary-fixed",
  },
  {
    title: "Báo cáo thông minh",
    desc: "Phân tích hiệu suất kho",
    icon: "📊",
    bg: "bg-secondary-fixed",
  },
  {
    title: "Dễ sử dụng",
    desc: "Làm quen trong 15 phút",
    icon: "👆",
    bg: "bg-error-container",
  },
];

const ValuePropositions = () => {
  return (
    <section className="py-20 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">
            Giải pháp toàn diện
          </h2>
          <p className="text-secondary mt-2">
            Mọi công cụ bạn cần để quản lý kho
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow hover:-translate-y-1 transition"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${f.bg}`}
              >
                <span className="text-xl">{f.icon}</span>
              </div>

              <h3 className="font-semibold text-primary mb-2">{f.title}</h3>

              <p className="text-secondary text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositions;
