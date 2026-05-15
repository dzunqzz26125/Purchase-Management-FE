const StockProgress = ({ value }: { value: number }) => {
  let colorClass = "bg-primary";
  let textClass = "text-secondary";

  if (value < 20) {
    colorClass = "bg-error";
    textClass = "text-error";
  } else if (value < 50) {
    colorClass = "bg-secondary";
    textClass = "text-secondary";
  }

  return (
    <div className="flex flex-col gap-xs">
      <div className="flex justify-between text-label-xs font-label-xs">
        <span className="text-on-surface">{value}/100</span>
        <span className={textClass}>{value}%</span>
      </div>

      <div className="w-full bg-surface-container rounded-full h-2">
        <div
          className={`${colorClass} h-full rounded-full`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export default StockProgress;
