import api from "./client";
import { unwrap } from "./types";

export type Customer = {
  _id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  debt: number;
};

export const customerApi = {
  list: async (): Promise<Customer[]> => unwrap(await api.get("/customers")),
  create: async (values: Omit<Customer, "_id" | "debt">) =>
    unwrap(await api.post("/customers", values)),
};
