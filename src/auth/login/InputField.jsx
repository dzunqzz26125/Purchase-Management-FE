export default function InputField({ label, icon, type = "text", ...props }) {
  return (
    <div className="space-y-xs">
      <label className="text-label-sm text-on-surface">{label}</label>

      <div className="relative group">
        <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary">
          {icon}
        </span>

        <input
          type={type}
          className="w-full pl-13 pr-md py-3.5 bg-surface-container-low rounded-xl"
          {...props}
        />
      </div>
    </div>
  );
}
