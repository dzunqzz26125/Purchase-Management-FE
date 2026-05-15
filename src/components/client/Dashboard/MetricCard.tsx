const MetricCard = ({
  title,
  value,
  icon,
  badge,
  badgeClassName = "text-secondary bg-surface-container",
  iconWrapperClassName = "bg-primary-fixed",
  iconClassName = "text-primary",
  cardClassName = "",
}) => {
  return (
    <div
      className={`bg-white p-md rounded-3xl custom-shadow flex h-40 flex-col justify-between ${cardClassName}`}
    >
      <div className="flex items-start justify-between">
        <div className={`rounded-xl p-xs ${iconWrapperClassName}`}>
          <span
            className={`material-symbols-outlined ${iconClassName}`}
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {icon}
          </span>
        </div>
        {badge && (
          <span
            className={`rounded-full px-xs py-1 text-label-xs ${badgeClassName}`}
          >
            {badge}
          </span>
        )}
      </div>

      <div>
        <p className="text-label-sm text-secondary">{title}</p>
        <h3 className="text-h2 font-h2 text-primary">{value}</h3>
      </div>
    </div>
  );
};

export default MetricCard;
