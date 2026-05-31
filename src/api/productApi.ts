import api from "./client";
import { unwrap } from "./types";
import type { Category, Product, ProductFormValues } from "../types/product";
import { isValidProductImageUrl } from "../utils/productHelpers";

const toPayload = (values: ProductFormValues) => {
  const payload: Record<string, unknown> = {
    name: values.name.trim(),
    categoryId: values.categoryId,
    unit: values.unit.trim(),
    costPrice: Number(values.costPrice),
    sellPrice: Number(values.sellPrice),
    stock: Number(values.stock),
  };
  const sku = values.sku?.trim();
  if (sku) payload.sku = sku;
  if (values.minStock != null && !Number.isNaN(Number(values.minStock))) {
    payload.minStock = Number(values.minStock);
  }
  const imageUrl = values.imageUrl?.trim();
  if (imageUrl && isValidProductImageUrl(imageUrl)) {
    payload.images = [{ url: imageUrl, alt: values.name.trim() }];
  }
  return payload;
};

export const productApi = {
  list: async (): Promise<Product[]> => unwrap(await api.get("/products")),
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
