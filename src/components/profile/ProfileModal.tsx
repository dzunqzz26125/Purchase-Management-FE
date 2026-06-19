import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { agencyApi, type AgencyFormValues } from "../../api/agencyApi";
import { getApiErrorMessage } from "../../api/getApiErrorMessage";
import type { UserProfile, UpdateProfileInput } from "../../hooks/useAuth";

type ProfileModalProps = {
  open: boolean;
  user: UserProfile | null;
  isUpdating: boolean;
  onClose: () => void;
  onSaveProfile: (data: UpdateProfileInput) => Promise<void>;
};

const fieldClass =
  "w-full px-md py-sm bg-surface-container-low border border-surface-container rounded-xl text-body-md outline-none focus:ring-2 focus:ring-primary/20";

const labelClass = "text-label-sm text-on-surface font-medium";

export default function ProfileModal({
  open,
  user,
  isUpdating,
  onClose,
  onSaveProfile,
}: ProfileModalProps) {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { data: agency, isLoading: agencyLoading } = useQuery({
    queryKey: ["agencies", "me"],
    queryFn: agencyApi.getMine,
    enabled: open,
    retry: false,
  });

  const profileForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      password: "",
    },
  });

  const agencyForm = useForm<AgencyFormValues>({
    defaultValues: { name: "", phone: "", address: "" },
  });

  const saveAgencyMutation = useMutation({
    mutationFn: (values: AgencyFormValues) =>
      agency ? agencyApi.updateMine(values) : agencyApi.create(values),
    onSuccess: (saved) => {
      queryClient.setQueryData(["agencies", "me"], saved);
      agencyForm.reset({
        name: saved.name,
        phone: saved.phone || "",
        address: saved.address || "",
      });
    },
  });

  useEffect(() => {
    if (!open || !user) return;
    profileForm.reset({
      name: user.name || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber ? String(user.phoneNumber) : "",
      address: user.address || "",
      password: "",
    });
    setErrorMessage("");
    setSuccessMessage("");
  }, [open, user, profileForm]);

  useEffect(() => {
    if (!open || !agency) return;
    agencyForm.reset({
      name: agency.name,
      phone: agency.phone || "",
      address: agency.address || "",
    });
  }, [open, agency, agencyForm]);

  if (!open) return null;

  const onSubmitProfile = profileForm.handleSubmit(async (data) => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const payload: UpdateProfileInput = {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        address: data.address.trim(),
      };
      if (data.phoneNumber) payload.phoneNumber = Number(data.phoneNumber);
      if (data.password) payload.password = data.password;
      await onSaveProfile(payload);
      setSuccessMessage("Cập nhật hồ sơ thành công!");
    } catch (err: unknown) {
      setErrorMessage(
        getApiErrorMessage(err, "Cập nhật thất bại. Vui lòng thử lại."),
      );
    }
  });

  const onSubmitAgency = agencyForm.handleSubmit(async (values) => {
    await saveAgencyMutation.mutateAsync(values);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-md">
      <div
        className="absolute inset-0 bg-on-surface/40"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 flex w-full max-h-[90vh] flex-col rounded-3xl border border-surface-container bg-surface-container-lowest shadow-xl">
        <div className="shrink-0 border-b border-surface-container px-md py-md flex items-center justify-between">
          <h2 className="text-h3 font-semibold text-primary">Hồ sơ & Đại lý</h2>
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

        <div className="flex-1 overflow-y-auto p-md space-y-lg min-h-0">
          {errorMessage && (
            <div className="p-sm bg-error-container text-on-error-container rounded-xl text-label-sm">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="p-sm bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-label-sm">
              {successMessage}
            </div>
          )}

          <section className="space-y-md">
            <h3 className="text-label-md font-semibold text-primary border-b border-surface-container pb-xs">
              Thông tin tài khoản
            </h3>
            <form onSubmit={onSubmitProfile} className="space-y-md">
              <div className="space-y-xs">
                <label className={labelClass}>Họ và tên *</label>
                <input
                  className={fieldClass}
                  {...profileForm.register("name", { required: true })}
                />
              </div>
              <div className="space-y-xs">
                <label className={labelClass}>Email *</label>
                <input
                  type="email"
                  className={fieldClass}
                  {...profileForm.register("email", { required: true })}
                />
              </div>
              <div className="space-y-xs">
                <label className={labelClass}>Số điện thoại</label>
                <input
                  className={fieldClass}
                  placeholder="090..."
                  {...profileForm.register("phoneNumber")}
                />
              </div>
              <div className="space-y-xs">
                <label className={labelClass}>Địa chỉ</label>
                <input
                  className={fieldClass}
                  {...profileForm.register("address")}
                />
              </div>
              <div className="space-y-xs">
                <label className={labelClass}>
                  Mật khẩu mới (để trống nếu không đổi)
                </label>
                <input
                  type="password"
                  className={fieldClass}
                  placeholder="••••••••"
                  {...profileForm.register("password", { minLength: 6 })}
                />
              </div>
              <button
                type="submit"
                disabled={isUpdating}
                className="w-full py-sm bg-primary text-on-primary rounded-xl font-semibold disabled:opacity-60"
              >
                {isUpdating ? "Đang lưu..." : "Lưu hồ sơ"}
              </button>
            </form>
          </section>

          <section className="space-y-md">
            <h3 className="text-label-md font-semibold text-primary border-b border-surface-container pb-xs">
              Thông tin đại lý
            </h3>
            <p className="text-label-xs text-secondary">
              Nhà cung cấp, sản phẩm và đơn hàng đều thuộc đại lý của bạn.
            </p>
            <form onSubmit={onSubmitAgency} className="space-y-md">
              <div className="space-y-xs">
                <label className={labelClass}>Tên đại lý *</label>
                <input
                  className={fieldClass}
                  placeholder="VD: Công ty TNHH ABC"
                  {...agencyForm.register("name", { required: true })}
                />
              </div>
              <div className="space-y-xs">
                <label className={labelClass}>Số điện thoại đại lý</label>
                <input
                  className={fieldClass}
                  {...agencyForm.register("phone")}
                />
              </div>
              <div className="space-y-xs">
                <label className={labelClass}>Địa chỉ đại lý</label>
                <textarea
                  rows={2}
                  className={`${fieldClass} resize-none`}
                  {...agencyForm.register("address")}
                />
              </div>
              <button
                type="submit"
                disabled={saveAgencyMutation.isPending || agencyLoading}
                className="w-full py-sm bg-secondary text-on-secondary rounded-xl font-semibold disabled:opacity-60"
              >
                {saveAgencyMutation.isPending
                  ? "Đang lưu..."
                  : agency
                    ? "Cập nhật đại lý"
                    : "Tạo đại lý"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
