import { useState } from "react";

export default function PasswordField(props) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-xs">
      <label className="text-label-sm">Mật khẩu</label>

      <div className="relative group">
        <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2">
          lock
        </span>

        <input
          type={show ? "text" : "password"}
          className="w-full pl-13 pr-13 py-3.5 bg-surface-container-low rounded-xl"
          placeholder="************"
          {...props}
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-md top-1/2 -translate-y-1/2"
        >
          <span className="material-symbols-outlined">
            {show ? "visibility_off" : "visibility"}
          </span>
        </button>
      </div>
    </div>
  );
}
