import api from "./client";
import { unwrap } from "./types";
import type { Customer, CustomerFormValues } from "../types/customer";
import { toCustomerPayload } from "../utils/customerHelpers";

export type { Customer, CustomerFormValues };

export const customerApi = {
  list: async (): Promise<Customer[]> => unwrap(await api.get("/customers")),
  create: async (values: CustomerFormValues): Promise<Customer> =>
    unwrap(await api.post("/customers", toCustomerPayload(values))),
  update: async (
    id: string,
    values: Partial<CustomerFormValues>,
  ): Promise<Customer> =>
    unwrap(
      await api.patch(
        `/customers/${id}`,
        toCustomerPayload(values as CustomerFormValues),
      ),
    ),
  remove: async (id: string): Promise<void> => {
    await api.delete(`/customers/${id}`);
  },
};
