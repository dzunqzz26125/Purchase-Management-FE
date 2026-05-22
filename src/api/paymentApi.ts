import api from "./client";
import { unwrap } from "./types";

export type DebtPaymentInput = {
  partyType: "provider" | "customer";
  partyId: string;
  amount: number;
  method: "cash" | "transfer";
  note?: string;
};

export const paymentApi = {
  settleDebt: async (input: DebtPaymentInput) =>
    unwrap(await api.post("/payments", input)),
  list: async () => unwrap(await api.get("/payments")),
};
