const FeaturePreview = () => {
  return (
    <section className="py-20 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-12 gap-6 h-auto lg:h-[500px]">
          {/* main dashboard */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 shadow">
            <h3 className="text-xl font-bold text-primary mb-2">
              Dashboard Tổng Quan
            </h3>

            <p className="text-secondary mb-4">
              Theo dõi KPI kho theo thời gian thực
            </p>

            <div className="h-full rounded-xl overflow-hidden bg-surface-container">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2I5vEF-pP8gs1dS4xsPAT3JUxh69ZMuJPsWJz3UBPs1SeQZ0a6yJYk73OTvM4DDMOwb2WJ2uLbvhzs_KXQIYBpuXhKfGCuC1jANUztXnyanHCDQe7tVzcatpYk1crrmoRaqf963545wO7hwzi9hi1lY-T4SgTTb_mwoTNNelrcAzDb-XMxzjdUxLclvoLYrmKedYL0px_9UrhFXSuORkTUTpJil-nkzfG3XnZeRfOvZHS4KSCFft4u4dfqmxr1g30_vqyuY0S7sk"
                alt="dashboard"
              />
            </div>
          </div>

          {/* side cards */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-primary text-on-primary rounded-2xl p-6 flex-1 relative overflow-hidden">
              <h4 className="text-lg font-bold mb-2">Quản lý tồn kho</h4>
              <p className="text-sm opacity-80">SKU tracking thông minh</p>

              <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-[80px] opacity-20">
                inventory_2
              </span>
            </div>

            <div className="bg-secondary-container text-primary rounded-2xl p-6 flex-1 relative overflow-hidden">
              <h4 className="text-lg font-bold mb-2">Bản đồ kho</h4>
              <p className="text-sm text-secondary">
                Trực quan hóa vị trí hàng hóa
              </p>

              <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-[80px] opacity-20">
                map
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturePreview;
