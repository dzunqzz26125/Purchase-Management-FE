import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { productApi } from "../api/productApi";
import type { Product } from "../types/product";
import { providerApi } from "../api/providerApi";
import {
  purchaseOrderApi,
  type CreatePOInput,
  type PurchaseOrder,
} from "../api/purchaseOrderApi";

type LineItem = { productId: string; qtyOrdered: number; costPrice: number };

const InboundPage = () => {
  const queryClient = useQueryClient();
  const [providerId, setProviderId] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);
  const [items, setItems] = useState<LineItem[]>([
    { productId: "", qtyOrdered: 1, costPrice: 0 },
  ]);

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
    },
  });

  const updateLine = (index: number, patch: Partial<LineItem>) => {
    setItems((prev) =>
      prev.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    );
  };

  const addLine = () =>
    setItems((prev) => [...prev, { productId: "", qtyOrdered: 1, costPrice: 0 }]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMutation.mutateAsync({
      providerId,
      items: items.filter((i) => i.productId),
      paidAmount,
    });
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
              className="mt-xs w-full rounded-xl border border-outline-variant px-sm py-xs"
              value={providerId}
              onChange={(e) => setProviderId(e.target.value)}
              required
            >
              <option value="">Chọn NCC</option>
              {providers.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                  {p.debt > 0 ? ` (Nợ: ${p.debt.toLocaleString()}đ)` : ""}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-label-sm text-secondary">Đã thanh toán</span>
            <input
              type="number"
              min={0}
              className="mt-xs w-full rounded-xl border border-outline-variant px-sm py-xs"
              value={paidAmount}
              onChange={(e) => setPaidAmount(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="space-y-sm">
          {items.map((line, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-sm items-end">
              <div className="col-span-6">
                <select
                  className="w-full rounded-xl border border-outline-variant px-sm py-xs"
                  value={line.productId}
                  onChange={(e) => {
                    const product = products.find((p) => p._id === e.target.value);
                    updateLine(idx, {
                      productId: e.target.value,
                      costPrice: product?.costPrice ?? line.costPrice,
                    });
                  }}
                  required
                >
                  <option value="">Sản phẩm</option>
                  {products.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name} (TK: {p.stock})
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
                />
              </div>
              <div className="col-span-3">
                <input
                  type="number"
                  min={0}
                  placeholder="Giá vốn"
                  className="w-full rounded-xl border border-outline-variant px-sm py-xs"
                  value={line.costPrice}
                  onChange={(e) =>
                    updateLine(idx, { costPrice: Number(e.target.value) })
                  }
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addLine}
            className="text-primary text-label-sm font-semibold"
          >
            + Thêm dòng
          </button>
        </div>

        <button
          type="submit"
          disabled={createMutation.isPending}
          className="rounded-xl bg-primary px-lg py-sm text-on-primary font-semibold disabled:opacity-60"
        >
          {createMutation.isPending ? "Đang tạo..." : "Tạo đơn nhập"}
        </button>
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
                <th className="px-lg py-sm" />
              </tr>
            </thead>
            <tbody>
              {orders.map((po) => (
                <tr key={po._id} className="border-t border-surface-container">
                  <td className="px-lg py-sm font-medium">{po.batchCode}</td>
                  <td className="px-lg py-sm">{providerName(po)}</td>
                  <td className="px-lg py-sm">
                    {po.expectedTotal.toLocaleString()}đ
                  </td>
                  <td className="px-lg py-sm">{po.debtAmount.toLocaleString()}đ</td>
                  <td className="px-lg py-sm">
                    <span
                      className={`px-sm py-0.5 rounded-full text-label-xs ${
                        po.status === "completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {po.status}
                    </span>
                  </td>
                  <td className="px-lg py-sm">
                    {po.status !== "completed" && (
                      <button
                        type="button"
                        onClick={() => completeMutation.mutate(po)}
                        disabled={completeMutation.isPending}
                        className="text-primary font-semibold hover:underline"
                      >
                        Nhập kho
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default InboundPage;
