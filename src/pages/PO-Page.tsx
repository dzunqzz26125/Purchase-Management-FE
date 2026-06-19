import { useState } from "react";
import InvoiceModal from "../components/client/InvoiceModal";
import type { PurchaseOrder } from "../api/purchaseOrderApi";
import { usePoForm } from "../hooks/usePoForm";
import POCreateForm from "../feat/po/POCreateForm";
import POOrderTable from "../feat/po/POOrderTable";

const InboundPage = () => {
  const po = usePoForm();
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] =
    useState<PurchaseOrder | null>(null);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);

  const handleCreate = async () => {
    try {
      await po.handleCreate();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Lỗi không xác định";
      alert("Lỗi khi tạo đơn nhập: " + message);
    }
  };

  const handleComplete = async (order: PurchaseOrder) => {
    try {
      await po.completeMutation.mutateAsync(order);
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;
      alert("Lỗi khi nhập kho: " + (message || "Không thể hoàn tất"));
    }
  };

  const handlePayDebt = async () => {
    try {
      await po.payDebtMutation.mutateAsync();
      alert("Thanh toán công nợ thành công!");
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;
      alert("Lỗi: " + (message || "Không thể thanh toán công nợ"));
    }
  };

  return (
    <div className="space-y-lg">
      <div>
        <h1 className="text-h2 text-primary">Đơn nhập kho (PO)</h1>
        <p className="text-secondary text-body-md mt-xs">
          Tạo đơn nhập và hoàn tất nhập kho (cập nhật tồn + công nợ NCC)
        </p>
      </div>

      <POCreateForm
        providerId={po.providerId}
        providers={po.providers}
        filteredProducts={po.filteredProducts}
        items={po.items}
        paidAmount={po.paidAmount}
        debtPayAmount={po.debtPayAmount}
        debtPayNote={po.debtPayNote}
        grandTotal={po.grandTotal}
        selectedProvider={po.selectedProvider}
        isCreating={po.createMutation.isPending}
        isPayingDebt={po.payDebtMutation.isPending}
        onProviderChange={po.handleProviderChange}
        onPaidAmountChange={po.setPaidAmount}
        onDebtPayAmountChange={po.setDebtPayAmount}
        onDebtPayNoteChange={po.setDebtPayNote}
        onUpdateLine={po.updateLine}
        onAddLine={po.addLine}
        onRemoveLine={po.removeLine}
        onPayDebt={handlePayDebt}
        onSubmit={handleCreate}
      />

      <POOrderTable
        orders={po.orders}
        isLoading={po.ordersLoading}
        isCompleting={po.completeMutation.isPending}
        onComplete={handleComplete}
        onShowInvoice={(order) => {
          setSelectedInvoiceOrder(order);
          setInvoiceModalOpen(true);
        }}
      />

      <InvoiceModal
        open={invoiceModalOpen}
        type="PO"
        order={selectedInvoiceOrder}
        onClose={() => {
          setInvoiceModalOpen(false);
          setSelectedInvoiceOrder(null);
        }}
      />
    </div>
  );
};

export default InboundPage;
