import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProviderTable from "../components/client/providers/ProviderTable";
import CustomerTable from "../components/client/customers/CustomerTable";
import ProviderFormModal from "../feat/providers/ProviderFormModal";
import CustomerFormModal from "../feat/customer/CustomerFormModal";
import DebtSettlementForm from "../feat/providers/DebtSettlementForm";
import { customerApi } from "../api/customerApi";
import { useCrud } from "../hooks/useCrud";
import { useAppStore } from "../store/useAppStore";
import type { Provider, ProviderFormValues } from "../types/provider";
import type { CustomerFormValues } from "../types/customer";
import { providerApi } from "../api/providerApi";

const ProvidersPage = () => {
  const queryClient = useQueryClient();
  const { providerModal, openProviderModal, closeProviderModal } =
    useAppStore();

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
    mutationFn: ({ id, values }: { id: string; values: CustomerFormValues }) =>
      customerApi.update(id, values),
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

      <DebtSettlementForm providers={providers} customers={customers} />
    </div>
  );
};

export default ProvidersPage;
