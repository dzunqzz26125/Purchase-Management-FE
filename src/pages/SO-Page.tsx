import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { customerApi } from "../api/customerApi";
import { productApi } from "../api/productApi";
import type { Product } from "../types/product";
import { salesOrderApi, type CreateSOInput } from "../api/salesOrderApi";
import InvoiceModal from "../components/client/InvoiceModal";

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

  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<any>(null);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);

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
    onError: (err: any) => {
      alert("Lỗi khi tạo đơn bán: " + (err?.response?.data?.message || err.message));
    },
  });

  const updateLine = (index: number, patch: Partial<LineItem>) => {
    setItems((prev) =>
      prev.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    );
  };

  const addLine = () => {
    setItems((prev) => [...prev, { productId: "", qty: 1, price: 0 }]);
  };

  const removeLine = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const grandTotal = useMemo(() => {
    return items.reduce((sum, line) => sum + line.qty * line.price, 0);
  }, [items]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeItems = items.filter((i) => i.productId);
    if (activeItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm!");
      return;
    }
    const payload: CreateSOInput = {
      items: activeItems,
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

  const handleShowInvoice = (so: any) => {
    setSelectedInvoiceOrder(so);
    setInvoiceModalOpen(true);
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
              className="mt-xs w-full rounded-xl border border-outline-variant px-sm py-xs bg-white"
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
              className="mt-xs w-full rounded-xl border border-outline-variant px-sm py-xs bg-white"
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
            <span className="text-label-sm text-secondary">Đã thu (VNĐ)</span>
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
          <label className="block text-label-sm text-secondary font-medium">Danh sách sản phẩm bán</label>
          <div className="space-y-xs">
            {items.map((line, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-sm items-center">
                <div className="col-span-5">
                  <select
                    className="w-full rounded-xl border border-outline-variant px-sm py-xs bg-white"
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
                        {p.name} (Tồn: {p.stock})
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
                    required
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    min={0}
                    className="w-full rounded-xl border border-outline-variant px-sm py-xs"
                    value={line.price}
                    onChange={(e) =>
                      updateLine(idx, { price: Number(e.target.value) })
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
                    value={`${(line.qty * line.price).toLocaleString()}đ`}
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
        </div>

        <div className="pt-sm border-t border-surface-container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
          <p className="text-body-md font-semibold text-primary">
            Tổng: {grandTotal.toLocaleString()}đ &mdash; Còn nợ KH:{" "}
            {Math.max(0, grandTotal - paidAmount).toLocaleString()}đ
          </p>
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="rounded-xl bg-primary px-lg py-sm text-on-primary font-semibold disabled:opacity-60 cursor-pointer active:scale-95 transition-all"
          >
            {createMutation.isPending ? "Đang tạo..." : "Tạo đơn bán & xuất kho"}
          </button>
        </div>
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
                <th className="px-lg py-sm text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((so) => (
                <tr key={so._id} className="border-t border-surface-container hover:bg-surface-container-low/10">
                  <td className="px-lg py-sm font-medium">{so.orderCode}</td>
                  <td className="px-lg py-sm">{so.customerName || "—"}</td>
                  <td className="px-lg py-sm">
                    {so.grandTotal.toLocaleString()}đ
                  </td>
                  <td className="px-lg py-sm">
                    <span
                      className={`px-sm py-0.5 rounded-full text-label-xs font-semibold ${
                        so.paymentStatus === "paid"
                          ? "bg-emerald-100 text-emerald-700"
                          : so.paymentStatus === "partial"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-error-container/40 text-error"
                      }`}
                    >
                      {so.paymentStatus === "paid"
                        ? "Đã thu đủ"
                        : so.paymentStatus === "partial"
                        ? "Thu một phần"
                        : "Chưa thanh toán"}
                    </span>
                  </td>
                  <td className="px-lg py-sm">
                    <span className="px-sm py-0.5 rounded-full text-label-xs bg-slate-100 text-slate-700 font-semibold uppercase">
                      {so.status}
                    </span>
                  </td>
                  <td className="px-lg py-sm text-right">
                    <button
                      type="button"
                      onClick={() => handleShowInvoice(so)}
                      className="text-primary font-semibold hover:underline cursor-pointer flex items-center justify-end gap-0.5 ml-auto"
                    >
                      <span className="material-symbols-outlined text-[16px]">print</span>
                      Hóa đơn
                    </button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-lg text-secondary">
                    Chưa có đơn bán hàng nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <InvoiceModal
        open={invoiceModalOpen}
        type="SO"
        order={selectedInvoiceOrder}
        onClose={() => {
          setInvoiceModalOpen(false);
          setSelectedInvoiceOrder(null);
        }}
      />
    </div>
  );
};

export default OutboundPage;
