export interface Category {
  _id: string;
  name: string;
  description?: string;
}

export interface ProductImage {
  url: string;
  alt?: string;
}

export interface Product {
  _id: string;
  sku: string;
  name: string;
  categoryId: string | Category;
  unit: string;
  costPrice: number;
  sellPrice: number;
  stock: number;
  minStock?: number;
  images?: ProductImage[];
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFormValues {
  sku: string;
  name: string;
  categoryId: string;
  unit: string;
  costPrice: number;
  sellPrice: number;
  stock: number;
  minStock?: number;
  imageUrl?: string;
}

export type StockStatus = "ok" | "low" | "pending";

export interface ProductTableItem {
  _id: string;
  sku: string;
  name: string;
  category: string;
  categoryId: string;
  stock: number;
  minStock?: number;
  status: StockStatus;
  image?: string;
  unit: string;
  costPrice: number;
  sellPrice: number;
}
