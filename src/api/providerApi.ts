import api from "./client";
import { unwrap } from "./types";
import type { Provider, ProviderFormValues } from "../types/provider";
import {
  toProviderPayload,
  toProviderUpdatePayload,
} from "../utils/providerHelpers";

export type { Provider, ProviderFormValues };

export const providerApi = {
  list: async (): Promise<Provider[]> => unwrap(await api.get("/providers")),
  create: async (values: ProviderFormValues): Promise<Provider> =>
    unwrap(await api.post("/providers", toProviderPayload(values))),
  update: async (
    id: string,
    values: Partial<ProviderFormValues>,
  ): Promise<Provider> =>
    unwrap(
      await api.patch(
        `/providers/${id}`,
        toProviderUpdatePayload(values as ProviderFormValues),
      ),
    ),
  remove: async (id: string): Promise<void> => {
    await api.delete(`/providers/${id}`);
  },
};
