const StatCard = () => {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-md mb-xl mt-md">
        <div className="bg-primary-container p-md rounded-3xl text-on-primary shadow-lg flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <span
              className="material-symbols-outlined p-xs bg-white/10 rounded-xl"
              data-icon="inventory_2"
            >
              inventory_2
            </span>
            <span className="text-label-xs font-label-xs text-white/70">
              +12% tháng này
            </span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-white/80">
              Tổng giá trị tồn kho
            </p>
            <h4 className="font-h3 text-h3 font-bold">4.2 tỷ VND</h4>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-3xl shadow-[0_10px_30px_-5px_rgba(30,58,138,0.05)] border border-surface-container/20 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <span
              className="material-symbols-outlined p-xs bg-error-container/20 text-error rounded-xl"
              data-icon="warning"
            >
              warning
            </span>
            <span className="text-label-xs font-label-xs text-error font-semibold">
              Cần chú ý
            </span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-secondary">
              Sản phẩm sắp hết hàng
            </p>
            <h4 className="font-h3 text-h3 font-bold text-on-surface">
              18 sản phẩm
            </h4>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-3xl shadow-[0_10px_30px_-5px_rgba(30,58,138,0.05)] border border-surface-container/20 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <span
              className="material-symbols-outlined p-xs bg-secondary-container/30 text-primary rounded-xl"
              data-icon="trending_up"
            >
              trending_up
            </span>
            <span className="text-label-xs font-label-xs text-primary font-semibold">
              Tốc độ xuất kho
            </span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-secondary">
              Vòng quay hàng tồn
            </p>
            <h4 className="font-h3 text-h3 font-bold text-on-surface">
              4.5 lần/năm
            </h4>
          </div>
        </div>
      </section>
    </>
  );
};

export default StatCard;
