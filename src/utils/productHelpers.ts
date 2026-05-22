import type {
  Category,
  Product,
  ProductTableItem,
  StockStatus,
} from "../types/product";

export const getCategoryName = (
  product: Product,
  categories: Category[],
): string => {
  // case 1: backend đã populate
  if (typeof product.categoryId === "object" && product.categoryId?.name) {
    return product.categoryId.name;
  }

  // case 2: chỉ có ID → map sang categories
  const category = categories.find((c) => c._id === product.categoryId);

  return category?.name || "—";
};

export const getCategoryId = (product: Product): string => {
  if (typeof product.categoryId === "object") {
    return product.categoryId._id;
  }
  return product.categoryId;
};

export const getStockStatus = (
  stock: number,
  minStock?: number,
): StockStatus => {
  const threshold = minStock ?? 10;
  if (stock <= 0) return "pending";
  if (stock <= threshold) return "low";
  return "ok";
};

export const toTableItem = (
  product: Product,
  categories: Category[],
): ProductTableItem => ({
  _id: product._id,
  sku: product.sku,
  name: product.name,
  category: getCategoryName(product, categories),
  categoryId: getCategoryId(product),
  stock: product.stock,
  minStock: product.minStock,
  status: getStockStatus(product.stock, product.minStock),
  image: product.images?.[0]?.url,
  unit: product.unit,
  costPrice: product.costPrice,
  sellPrice: product.sellPrice,
});

export const productToFormValues = (product: Product) => ({
  sku: product.sku,
  name: product.name,
  categoryId: getCategoryId(product),
  unit: product.unit,
  costPrice: product.costPrice,
  sellPrice: product.sellPrice,
  stock: product.stock,
  minStock: product.minStock,
  imageUrl: product.images?.[0]?.url ?? "",
});
