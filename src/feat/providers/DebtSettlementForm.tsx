import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentApi } from "../../api/paymentApi";
import VndInput from "../../components/UI/VndInput";
import { formatVnd } from "../../utils/formatVnd";

type Party = { _id: string; name: string; debt: number };

type DebtSettlementFormProps = {
  providers: Party[];
  customers: Party[];
};

export default function DebtSettlementForm({
  providers,
  customers,
}: DebtSettlementFormProps) {
  const queryClient = useQueryClient();
  const [partyType, setPartyType] = useState<"provider" | "customer">(
    "provider",
  );
  const [partyId, setPartyId] = useState("");
  const [amount, setAmount] = useState(0);

  const parties = partyType === "provider" ? providers : customers;

  const payMutation = useMutation({
    mutationFn: paymentApi.settleDebt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      setAmount(0);
      setPartyId("");
    },
  });

  return (
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
                {p.name} — Nợ: {formatVnd(p.debt)}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-label-sm text-secondary">Số tiền</span>
          <VndInput
            className="mt-xs w-full rounded-xl border border-outline-variant px-sm py-xs"
            value={amount}
            onChange={setAmount}
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
  );
}
