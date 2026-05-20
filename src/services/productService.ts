import api from "../mock/api";
import type { Category, Product, ProductFormValues } from "../types/product";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

const unwrap = <T>(res: { data: ApiResponse<T> }) => res.data.data;

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

  if (values.minStock !== undefined && values.minStock !== "") {
    payload.minStock = Number(values.minStock);
  }

  if (values.imageUrl?.trim()) {
    payload.images = [{ url: values.imageUrl.trim(), alt: values.name.trim() }];
  }

  return payload;
};

export const productService = {
  async getProducts(): Promise<Product[]> {
    const res = await api.get<ApiResponse<Product[]>>("/products");
    return unwrap(res);
  },

  async getCategories(): Promise<Category[]> {
    const res = await api.get<ApiResponse<Category[]>>("/categories");
    return unwrap(res);
  },

  async createProduct(values: ProductFormValues): Promise<Product> {
    const res = await api.post<ApiResponse<Product>>(
      "/products",
      toPayload(values),
    );
    return unwrap(res);
  },

  async updateProduct(
    id: string,
    values: ProductFormValues,
  ): Promise<Product> {
    const res = await api.patch<ApiResponse<Product>>(
      `/products/${id}`,
      toPayload(values),
    );
    return unwrap(res);
  },

  async deleteProduct(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
  },
};
