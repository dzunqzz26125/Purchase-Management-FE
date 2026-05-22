const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { class: string; label: string }> = {
    ok: {
      class: "bg-tertiary-fixed text-tertiary",
      label: "Còn hàng",
    },
    low: {
      class: "bg-error-container text-on-error-container",
      label: "Sắp hết",
    },
    pending: {
      class: "bg-secondary-fixed text-on-secondary-fixed-variant",
      label: "Hết hàng",
    },
  };

  const config = map[status] || map.ok;

  return (
    <span className={`px-sm py-1 rounded-full font-label-xs text-label-xs ${config.class}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
