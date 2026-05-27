import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { categoryApi } from "../../api/categoryApi";
import { providerApi } from "../../api/providerApi";
import type { Category } from "../../types/product";

type CategoryManagerModalProps = {
  open: boolean;
  onClose: () => void;
  categories: Category[];
};

export default function CategoryManagerModal({
  open,
  onClose,
  categories,
}: CategoryManagerModalProps) {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [providerId, setProviderId] = useState("");

  const { data: providers = [] } = useQuery({
    queryKey: ["providers", "list"],
    queryFn: providerApi.list,
    enabled: open,
  });

  const createMutation = useMutation({
    mutationFn: categoryApi.create,
    onSuccess: (newCategory) => {
      queryClient.setQueryData<Category[]>(
        ["categories", "list"],
        (old = []) => [...old, newCategory],
      );
      setName("");
      setDescription("");
      setProviderId("");
    },
    onError: (err: any) => {
      alert(
        "Lỗi khi tạo phân loại: " +
          (err?.response?.data?.message || err.message),
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: categoryApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err: any) => {
      alert(
        "Lỗi khi xóa loại sản phẩm: " +
          (err?.response?.data?.message || err.message),
      );
    },
  });

  if (!open) return null;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !providerId) {
      alert("Vui lòng nhập tên loại sản phẩm và chọn Nhà cung cấp!");
      return;
    }
    await createMutation.mutateAsync({
      name: name.trim(),
      description: description.trim(),
      providerId,
    });
  };

  const handleDelete = async (id: string, catName: string) => {
    if (window.confirm(`Bạn có chắc muốn xóa loại sản phẩm "${catName}"?`)) {
      await deleteMutation.mutateAsync(id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-md">
      <button
        type="button"
        className="absolute inset-0 bg-on-surface/40"
        onClick={onClose}
        aria-label="Đóng"
      />
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-surface-container-lowest rounded-3xl shadow-xl border border-surface-container flex flex-col md:flex-row">
        {/* Form thêm mới bên trái */}
        <div className="p-md md:w-5/12 border-b md:border-b-0 md:border-r border-surface-container">
          <h3 className="text-h3 font-semibold text-primary mb-md">
            Thêm Loại Sản Phẩm
          </h3>
          <form onSubmit={handleCreate} className="space-y-sm">
            <div className="space-y-xs">
              <label className="text-label-sm font-medium text-on-surface">
                Tên loại sản phẩm *
              </label>
              <input
                type="text"
                className="w-full px-md py-sm bg-surface-container-low border border-surface-container rounded-xl text-body-md outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Ví dụ: Thiết bị điện tử"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-xs">
              <label className="text-label-sm font-medium text-on-surface">
                Nhà cung cấp *
              </label>
              <select
                className="w-full px-md py-sm bg-surface-container-low border border-surface-container rounded-xl text-body-md outline-none focus:ring-2 focus:ring-primary/20"
                value={providerId}
                onChange={(e) => setProviderId(e.target.value)}
                required
              >
                <option value="">-- Chọn Nhà cung cấp --</option>
                {providers.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-xs">
              <label className="text-label-sm font-medium text-on-surface">
                Mô tả
              </label>
              <textarea
                rows={3}
                className="w-full px-md py-sm bg-surface-container-low border border-surface-container rounded-xl text-body-md outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                placeholder="Mô tả ngắn..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={createMutation.isPending}
              className="w-full py-sm bg-primary hover:bg-primary/95 text-on-primary font-semibold rounded-xl active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-xs"
            >
              {createMutation.isPending && (
                <span className="material-symbols-outlined animate-spin text-[18px]">
                  progress_activity
                </span>
              )}
              Tạo mới
            </button>
          </form>
        </div>

        {/* Danh sách phân loại bên phải */}
        <div className="p-md md:w-7/12 flex flex-col min-h-75">
          <div className="flex justify-between items-center mb-md">
            <h3 className="text-h3 font-semibold text-primary">
              Danh sách loại sản phẩm
            </h3>
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

          <div className="flex-1 overflow-y-auto max-h-87.5 pr-xs custom-scrollbar">
            {categories.length === 0 ? (
              <p className="text-secondary text-center py-lg">
                Chưa có phân loại nào
              </p>
            ) : (
              <div className="space-y-xs">
                {categories.map((cat) => {
                  console.log(
                    "cat._id:",
                    cat._id,
                    "| providerId:",
                    cat.providerId,
                    "| type:",
                    typeof cat.providerId,
                  );
                  const pName =
                    typeof cat.providerId === "object" && cat.providerId
                      ? cat.providerId.name
                      : "Không xác định";

                  return (
                    <div
                      key={cat._id}
                      className="p-sm bg-surface-container-low hover:bg-surface-container transition-colors border border-surface-container rounded-2xl flex items-center justify-between gap-sm"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-primary truncate text-label-sm">
                          {cat.name}
                        </p>
                        <p className="text-label-xs text-secondary truncate">
                          NCC: {pName}
                        </p>
                        {cat.description && (
                          <p className="text-label-xs text-secondary italic truncate mt-0.5">
                            {cat.description}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDelete(cat._id, cat.name)}
                        disabled={deleteMutation.isPending}
                        className="p-xs text-secondary hover:text-error transition-colors rounded-xl shrink-0"
                        title="Xóa"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          delete
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
