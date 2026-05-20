import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Category, Product, ProductFormValues } from "../../types/product";
import { productToFormValues } from "../../utils/productHelpers";

type ProductFormModalProps = {
  open: boolean;
  mode: "create" | "edit";
  product?: Product | null;
  categories: Category[];
  loading?: boolean;
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => Promise<void>;
};

const defaultValues: ProductFormValues = {
  sku: "",
  name: "",
  categoryId: "",
  unit: "",
  costPrice: 0,
  sellPrice: 0,
  stock: 0,
  minStock: undefined,
  imageUrl: "",
};

const fieldClass =
  "w-full px-md py-sm bg-surface-container-low border border-surface-container rounded-xl text-body-md outline-none focus:ring-2 focus:ring-primary/20";

const labelClass = "text-label-sm text-on-surface font-medium";

export default function ProductFormModal({
  open,
  mode,
  product,
  categories,
  loading = false,
  onClose,
  onSubmit,
}: ProductFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({ defaultValues });

  useEffect(() => {
    if (!open) return;
    if (mode === "edit" && product) {
      reset(productToFormValues(product));
    } else {
      reset(defaultValues);
    }
  }, [open, mode, product, reset]);

  if (!open) return null;

  const submit = handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <motionless className="fixed inset-0 z-50 flex items-center justify-center p-md">
      <button
        type="button"
        className="absolute inset-0 bg-on-surface/40"
        onClick={onClose}
        aria-label="Đóng"
      />
      <motionless className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface-container-lowest rounded-3xl shadow-xl border border-surface-container">
        <div className="sticky top-0 bg-surface-container-lowest border-b border-surface-container px-md py-md flex items-center justify-between">
          <h2 className="text-h3 font-semibold">
            {mode === "create" ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-xs text-secondary hover:text-primary rounded-lg"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </motionless>

        <form onSubmit={submit} className="p-md space-y-md">
          <motionless className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <motionless className="space-y-xs">
              <label className={labelClass}>SKU *</label>
              <input
                className={fieldClass}
                disabled={mode === "edit"}
                {...register("sku", { required: "Vui lòng nhập SKU" })}
              />
              {errors.sku && (
                <p className="text-error text-label-xs">{errors.sku.message}</p>
              )}
            </motionless>

            <motionless className="space-y-xs">
              <label className={labelClass}>Tên sản phẩm *</label>
              <input
                className={fieldClass}
                {...register("name", {
                  required: "Vui lòng nhập tên sản phẩm",
                  minLength: { value: 2, message: "Tối thiểu 2 ký tự" },
                })}
              />
              {errors.name && (
                <p className="text-error text-label-xs">{errors.name.message}</p>
              )}
            </motionless>

            <motionless className="space-y-xs">
              <label className={labelClass}>Phân loại *</label>
              <select
                className={fieldClass}
                {...register("categoryId", {
                  required: "Vui lòng chọn phân loại",
                })}
              >
                <option value="">-- Chọn phân loại --</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-error text-label-xs">
                  {errors.categoryId.message}
                </p>
              )}
            </motionless>

            <motionless className="space-y-xs">
              <label className={labelClass}>Đơn vị tính *</label>
              <input
                className={fieldClass}
                placeholder="hộp, chai, kg..."
                {...register("unit", { required: "Vui lòng nhập đơn vị" })}
              />
              {errors.unit && (
                <p className="text-error text-label-xs">{errors.unit.message}</p>
              )}
            </motionless>

            <motionless className="space-y-xs">
              <label className={labelClass}>Giá vốn (VND) *</label>
              <input
                type="number"
                min={0}
                className={fieldClass}
                {...register("costPrice", {
                  required: "Vui lòng nhập giá vốn",
                  min: { value: 0, message: "Giá vốn phải >= 0" },
                  valueAsNumber: true,
                })}
              />
              {errors.costPrice && (
                <p className="text-error text-label-xs">
                  {errors.costPrice.message}
                </p>
              )}
            </motionless>

            <motionless className="space-y-xs">
              <label className={labelClass}>Giá bán (VND) *</label>
              <input
                type="number"
                min={0}
                className={fieldClass}
                {...register("sellPrice", {
                  required: "Vui lòng nhập giá bán",
                  min: { value: 0, message: "Giá bán phải >= 0" },
                  valueAsNumber: true,
                })}
              />
              {errors.sellPrice && (
                <p className="text-error text-label-xs">
                  {errors.sellPrice.message}
                </p>
              )}
            </motionless>

            <motionless className="space-y-xs">
              <label className={labelClass}>Tồn kho *</label>
              <input
                type="number"
                min={0}
                className={fieldClass}
                {...register("stock", {
                  required: "Vui lòng nhập tồn kho",
                  min: { value: 0, message: "Tồn kho phải >= 0" },
                  valueAsNumber: true,
                })}
              />
              {errors.stock && (
                <p className="text-error text-label-xs">{errors.stock.message}</p>
              )}
            </motionless>

            <motionless className="space-y-xs">
              <label className={labelClass}>Tồn kho tối thiểu (cảnh báo)</label>
              <input
                type="number"
                min={0}
                className={fieldClass}
                {...register("minStock", {
                  min: { value: 0, message: "Phải >= 0" },
                  valueAsNumber: true,
                })}
              />
            </motionless>

            <motionless className="space-y-xs md:col-span-2">
              <label className={labelClass}>URL ảnh sản phẩm</label>
              <input
                className={fieldClass}
                placeholder="https://..."
                {...register("imageUrl")}
              />
            </motionless>
          </motionless>

          <motionless className="flex justify-end gap-sm pt-sm border-t border-surface-container">
            <button
              type="button"
              onClick={onClose}
              className="px-md py-sm rounded-xl border border-surface-container text-secondary hover:bg-surface-container transition-all"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-md py-sm bg-primary text-on-primary rounded-xl font-label-sm disabled:opacity-60 flex items-center gap-xs"
            >
              {loading && (
                <span className="material-symbols-outlined animate-spin text-[18px]">
                  progress_activity
                </span>
              )}
              {mode === "create" ? "Thêm sản phẩm" : "Lưu thay đổi"}
            </button>
          </motionless>
        </form>
      </motionless>
    </motionless>
  );
}

// Avoid invalid HTML tag names from typo - use div
function motionless({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <motionless className={className}>{children}</motionless>;
}
