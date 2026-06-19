import api from "./client";
import { unwrap } from "./types";

export type Agency = {
  _id: string;
  name: string;
  phone?: string;
  address?: string;
  owner: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AgencyFormValues = {
  name: string;
  phone: string;
  address: string;
};

export const agencyApi = {
  getMine: async (): Promise<Agency> => unwrap(await api.get("/agencies/me")),
  updateMine: async (values: Partial<AgencyFormValues>): Promise<Agency> =>
    unwrap(await api.put("/agencies/me", values)),
  create: async (values: AgencyFormValues): Promise<Agency> =>
    unwrap(await api.post("/agencies", values)),
};
