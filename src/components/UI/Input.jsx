const Input = ({
  icon,
  type = "text",
  placeholder,
  id,
  value,
  onChange,
  name,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {id && (
        <label
          htmlFor={id}
          className="text-sm text-on-surface-variant font-medium"
        >
          {placeholder}
        </label>
      )}

      <div className="relative group">
        {icon && (
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
            {icon}
          </span>
        )}

        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full h-[52px]
            ${icon ? "pl-12" : "pl-4"}
            pr-4
            bg-surface-container-low
            rounded-xl
            outline-none
            focus:ring-2 focus:ring-primary-container
            focus:bg-surface-container
            transition-all
            text-on-surface
            placeholder:text-outline/60
          `}
        />
      </div>
    </div>
  );
};

export default Input;
