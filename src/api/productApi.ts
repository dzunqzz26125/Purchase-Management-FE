import api from "./client";
import { unwrap } from "./types";
import type { Category, Product, ProductFormValues } from "../types/product";

const toPayload = (values: ProductFormValues) => {
  const payload: Record<string, unknown> = {
    sku: values.sku.trim(),
    name: values.name.trim(),
    categoryId: values.categoryId,
    unit: values.unit.trim(),
    costPrice: Number(values.costPrice),
    sellPrice: Number(values.sellPrice),
    stock: Number(values.stock),
  };
  if (values.minStock != null && !Number.isNaN(Number(values.minStock))) {
    payload.minStock = Number(values.minStock);
  }
  if (values.imageUrl?.trim()) {
    payload.images = [{ url: values.imageUrl.trim(), alt: values.name.trim() }];
  }
  return payload;
};

export const productApi = {
  list: async (): Promise<Product[]> =>
    unwrap(await api.get("/products")),
  getById: async (id: string): Promise<Product> =>
    unwrap(await api.get(`/products/${id}`)),
  create: async (values: ProductFormValues): Promise<Product> =>
    unwrap(await api.post("/products", toPayload(values))),
  update: async (id: string, values: ProductFormValues): Promise<Product> =>
    unwrap(await api.patch(`/products/${id}`, toPayload(values))),
  remove: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};

export const categoryApi = {
  list: async (): Promise<Category[]> => unwrap(await api.get("/categories")),
};
