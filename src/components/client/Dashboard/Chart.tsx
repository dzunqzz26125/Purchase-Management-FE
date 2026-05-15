const StockChart = () => {
  const bars = [
    { outer: 40, inner: 60, day: "Thứ 2" },
    { outer: 60, inner: 75, day: "Thứ 3" },
    { outer: 55, inner: 45, day: "Thứ 4" },
    { outer: 80, inner: 90, day: "Thứ 5" },
    { outer: 70, inner: 65, day: "Thứ 6" },
    { outer: 95, inner: 85, day: "Thứ 7" },
    { outer: 65, inner: 70, day: "CN" },
  ];

  return (
    <div className="min-h-100 rounded-3xl bg-white p-xl custom-shadow">
      <div className="mb-lg flex items-center justify-between">
        <h4 className="font-h3 text-primary">Dòng chảy tồn kho</h4>
        <select className="rounded-lg border-none bg-surface-container-low px-sm py-xs text-label-sm text-secondary focus:ring-primary-container">
          <option>7 ngày qua</option>
          <option>30 ngày qua</option>
        </select>
      </div>

      <div className="relative flex h-64 w-full items-end gap-xs px-md">
        {bars.map((bar, index) => (
          <div
            key={index}
            className="group relative flex-1 rounded-t-full bg-primary-container/10"
            style={{ height: `${bar.outer}%` }}
          >
            <div
              className="absolute inset-x-0 bottom-0 rounded-t-full bg-primary-container transition-all group-hover:opacity-80"
              style={{ height: `${bar.inner}%` }}
            />
          </div>
        ))}
      </div>

      <div className="mt-sm flex justify-between px-md text-label-xs text-secondary">
        {bars.map((bar) => (
          <span key={bar.day}>{bar.day}</span>
        ))}
      </div>
    </div>
  );
};

export default StockChart;
