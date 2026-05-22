import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Provider, ProviderFormValues } from "../../types/provider";
import { providerToFormValues } from "../../utils/providerHelpers";

type ProviderFormModalProps = {
  open: boolean;
  mode: "create" | "edit";
  provider?: Provider | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (values: ProviderFormValues) => Promise<void>;
};

const defaultValues: ProviderFormValues = {
  name: "",
  phone: "",
  email: "",
  address: "",
  note: "",
  debt: "0",
};

const fieldClass =
  "w-full px-md py-sm bg-surface-container-low border border-surface-container rounded-xl text-body-md outline-none focus:ring-2 focus:ring-primary/20";

const labelClass = "text-label-sm text-on-surface font-medium";

export default function ProviderFormModal({
  open,
  mode,
  provider,
  loading = false,
  onClose,
  onSubmit,
}: ProviderFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProviderFormValues>({ defaultValues });

  useEffect(() => {
    if (!open) return;
    if (mode === "edit" && provider) {
      reset(providerToFormValues(provider));
    } else {
      reset(defaultValues);
    }
  }, [open, mode, provider, reset]);

  if (!open) return null;

  const submit = handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-md">
      <button
        type="button"
        className="absolute inset-0 bg-on-surface/40"
        onClick={onClose}
        aria-label="Đóng"
      />
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface-container-lowest rounded-3xl shadow-xl border border-surface-container">
        <div className="sticky top-0 bg-surface-container-lowest border-b border-surface-container px-md py-md flex items-center justify-between">
          <h2 className="text-h3 font-semibold">
            {mode === "create"
              ? "Thêm nhà cung cấp mới"
              : "Chỉnh sửa nhà cung cấp"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-xs text-secondary hover:text-primary rounded-lg"
          >
            <span className="material-symbols-outlined cursor-pointer">
              close
            </span>
          </button>
        </div>

        <form onSubmit={submit} className="p-md space-y-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="space-y-xs md:col-span-2">
              <label className={labelClass}>Tên nhà cung cấp *</label>
              <input
                className={fieldClass}
                placeholder="Công ty ABC..."
                {...register("name", {
                  required: "Vui lòng nhập tên nhà cung cấp",
                  minLength: { value: 2, message: "Tối thiểu 2 ký tự" },
                })}
              />
              {errors.name && (
                <p className="text-error text-label-xs">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-xs">
              <label className={labelClass}>Số điện thoại</label>
              <input
                className={fieldClass}
                placeholder="0901234567"
                {...register("phone", {
                  pattern: {
                    value: /^[0-9]{9,12}$/,
                    message: "SĐT gồm 9–12 chữ số",
                  },
                })}
              />
              {errors.phone && (
                <p className="text-error text-label-xs">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-xs">
              <label className={labelClass}>Email</label>
              <input
                type="email"
                className={fieldClass}
                placeholder="contact@supplier.vn"
                {...register("email", {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email không hợp lệ",
                  },
                })}
              />
              {errors.email && (
                <p className="text-error text-label-xs">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-xs">
              <label className={labelClass}>Công nợ</label>
              <input
                type="number"
                className={fieldClass}
                placeholder="0"
                {...register("debt", {
                  min: { value: 0, message: "Số tiền không hợp lệ" },
                })}
              />
              {errors.debt && (
                <p className="text-error text-label-xs">
                  {errors.debt.message}
                </p>
              )}
            </div>

            <div className="space-y-xs md:col-span-2">
              <label className={labelClass}>Địa chỉ</label>
              <input
                className={fieldClass}
                placeholder="Số nhà, quận, thành phố..."
                {...register("address")}
              />
            </div>

            <div className="space-y-xs md:col-span-2">
              <label className={labelClass}>Ghi chú</label>
              <textarea
                rows={3}
                className={`${fieldClass} resize-none`}
                placeholder="Thông tin thêm về NCC..."
                {...register("note")}
              />
            </div>
          </div>

          <div className="flex justify-end gap-sm pt-sm border-t border-surface-container">
            <button
              type="button"
              onClick={onClose}
              className="px-md py-sm cursor-pointer rounded-xl border border-surface-container text-secondary hover:bg-surface-container transition-all"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-md py-sm cursor-pointer bg-primary text-on-primary rounded-xl font-label-sm disabled:opacity-60 flex items-center gap-xs"
            >
              {loading && (
                <span className="material-symbols-outlined animate-spin text-[18px]">
                  progress_activity
                </span>
              )}
              {mode === "create" ? "Thêm nhà cung cấp" : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
