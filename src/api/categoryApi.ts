import { Category } from "../types/product";
import api from "./client";
import { unwrap } from "./types";

export const categoryApi = {
  list: async (): Promise<Category[]> => unwrap(await api.get("/categories")),
  create: async (values: {
    name: string;
    description?: string;
    providerId: string;
  }): Promise<Category> => {
    const res = await api.post("/categories", values);
    console.log("CREATE response raw:", res.data);
    return unwrap(res);
  },
  update: async (
    id: string,
    values: { name?: string; description?: string; providerId?: string },
  ): Promise<Category> => unwrap(await api.patch(`/categories/${id}`, values)),
  remove: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },
};
