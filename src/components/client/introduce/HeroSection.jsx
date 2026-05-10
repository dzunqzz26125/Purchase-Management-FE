const HeroSection = () => {
  return (
    <>
      <section className="relative pt-xl pb-lg px-container-padding overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-lg items-center">
          <div className="flex flex-col gap-md z-10">
            <span className="inline-flex items-center px-sm py-xs bg-secondary-container text-on-secondary-container rounded-full text-label-xs font-bold w-fit">
              NEW: Giải pháp AI tối ưu SKU
            </span>
            <h1 className="font-h1 text-h1 text-primary leading-tight">
              Quản lý kho thông minh, <br />
              <span className="text-on-primary-container">Tối ưu vận hành</span>
            </h1>
            <p className="font-body-lg text-body-lg text-secondary">
              LogiFlow cung cấp hệ thống quản lý kho (WMS) hiện đại giúp doanh
              nghiệp tự động hóa quy trình, giảm thiểu sai sót và tăng tốc độ xử
              lý đơn hàng lên đến 40%.
            </p>
            <div className="flex flex-wrap gap-md mt-sm">
              <button className="h-12 px-lg cursor-pointer bg-primary text-on-primary rounded-xl font-label-sm text-label-sm shadow-lg hover:shadow-xl transition-all">
                Bắt đầu dùng thử
              </button>
              <button className="h-12 px-lg bg-white text-primary border border-surface-container rounded-xl font-label-sm text-label-sm flex items-center gap-xs hover:bg-surface-container-low transition-all cursor-pointer">
                <span
                  className="material-symbols-outlined"
                  data-icon="play_circle"
                >
                  play_circle
                </span>
                Xem demo
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary-fixed opacity-20 blur-3xl rounded-full"></div>
            <div className="relative bg-white rounded-2xl shadow-[0_20px_50px_-10px_rgba(30,58,138,0.1)] p-sm transform lg:rotate-2">
              <img
                alt="Dashboard Preview"
                className="rounded-xl w-full h-auto object-cover"
                data-alt="A professional high-fidelity UI mockup of a warehouse management dashboard shown on a sleek monitor. The interface features clean navy blue and soft pastel blue accents with minimalist data visualizations and rounded card elements. The background is a bright, airy office environment with soft natural lighting reflecting a modern corporate atmosphere."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5jZ-Z3UApjJXtyGL7f4r6pmFmmspScadOgopOdRMwvNAr0lzZAPF8gGYHEGhbSX2sLmd8_jV7oeq6DwuBIKnxRjzHjqVGRsKo2tkLXkzBhvOYCB-Q0Yg6PWRut8_UNFp_c1dP4mJ71dqBQUZNh2d4715xRc2rt9zAw5KSeGbWjC3UU7KfoIt43I8zfOgn110ooZR_ZldUTehz3YdGtHloPgoJH_NFkmcN4u_zkVgznLMjLCoWv-zQ1joav0M6gWeeeTUz_dSXSqg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-lg bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-container-padding">
          <p className="text-center font-label-xs text-label-xs text-secondary uppercase tracking-widest mb-lg">
            Được tin dùng bởi hơn 500+ doanh nghiệp logistics
          </p>
          <div className="flex flex-wrap justify-center gap-xl grayscale opacity-60">
            <div className="font-h3 text-secondary italic font-bold">
              LOGISTIC.CO
            </div>
            <div className="font-h3 text-secondary italic font-bold">
              SUPPLY CHAIN
            </div>
            <div className="font-h3 text-secondary italic font-bold">
              FASTSHIP
            </div>
            <div className="font-h3 text-secondary italic font-bold">
              GLOBAL-WARE
            </div>
            <div className="font-h3 text-secondary italic font-bold">
              SMARTFLOW
            </div>
          </div>
        </div>
      </section>

      <section className="py-xl px-container-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-xl">
            <h2 className="font-h2 text-h2 text-primary">
              Giải pháp toàn diện cho mọi quy mô kho
            </h2>
            <p className="font-body-md text-body-md text-secondary mt-sm">
              Mọi công cụ bạn cần để chuyển đổi số kho hàng trong tầm tay.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
            <div className="p-lg bg-white cursor-pointer rounded-2xl shadow-[0_10px_30px_-5px_rgba(30,58,138,0.05)] hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl  bg-primary-fixed flex items-center justify-center mb-md">
                <span
                  className="material-symbols-outlined text-primary"
                  data-icon="update"
                >
                  update
                </span>
              </div>
              <h3 className="font-h3 text-h3 text-primary mb-sm">
                Dữ liệu thời gian thực
              </h3>
              <p className="font-body-md text-body-md text-secondary leading-relaxed">
                Cập nhật tồn kho ngay lập tức tại mọi điểm chạm trong quy trình
                vận hành.
              </p>
            </div>

            <div className="p-lg bg-white cursor-pointer rounded-2xl shadow-[0_10px_30px_-5px_rgba(30,58,138,0.05)] hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center mb-md">
                <span
                  className="material-symbols-outlined text-tertiary"
                  data-icon="auto_settings"
                >
                  auto_mode
                </span>
              </div>
              <h3 className="font-h3 text-h3 text-primary mb-sm">
                Tự động hóa quy trình
              </h3>
              <p className="font-body-md text-body-md text-secondary leading-relaxed">
                Giảm bớt các thao tác thủ công, từ khâu nhập hàng đến đóng gói
                và xuất kho.
              </p>
            </div>

            <div className="p-lg bg-white cursor-pointer rounded-2xl shadow-[0_10px_30px_-5px_rgba(30,58,138,0.05)] hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center mb-md">
                <span
                  className="material-symbols-outlined text-on-secondary-container"
                  data-icon="analytics"
                >
                  analytics
                </span>
              </div>
              <h3 className="font-h3 text-h3 text-primary mb-sm">
                Báo cáo thông minh
              </h3>
              <p className="font-body-md text-body-md text-secondary leading-relaxed">
                Phân tích chuyên sâu về hiệu suất kho và dự báo nhu cầu hàng hóa
                chính xác.
              </p>
            </div>

            <div className="p-lg bg-white cursor-pointer rounded-2xl shadow-[0_10px_30px_-5px_rgba(30,58,138,0.05)] hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-error-container flex items-center justify-center mb-md">
                <span
                  className="material-symbols-outlined text-error"
                  data-icon="touch_app"
                >
                  touch_app
                </span>
              </div>
              <h3 className="font-h3 text-h3 text-primary mb-sm">
                Dễ dàng sử dụng
              </h3>
              <p className="font-body-md text-body-md text-secondary leading-relaxed">
                Giao diện trực quan, nhân viên kho chỉ mất 15 phút để làm quen
                hệ thống.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-xl px-container-padding bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-md h-auto lg:h-[600px]">
            <div className="lg:col-span-8 bg-white rounded-2xl p-lg overflow-hidden flex flex-col shadow-[0_10px_30px_-5px_rgba(30,58,138,0.05)]">
              <div className="mb-md">
                <h4 className="font-h3 text-h3 text-primary">
                  Dashboard Tổng Quan
                </h4>
                <p className="text-secondary font-body-md">
                  Theo dõi mọi chỉ số KPI quan trọng trong một màn hình duy
                  nhất.
                </p>
              </div>
              <div className="flex-grow bg-background rounded-xl p-md border border-surface-container overflow-hidden">
                <img
                  alt="Analytics Dashboard"
                  className="w-full h-full object-cover rounded-lg shadow-sm"
                  data-alt="A high-tech digital dashboard displaying vibrant bar charts, pie graphs, and real-time data feeds. The color palette is composed of primary navy blue, soft teal, and light grays. The design is modern and airy with ample whitespace and rounded corners on all UI cards, set in a bright contemporary office setting with soft, warm overhead lighting."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2I5vEF-pP8gs1dS4xsPAT3JUxh69ZMuJPsWJz3UBPs1SeQZ0a6yJYk73OTvM4DDMOwb2WJ2uLbvhzs_KXQIYBpuXhKfGCuC1jANUztXnyanHCDQe7tVzcatpYk1crrmoRaqf963545wO7hwzi9hi1lY-T4SgTTb_mwoTNNelrcAzDb-XMxzjdUxLclvoLYrmKedYL0px_9UrhFXSuORkTUTpJil-nkzfG3XnZeRfOvZHS4KSCFft4u4dfqmxr1g30_vqyuY0S7sk"
                />
              </div>
            </div>

            <div className="lg:col-span-4 cursor-pointer flex flex-col gap-md">
              <div className="bg-primary text-on-primary rounded-2xl p-lg flex-1 shadow-lg relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="font-h3 text-h3 mb-sm">Quản Lý Tồn Kho</h4>
                  <p className="font-label-sm opacity-80 mb-md">
                    Kiểm soát SKU thông minh với mã QR và Barcode.
                  </p>
                  <span
                    className="material-symbols-outlined text-[64px] absolute -bottom-4 -right-4 opacity-20 group-hover:scale-110 transition-transform"
                    data-icon="inventory_2"
                  >
                    inventory_2
                  </span>
                </div>
              </div>
              <div className="bg-secondary-container text-primary cursor-pointer rounded-2xl p-lg flex-1 shadow-sm relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="font-h3 text-h3 mb-sm">Bản Đồ Kho</h4>
                  <p className="font-label-sm text-secondary mb-md">
                    Trực quan hóa vị trí hàng hóa trong không gian 3D.
                  </p>
                  <span
                    className="material-symbols-outlined text-[64px] absolute -bottom-4 -right-4 opacity-20 group-hover:scale-110 transition-transform"
                    data-icon="map"
                  >
                    map
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-xl px-container-padding relative overflow-hidden">
        <div className="max-w-4xl mx-auto bg-primary rounded-2xl p-lg md:p-xl text-center relative z-10 shadow-2xl">
          <h2 className="font-h2 text-h1 text-white mb-md">
            Sẵn sàng tối ưu hóa kho hàng của bạn?
          </h2>
          <p className="font-body-lg text-body-lg text-primary-fixed opacity-90 mb-lg">
            Tham gia cùng hàng trăm doanh nghiệp đã thành công với LogiFlow WMS.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-md">
            <button className="h-14 px-xl cursor-pointer bg-white text-primary rounded-xl font-h3 text-h3 shadow-lg hover:bg-slate-200 transition-all">
              Đăng ký ngay
            </button>
            <button className="h-14 px-xl cursor-pointer border border-primary-fixed-dim text-white rounded-xl font-h3 text-h3 hover:bg-white/10 transition-all">
              Liên hệ tư vấn
            </button>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary-container opacity-20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary-container opacity-30 blur-[120px] rounded-full"></div>
      </section>
    </>
  );
};

export default HeroSection;
