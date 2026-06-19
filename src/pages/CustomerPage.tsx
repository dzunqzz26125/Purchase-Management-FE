import { useMemo } from "react";
import { useCrud } from "../hooks/useCrud";
import CustomerTable from "../components/client/customers/CustomerTable";
import CustomerFormModal from "../feat/customer/CustomerFormModal";
import { useAppStore } from "../store/useAppStore";
import { customerApi } from "../api/customerApi";
import type { Customer, CustomerFormValues } from "../types/customer";

const CustomerPage = () => {
  const { customerModal, openCustomerModal, closeCustomerModal } =
    useAppStore();

  const {
    items: customers,
    isLoading,
    create,
    update,
    remove,
    isCreating,
    isUpdating,
  } = useCrud<Customer, CustomerFormValues, CustomerFormValues>("customers", {
    list: customerApi.list,
    create: customerApi.create,
    update: async (id, values) => customerApi.update(id, values),
    remove: customerApi.remove,
  });

  const editingCustomer = useMemo(
    () => customers.find((c) => c._id === customerModal.resourceId) ?? null,
    [customers, customerModal.resourceId],
  );

  const handleSubmit = async (values: CustomerFormValues) => {
    if (customerModal.mode === "create") {
      await create(values);
    } else if (editingCustomer) {
      await update({
        id: editingCustomer._id,
        data: values,
      });
    }
    closeCustomerModal();
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa khách hàng này?");
    if (!confirmed) return;
    await remove(id);
  };

  return (
    <div className="space-y-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-md">
        <div>
          <h1 className="text-h2 text-primary">Khách hàng</h1>
          <p className="text-secondary text-body-md mt-xs">
            Quản lý danh sách khách hàng và công nợ
          </p>
        </div>

        <button
          type="button"
          onClick={() => openCustomerModal("create")}
          className="px-md py-sm cursor-pointer bg-primary text-on-primary font-label-sm rounded-xl flex items-center justify-center gap-xs shadow-md active:scale-95 transition-all shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">
            person_add
          </span>
          Thêm khách hàng
        </button>
      </div>

      <CustomerTable
        data={customers}
        loading={isLoading}
        onEdit={(id) => openCustomerModal("edit", id)}
        onDelete={handleDelete}
      />

      <CustomerFormModal
        open={customerModal.open}
        mode={customerModal.mode}
        customer={editingCustomer}
        loading={isCreating || isUpdating}
        onClose={closeCustomerModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CustomerPage;
