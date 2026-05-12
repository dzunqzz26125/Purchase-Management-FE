const Storage = () => {
  const zones = [
    {
      label: "Khu vực A (Đông lạnh)",
      usage: "92%",
      dotClassName: "bg-primary",
    },
    {
      label: "Khu vực B (Hàng khô)",
      usage: "64%",
      dotClassName: "bg-primary-container/60",
    },
    {
      label: "Khu vực C (Quá khổ)",
      usage: "45%",
      dotClassName: "bg-surface-container",
    },
  ];

  return (
    <div className="flex flex-col rounded-3xl bg-white p-md custom-shadow">
      <h4 className="mb-lg font-h3 text-primary">Công suất lưu trữ</h4>
      <div className="relative flex flex-1 flex-col items-center justify-center">
        <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-20 border-surface-container">
          <div className="absolute inset-0 h-full w-full rotate-45 rounded-full border-20 border-primary border-l-transparent border-t-transparent" />
          <div className="text-center">
            <p className="font-h2 text-primary">78%</p>
            <p className="text-label-xs text-secondary">Đã sử dụng</p>
          </div>
        </div>
        <div className="mt-lg w-full space-y-sm">
          {zones.map((zone) => (
            <div
              key={zone.label}
              className="flex items-center justify-between text-label-sm"
            >
              <div className="flex items-center gap-xs">
                <div className={`h-3 w-3 rounded-full ${zone.dotClassName}`} />
                <span className="text-on-surface">{zone.label}</span>
              </div>
              <span className="font-bold text-primary">{zone.usage}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Storage;
