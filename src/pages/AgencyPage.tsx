import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { agencyApi, type AgencyFormValues } from "../api/agencyApi";
import { getApiErrorMessage } from "../api/getApiErrorMessage";

const fieldClass =
  "w-full px-md py-sm bg-surface-container-low border border-surface-container rounded-xl text-body-md outline-none focus:ring-2 focus:ring-primary/20";

const labelClass = "text-label-sm text-on-surface font-medium";

const AgencyPage = () => {
  const queryClient = useQueryClient();
  const { data: agency, isLoading, isError } = useQuery({
    queryKey: ["agencies", "me"],
    queryFn: agencyApi.getMine,
    retry: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AgencyFormValues>({
    defaultValues: { name: "", phone: "", address: "" },
  });

  const saveMutation = useMutation({
    mutationFn: (values: AgencyFormValues) =>
      agency ? agencyApi.updateMine(values) : agencyApi.create(values),
    onSuccess: (saved) => {
      queryClient.setQueryData(["agencies", "me"], saved);
      reset({
        name: saved.name,
        phone: saved.phone || "",
        address: saved.address || "",
      });
    },
  });

  useEffect(() => {
    if (!agency) return;
    reset({
      name: agency.name,
      phone: agency.phone || "",
      address: agency.address || "",
    });
  }, [agency, reset]);

  const onSubmit = handleSubmit(async (values) => {
    await saveMutation.mutateAsync(values);
  });

  return (
    <div className="max-w-3xl mx-auto space-y-lg">
      <header>
        <h1 className="text-h2 font-bold text-primary">Thông tin đại lý</h1>
        <p className="text-body-md text-secondary mt-xs">
          Mỗi tài khoản có một đại lý riêng. Nhà cung cấp, sản phẩm và đơn hàng
          đều thuộc đại lý của bạn.
        </p>
      </header>

      <form
        onSubmit={onSubmit}
        className="bg-surface-container-lowest rounded-2xl border border-surface-container p-lg space-y-md"
      >
        {saveMutation.isError && (
          <div className="p-sm bg-error-container text-on-error-container rounded-xl text-label-sm">
            {getApiErrorMessage(saveMutation.error, "Không thể lưu thông tin đại lý")}
          </div>
        )}

        {saveMutation.isSuccess && (
          <div className="p-sm bg-primary-container text-on-primary-container rounded-xl text-label-sm">
            Đã lưu thông tin đại lý thành công.
          </div>
        )}

        <div className="space-y-xs">
          <label className={labelClass} htmlFor="agency-name">
            Tên đại lý *
          </label>
          <input
            id="agency-name"
            className={fieldClass}
            placeholder="VD: Công ty TNHH ABC"
            {...register("name", { required: "Vui lòng nhập tên đại lý" })}
          />
          {errors.name && (
            <span className="text-error text-label-xs">{errors.name.message}</span>
          )}
        </div>

        <div className="space-y-xs">
          <label className={labelClass} htmlFor="agency-phone">
            Số điện thoại
          </label>
          <input
            id="agency-phone"
            className={fieldClass}
            placeholder="0901234567"
            {...register("phone")}
          />
        </div>

        <div className="space-y-xs">
          <label className={labelClass} htmlFor="agency-address">
            Địa chỉ
          </label>
          <textarea
            id="agency-address"
            rows={3}
            className={fieldClass}
            placeholder="Số nhà, đường, quận/huyện, tỉnh/thành"
            {...register("address")}
          />
        </div>

        <button
          type="submit"
          disabled={saveMutation.isPending || isLoading}
          className="h-12 px-lg bg-primary text-on-primary rounded-xl font-semibold disabled:opacity-60"
        >
          {saveMutation.isPending
            ? "Đang lưu..."
            : isError || !agency
              ? "Tạo đại lý"
              : "Cập nhật đại lý"}
        </button>
      </form>
    </div>
  );
};

export default AgencyPage;
