import { useEffect, useRef, useState } from "react";
import { formatVndInput, parseVndTyping } from "../../utils/formatVnd";

type VndInputProps = {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
};

const defaultClass =
  "w-full rounded-xl border border-outline-variant px-sm py-xs bg-white text-right";

/**
 * Input tiền VND: chỉ nhận số, format dấu chấm ngàn khi gõ.
 * Con trỏ luôn ở cuối — tránh nhảy số khi gõ giữa chuỗi (vd. 30.000.000 → 333.300.000).
 */
export default function VndInput({
  value,
  onChange,
  placeholder = "0",
  className = defaultClass,
  id,
  required,
  disabled,
}: VndInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const focusedRef = useRef(false);
  const [display, setDisplay] = useState(() =>
    value > 0 ? formatVndInput(value) : "",
  );

  useEffect(() => {
    if (focusedRef.current) return;
    setDisplay(value > 0 ? formatVndInput(value) : "");
  }, [value]);

  const handleFocus = () => {
    focusedRef.current = true;
  };

  const handleBlur = () => {
    focusedRef.current = false;
    setDisplay(value > 0 ? formatVndInput(value) : "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { number, display: nextDisplay } = parseVndTyping(e.target.value);
    setDisplay(nextDisplay);
    onChange(number);

    requestAnimationFrame(() => {
      const el = inputRef.current;
      if (!el) return;
      const end = nextDisplay.length;
      el.setSelectionRange(end, end);
    });
  };

  return (
    <input
      ref={inputRef}
      id={id}
      type="text"
      inputMode="numeric"
      autoComplete="off"
      disabled={disabled}
      required={required}
      placeholder={placeholder}
      className={className}
      value={display}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
}
