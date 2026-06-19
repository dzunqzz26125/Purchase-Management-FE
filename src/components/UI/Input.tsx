import { useState, useEffect, useRef } from "react";
import { formatVnd, parseVndTyping } from "../../utils/formatVnd";

type InputProps = {
  icon?: string;
  type?: string;
  placeholder?: string;
  id?: string;
  value?: string | number;
  onChange?: (e: { target: { name?: string; value: string | number } }) => void;
  name?: string;
  isCurrency?: boolean;
};

const Input = ({
  icon,
  placeholder,
  id,
  value,
  onChange,
  name,
  isCurrency = false,
}: InputProps) => {
  const [displayValue, setDisplayValue] = useState("");
  const focusedRef = useRef(false);

  useEffect(() => {
    if (focusedRef.current && isCurrency) return;
    if (isCurrency) {
      const num = typeof value === "number" ? value : parseVndTyping(String(value ?? "")).number;
      setDisplayValue(num > 0 ? parseVndTyping(String(num)).display : "");
    } else {
      setDisplayValue(value != null ? String(value) : "");
    }
  }, [value, isCurrency]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isCurrency) {
      onChange?.(e);
      return;
    }

    const { number, display } = parseVndTyping(e.target.value);
    setDisplayValue(display);
    onChange?.({
      target: { name, value: number },
    });

    requestAnimationFrame(() => {
      const el = e.target;
      const end = display.length;
      el.setSelectionRange(end, end);
    });
  };

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
          type="text"
          inputMode={isCurrency ? "numeric" : undefined}
          value={displayValue}
          onFocus={() => {
            if (isCurrency) focusedRef.current = true;
          }}
          onBlur={() => {
            if (isCurrency) focusedRef.current = false;
          }}
          onChange={handleChange}
          placeholder={placeholder}
          className={`
            w-full h-[52px]
            ${icon ? "pl-12" : "pl-4"}
            pr-4
            bg-surface-container-low
            rounded-xl
            outline-none
            focus:ring-2 focus:ring-primary-contain
            transition-all
            focus:bg-surface-container
            text-on-surface
            placeholder:text-outline/60
            ${isCurrency ? "text-right" : ""}
          `}
        />
        {isCurrency && displayValue && (
          <span className="sr-only">{formatVnd(parseVndTyping(displayValue).number)}</span>
        )}
      </div>
    </div>
  );
};

export default Input;
