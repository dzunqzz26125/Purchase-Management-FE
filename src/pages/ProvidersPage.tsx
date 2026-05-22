import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProviderTable from "../components/client/providers/ProviderTable";
import CustomerTable from "../components/client/customers/CustomerTable";
import ProviderFormModal from "../feat/provider/ProviderFormModal";
import CustomerFormModal from "../feat/customer/CustomerFormModal";
import { paymentApi } from "../api/paymentApi";
import { providerApi } from "../api/providerApi";
import { customerApi } from "../api/customerApi";
import { useCrud } from "../hooks/useCrud";
import { useAppStore } from "../store/useAppStore";
import type { Provider, ProviderFormValues } from "../types/provider";
import type { CustomerFormValues } from "../types/customer";

const ProvidersPage = () => {
  const queryClient = useQueryClient();
  const { providerModal, openProviderModal, closeProviderModal } =
    useAppStore();

  const [partyType, setPartyType] = useState<"provider" | "customer">(
    "provider",
  );
  const [partyId, setPartyId] = useState("");
  const [amount, setAmount] = useState(0);
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [customerModalMode, setCustomerModalMode] = useState<"create" | "edit">(
    "create",
  );
  const [editingCustomerId, setEditingCustomerId] = useState<string | null>(
    null,
  );

  const {
    items: providers,
    isLoading,
    create,
    update,
    remove,
    isCreating,
    isUpdating,
  } = useCrud<Provider, ProviderFormValues, ProviderFormValues>("providers", {
    list: providerApi.list,
    create: providerApi.create,
    update: async (id, values) => providerApi.update(id, values),
    remove: providerApi.remove,
  });

  const {
    data: customers = [],
    isLoading: customersLoading,
    refetch: refetchCustomers,
  } = useQuery({
    queryKey: ["customers", "list"],
    queryFn: customerApi.list,
  });

  const createCustomerMutation = useMutation({
    mutationFn: customerApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      setCustomerModalOpen(false);
    },
  });

  const updateCustomerMutation = useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: CustomerFormValues;
    }) => customerApi.update(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      setCustomerModalOpen(false);
    },
  });

  const deleteCustomerMutation = useMutation({
    mutationFn: customerApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  const payMutation = useMutation({
    mutationFn: paymentApi.settleDebt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      setAmount(0);
    },
  });

  const editingProvider = useMemo(
    () => providers.find((p) => p._id === providerModal.resourceId) ?? null,
    [providers, providerModal.resourceId],
  );

  const editingCustomer = useMemo(
    () => customers.find((c) => c._id === editingCustomerId) ?? null,
    [customers, editingCustomerId],
  );

  const handleFormSubmit = async (values: ProviderFormValues) => {
    if (providerModal.mode === "create") {
      await create(values);
    } else if (editingProvider) {
      await update({ id: editingProvider._id, data: values });
    }
    closeProviderModal();
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa nhà cung cấp này?");
    if (!confirmed) return;
    await remove(id);
  };

  const openCustomerModal = (mode: "create" | "edit", id?: string) => {
    setCustomerModalMode(mode);
    setEditingCustomerId(id ?? null);
    setCustomerModalOpen(true);
  };

  const handleCustomerSubmit = async (values: CustomerFormValues) => {
    if (customerModalMode === "create") {
      await createCustomerMutation.mutateAsync(values);
    } else if (editingCustomer) {
      await updateCustomerMutation.mutateAsync({
        id: editingCustomer._id,
        values,
      });
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa khách hàng này?");
    if (!confirmed) return;
    await deleteCustomerMutation.mutateAsync(id);
    await refetchCustomers();
  };

  const parties = partyType === "provider" ? providers : customers;

  return (
    <div className="space-y-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-md">
        <div>
          <h1 className="text-h2 text-primary">Nhà cung cấp</h1>
          <p className="text-secondary text-body-md mt-xs">
            Quản lý danh sách NCC và thanh toán công nợ
          </p>
        </div>
        <button
          type="button"
          onClick={() => openProviderModal("create")}
          className="px-md py-sm cursor-pointer bg-primary text-on-primary font-label-sm rounded-xl flex items-center justify-center gap-xs shadow-md active:scale-95 transition-all shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Thêm nhà cung cấp
        </button>
      </div>

      <ProviderTable
        data={providers}
        loading={isLoading}
        onEdit={(id) => openProviderModal("edit", id)}
        onDelete={handleDelete}
      />

      <ProviderFormModal
        open={providerModal.open}
        mode={providerModal.mode}
        provider={editingProvider}
        loading={isCreating || isUpdating}
        onClose={closeProviderModal}
        onSubmit={handleFormSubmit}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-md pt-md">
        <div>
          <h2 className="text-h3 text-primary">Khách hàng</h2>
          <p className="text-secondary text-body-md mt-xs">
            Quản lý danh sách khách hàng và công nợ
          </p>
        </div>
        <button
          type="button"
          onClick={() => openCustomerModal("create")}
          className="px-md py-sm cursor-pointer bg-secondary text-on-secondary font-label-sm rounded-xl flex items-center justify-center gap-xs shadow-md active:scale-95 transition-all shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          Thêm khách hàng
        </button>
      </div>

      <CustomerTable
        data={customers}
        loading={customersLoading}
        onEdit={(id) => openCustomerModal("edit", id)}
        onDelete={handleDeleteCustomer}
      />

      <CustomerFormModal
        open={customerModalOpen}
        mode={customerModalMode}
        customer={editingCustomer}
        loading={
          createCustomerMutation.isPending || updateCustomerMutation.isPending
        }
        onClose={() => setCustomerModalOpen(false)}
        onSubmit={handleCustomerSubmit}
      />

      <section className="rounded-2xl border border-surface-container bg-surface-bright p-lg space-y-md">
        <h2 className="font-semibold text-primary">Thanh toán công nợ</h2>
        <form
          className="space-y-md"
          onSubmit={async (e) => {
            e.preventDefault();
            await payMutation.mutateAsync({
              partyType,
              partyId,
              amount,
              method: "cash",
            });
          }}
        >
          <label className="block">
            <span className="text-label-sm text-secondary">Loại</span>
            <select
              className="mt-xs w-full rounded-xl border border-outline-variant px-sm py-xs"
              value={partyType}
              onChange={(e) => {
                setPartyType(e.target.value as "provider" | "customer");
                setPartyId("");
              }}
            >
              <option value="provider">Trả NCC</option>
              <option value="customer">Thu từ KH</option>
            </select>
          </label>
          <label className="block">
            <span className="text-label-sm text-secondary">Đối tác</span>
            <select
              className="mt-xs w-full rounded-xl border border-outline-variant px-sm py-xs"
              value={partyId}
              onChange={(e) => setPartyId(e.target.value)}
              required
            >
              <option value="">Chọn</option>
              {parties.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} — Nợ: {p.debt.toLocaleString()}đ
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-label-sm text-secondary">Số tiền</span>
            <input
              type="number"
              min={1}
              className="mt-xs w-full rounded-xl border border-outline-variant px-sm py-xs"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
            />
          </label>
          <button
            type="submit"
            disabled={payMutation.isPending}
            className="w-full rounded-xl bg-secondary py-sm text-on-secondary font-semibold"
          >
            {payMutation.isPending ? "Đang xử lý..." : "Xác nhận thanh toán"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default ProvidersPage;
