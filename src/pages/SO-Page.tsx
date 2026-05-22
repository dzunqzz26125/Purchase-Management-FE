import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { customerApi } from "../api/customerApi";
import { productApi } from "../api/productApi";
import type { Product } from "../types/product";
import { salesOrderApi, type CreateSOInput } from "../api/salesOrderApi";

type LineItem = { productId: string; qty: number; price: number };

const OutboundPage = () => {
  const queryClient = useQueryClient();
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "transfer">("cash");
  const [paidAmount, setPaidAmount] = useState(0);
  const [items, setItems] = useState<LineItem[]>([
    { productId: "", qty: 1, price: 0 },
  ]);

  const { data: customers = [] } = useQuery({
    queryKey: ["customers", "list"],
    queryFn: customerApi.list,
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["products", "list"],
    queryFn: productApi.list,
  });

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["sales-orders", "list"],
    queryFn: salesOrderApi.list,
  });

  const createMutation = useMutation({
    mutationFn: (input: CreateSOInput) => salesOrderApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales-orders"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      setItems([{ productId: "", qty: 1, price: 0 }]);
      setPaidAmount(0);
    },
  });

  const updateLine = (index: number, patch: Partial<LineItem>) => {
    setItems((prev) =>
      prev.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    );
  };

  const grandTotal = items.reduce(
    (sum, line) => sum + line.qty * line.price,
    0,
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CreateSOInput = {
      items: items.filter((i) => i.productId),
      paymentMethod,
      paidAmount,
    };
    if (customerId) {
      payload.customerId = customerId;
    } else {
      payload.customerName = customerName;
      payload.customerPhone = customerPhone;
    }
    await createMutation.mutateAsync(payload);
  };

  return (
    <div className="space-y-lg">
      <div>
        <h1 className="text-h2 text-primary">Đơn bán hàng (SO)</h1>
        <p className="text-secondary text-body-md mt-xs">
          Xuất kho tự động khi tạo đơn — kiểm tra tồn trước khi bán
        </p>
      </div>

      <form
        onSubmit={handleCreate}
        className="rounded-2xl border border-surface-container bg-surface-bright p-lg space-y-md"
      >
        <h2 className="font-semibold text-primary">Tạo đơn bán mới</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <label className="block">
            <span className="text-label-sm text-secondary">Khách hàng (đã có)</span>
            <select
              className="mt-xs w-full rounded-xl border border-outline-variant px-sm py-xs"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            >
              <option value="">Khách lẻ / nhập tay</option>
              {customers.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name} {c.debt > 0 ? `(Nợ: ${c.debt.toLocaleString()}đ)` : ""}
                </option>
              ))}
            </select>
          </label>
          {!customerId && (
            <>
              <label className="block">
                <span className="text-label-sm text-secondary">Tên KH</span>
                <input
                  className="mt-xs w-full rounded-xl border border-outline-variant px-sm py-xs"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </label>
              <label className="block">
                <span className="text-label-sm text-secondary">SĐT</span>
                <input
                  className="mt-xs w-full rounded-xl border border-outline-variant px-sm py-xs"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  pattern="[0-9]{9,12}"
                  required
                />
              </label>
            </>
          )}
          <label className="block">
            <span className="text-label-sm text-secondary">Thanh toán</span>
            <select
              className="mt-xs w-full rounded-xl border border-outline-variant px-sm py-xs"
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value as "cash" | "transfer")
              }
            >
              <option value="cash">Tiền mặt</option>
              <option value="transfer">Chuyển khoản</option>
            </select>
          </label>
          <label className="block">
            <span className="text-label-sm text-secondary">Đã thu</span>
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
                      price: product?.sellPrice ?? line.price,
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
                  className="w-full rounded-xl border border-outline-variant px-sm py-xs"
                  value={line.qty}
                  onChange={(e) => updateLine(idx, { qty: Number(e.target.value) })}
                />
              </div>
              <div className="col-span-3">
                <input
                  type="number"
                  min={0}
                  className="w-full rounded-xl border border-outline-variant px-sm py-xs"
                  value={line.price}
                  onChange={(e) =>
                    updateLine(idx, { price: Number(e.target.value) })
                  }
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setItems((prev) => [...prev, { productId: "", qty: 1, price: 0 }])
            }
            className="text-primary text-label-sm font-semibold"
          >
            + Thêm dòng
          </button>
        </div>

        <p className="text-label-md font-semibold text-primary">
          Tổng: {grandTotal.toLocaleString()}đ — Còn nợ:{" "}
          {Math.max(0, grandTotal - paidAmount).toLocaleString()}đ
        </p>

        <button
          type="submit"
          disabled={createMutation.isPending}
          className="rounded-xl bg-primary px-lg py-sm text-on-primary font-semibold disabled:opacity-60"
        >
          {createMutation.isPending ? "Đang tạo..." : "Tạo đơn bán & xuất kho"}
        </button>
      </form>

      <div className="rounded-2xl border border-surface-container bg-surface-bright overflow-hidden">
        <div className="px-lg py-md border-b border-surface-container">
          <h2 className="font-semibold text-primary">Đơn bán gần đây</h2>
        </div>
        {isLoading ? (
          <p className="p-lg text-secondary">Đang tải...</p>
        ) : (
          <table className="w-full text-left text-label-sm">
            <thead className="bg-surface-container-low text-secondary">
              <tr>
                <th className="px-lg py-sm">Mã đơn</th>
                <th className="px-lg py-sm">Khách</th>
                <th className="px-lg py-sm">Tổng</th>
                <th className="px-lg py-sm">TT</th>
                <th className="px-lg py-sm">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((so) => (
                <tr key={so._id} className="border-t border-surface-container">
                  <td className="px-lg py-sm font-medium">{so.orderCode}</td>
                  <td className="px-lg py-sm">{so.customerName || "—"}</td>
                  <td className="px-lg py-sm">
                    {so.grandTotal.toLocaleString()}đ
                  </td>
                  <td className="px-lg py-sm">{so.paymentStatus}</td>
                  <td className="px-lg py-sm">{so.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OutboundPage;
