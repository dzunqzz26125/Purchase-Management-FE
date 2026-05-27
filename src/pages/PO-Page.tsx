import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { productApi } from "../api/productApi";
import type { Product } from "../types/product";
import { providerApi } from "../api/providerApi";
import {
  purchaseOrderApi,
  type CreatePOInput,
  type PurchaseOrder,
} from "../api/purchaseOrderApi";
import InvoiceModal from "../components/client/InvoiceModal";

type LineItem = { productId: string; qtyOrdered: number; costPrice: number };

const InboundPage = () => {
  const queryClient = useQueryClient();
  const [providerId, setProviderId] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);
  const [items, setItems] = useState<LineItem[]>([
    { productId: "", qtyOrdered: 1, costPrice: 0 },
  ]);

  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<PurchaseOrder | null>(null);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);

  const { data: providers = [] } = useQuery({
    queryKey: ["providers", "list"],
    queryFn: providerApi.list,
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["products", "list"],
    queryFn: productApi.list,
  });

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["purchase-orders", "list"],
    queryFn: purchaseOrderApi.list,
  });

  const createMutation = useMutation({
    mutationFn: (input: CreatePOInput) => purchaseOrderApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchase-orders"] });
      setItems([{ productId: "", qtyOrdered: 1, costPrice: 0 }]);
      setPaidAmount(0);
    },
    onError: (err: any) => {
      alert("Lỗi khi tạo đơn nhập: " + (err?.response?.data?.message || err.message));
    },
  });

  const completeMutation = useMutation({
    mutationFn: (order: PurchaseOrder) =>
      purchaseOrderApi.complete(order._id, {
        items: order.items.map((i) => ({
          productId:
            typeof i.productId === "string"
              ? i.productId
              : String((i.productId as { _id?: string })._id ?? i.productId),
          qtyReceived: i.qtyOrdered,
        })),
        paidAmount: order.paidAmount,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchase-orders"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
    onError: (err: any) => {
      alert("Lỗi khi nhập kho: " + (err?.response?.data?.message || err.message));
    },
  });

  // Filter products: Only show products belonging to the selected provider
  const filteredProducts = useMemo(() => {
    if (!providerId) return [];
    return products.filter((p) => {
      const prodProvId =
        typeof p.providerId === "object" && p.providerId
          ? p.providerId._id
          : p.providerId;
      return prodProvId === providerId;
    });
  }, [providerId, products]);

  const handleProviderChange = (newProviderId: string) => {
    setProviderId(newProviderId);
    setItems([{ productId: "", qtyOrdered: 1, costPrice: 0 }]);
    setPaidAmount(0);
  };

  const updateLine = (index: number, patch: Partial<LineItem>) => {
    setItems((prev) =>
      prev.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    );
  };

  const addLine = () =>
    setItems((prev) => [...prev, { productId: "", qtyOrdered: 1, costPrice: 0 }]);

  const removeLine = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const grandTotal = useMemo(() => {
    return items.reduce((sum, line) => sum + line.qtyOrdered * line.costPrice, 0);
  }, [items]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeItems = items.filter((i) => i.productId);
    if (activeItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm!");
      return;
    }
    await createMutation.mutateAsync({
      providerId,
      items: activeItems,
      paidAmount,
    });
  };

  const handleShowInvoice = (po: PurchaseOrder) => {
    setSelectedInvoiceOrder(po);
    setInvoiceModalOpen(true);
  };

  const providerName = (po: PurchaseOrder) => {
    const p = po.providerId;
    return typeof p === "object" && p && "name" in p ? p.name : "—";
  };

  return (
    <div className="space-y-lg">
      <div>
        <h1 className="text-h2 text-primary">Đơn nhập kho (PO)</h1>
        <p className="text-secondary text-body-md mt-xs">
          Tạo đơn nhập và hoàn tất nhập kho (cập nhật tồn + công nợ NCC)
        </p>
      </div>

      <form
        onSubmit={handleCreate}
        className="rounded-2xl border border-surface-container bg-surface-bright p-lg space-y-md"
      >
        <h2 className="font-semibold text-primary">Tạo đơn nhập mới</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <label className="block">
            <span className="text-label-sm text-secondary">Nhà cung cấp</span>
            <select
              className="mt-xs w-full rounded-xl border border-outline-variant px-sm py-xs bg-white"
              value={providerId}
              onChange={(e) => handleProviderChange(e.target.value)}
              required
            >
              <option value="">Chọn NCC</option>
              {providers.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} {p.debt > 0 ? ` (Nợ: ${p.debt.toLocaleString()}đ)` : ""}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-label-sm text-secondary">Đã thanh toán (VNĐ)</span>
            <input
              type="number"
              min={0}
              max={grandTotal}
              className="mt-xs w-full rounded-xl border border-outline-variant px-sm py-xs"
              value={paidAmount}
              onChange={(e) => setPaidAmount(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="space-y-sm">
          <label className="block text-label-sm text-secondary font-medium">Danh sách sản phẩm nhập</label>
          {!providerId ? (
            <p className="text-secondary text-label-sm italic py-xs">
              Vui lòng chọn Nhà cung cấp trước để hiển thị danh sách sản phẩm tương ứng.
            </p>
          ) : (
            <div className="space-y-xs">
              {items.map((line, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-sm items-center">
                  <div className="col-span-5">
                    <select
                      className="w-full rounded-xl border border-outline-variant px-sm py-xs bg-white"
                      value={line.productId}
                      onChange={(e) => {
                        const product = filteredProducts.find((p) => p._id === e.target.value);
                        updateLine(idx, {
                          productId: e.target.value,
                          costPrice: product?.costPrice ?? line.costPrice,
                        });
                      }}
                      required
                    >
                      <option value="">Sản phẩm</option>
                      {filteredProducts.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.name} (Tồn: {p.stock})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      min={1}
                      placeholder="SL"
                      className="w-full rounded-xl border border-outline-variant px-sm py-xs"
                      value={line.qtyOrdered}
                      onChange={(e) =>
                        updateLine(idx, { qtyOrdered: Number(e.target.value) })
                      }
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      min={0}
                      placeholder="Giá vốn"
                      className="w-full rounded-xl border border-outline-variant px-sm py-xs"
                      value={line.costPrice}
                      onChange={(e) =>
                        updateLine(idx, { costPrice: Number(e.target.value) })
                      }
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      readOnly
                      placeholder="Thành tiền"
                      className="w-full rounded-xl border border-surface-container bg-surface-container-low px-sm py-xs text-right font-semibold text-secondary"
                      value={`${(line.qtyOrdered * line.costPrice).toLocaleString()}đ`}
                    />
                  </div>
                  <div className="col-span-1 text-center">
                    <button
                      type="button"
                      onClick={() => removeLine(idx)}
                      disabled={items.length <= 1}
                      className="p-xs text-secondary hover:text-error disabled:opacity-40 cursor-pointer"
                      title="Xóa dòng"
                    >
                      <span className="material-symbols-outlined text-[20px] block">delete</span>
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addLine}
                className="text-primary text-label-sm font-semibold hover:underline flex items-center gap-0.5 cursor-pointer mt-xs"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                Thêm dòng sản phẩm
              </button>
            </div>
          )}
        </div>

        {providerId && (
          <div className="pt-sm border-t border-surface-container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
            <p className="text-body-md font-semibold text-primary">
              Tổng tiền hàng: {grandTotal.toLocaleString()}đ &mdash; Còn nợ NCC:{" "}
              {Math.max(0, grandTotal - paidAmount).toLocaleString()}đ
            </p>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="rounded-xl bg-primary px-lg py-sm text-on-primary font-semibold disabled:opacity-60 cursor-pointer active:scale-95 transition-all"
            >
              {createMutation.isPending ? "Đang tạo..." : "Tạo đơn nhập"}
            </button>
          </div>
        )}
      </form>

      <div className="rounded-2xl border border-surface-container bg-surface-bright overflow-hidden">
        <div className="px-lg py-md border-b border-surface-container">
          <h2 className="font-semibold text-primary">Danh sách đơn nhập</h2>
        </div>
        {isLoading ? (
          <p className="p-lg text-secondary">Đang tải...</p>
        ) : (
          <table className="w-full text-left text-label-sm">
            <thead className="bg-surface-container-low text-secondary">
              <tr>
                <th className="px-lg py-sm">Mã lô</th>
                <th className="px-lg py-sm">NCC</th>
                <th className="px-lg py-sm">Tổng</th>
                <th className="px-lg py-sm">Công nợ</th>
                <th className="px-lg py-sm">Trạng thái</th>
                <th className="px-lg py-sm text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((po) => (
                <tr key={po._id} className="border-t border-surface-container hover:bg-surface-container-low/10">
                  <td className="px-lg py-sm font-medium">{po.batchCode}</td>
                  <td className="px-lg py-sm">{providerName(po)}</td>
                  <td className="px-lg py-sm">
                    {po.expectedTotal.toLocaleString()}đ
                  </td>
                  <td className="px-lg py-sm">{po.debtAmount.toLocaleString()}đ</td>
                  <td className="px-lg py-sm">
                    <span
                      className={`px-sm py-0.5 rounded-full text-label-xs font-semibold ${
                        po.status === "completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {po.status === "completed" ? "Đã nhập kho" : "Đang kiểm hàng"}
                    </span>
                  </td>
                  <td className="px-lg py-sm text-right">
                    <div className="flex items-center justify-end gap-sm">
                      {po.status !== "completed" && (
                        <button
                          type="button"
                          onClick={() => completeMutation.mutate(po)}
                          disabled={completeMutation.isPending}
                          className="text-emerald-600 font-semibold hover:underline cursor-pointer"
                        >
                          Nhập kho
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleShowInvoice(po)}
                        className="text-primary font-semibold hover:underline cursor-pointer flex items-center gap-0.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">print</span>
                        Hóa đơn
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-lg text-secondary">
                    Chưa có đơn nhập kho nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

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
