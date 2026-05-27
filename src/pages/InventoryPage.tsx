import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FilterBar from "../components/client/products/FilterBar";
import InventoryTable from "../components/client/products/InventoryTable";
import StatCard from "../components/client/products/StatCard";
import ProductFormModal from "../feat/product/ProductFormModal";
import CategoryManagerModal from "../feat/product/CategoryManagerModal";
import { productApi } from "../api/productApi";
import { useCrud } from "../hooks/useCrud";
import { useAppStore } from "../store/useAppStore";
import type { Product, ProductFormValues } from "../types/product";
import { toTableItem } from "../utils/productHelpers";
import { categoryApi } from "../api/categoryApi";

const Inventory = () => {
  const {
    productModal,
    categoryFilter,
    statusFilter,
    openProductModal,
    closeProductModal,
    setCategoryFilter,
    setStatusFilter,
  } = useAppStore();

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories", "list"],
    queryFn: categoryApi.list,
  });

  const {
    items: products,
    isLoading,
    create,
    update,
    remove,
    isCreating,
    isUpdating,
  } = useCrud<Product, ProductFormValues, ProductFormValues>("products", {
    list: productApi.list,
    create: productApi.create,
    update: productApi.update,
    remove: productApi.remove,
  });

  const editingProduct = useMemo(
    () => products.find((p) => p._id === productModal.resourceId) ?? null,
    [products, productModal.resourceId],
  );

  const tableData = useMemo(
    () =>
      products
        .map((product) => toTableItem(product, categories))
        .filter((item) => {
          if (categoryFilter && item.categoryId !== categoryFilter)
            return false;
          if (statusFilter && item.status !== statusFilter) return false;
          return true;
        }),
    [products, categories, categoryFilter, statusFilter],
  );

  const handleFormSubmit = async (values: ProductFormValues) => {
    if (productModal.mode === "create") {
      await create(values);
    } else if (editingProduct) {
      await update({ id: editingProduct._id, data: values });
    }
    closeProductModal();
  };

  const handleDelete = async (productId: string) => {
    const confirmed = window.confirm(
      "Bạn có chắc muốn xóa sản phẩm này? (Xóa mềm — có thể khôi phục sau)",
    );
    if (!confirmed) return;
    await remove(productId);
  };

  return (
    <>
      <FilterBar
        categories={categories}
        categoryFilter={categoryFilter}
        statusFilter={statusFilter}
        onCategoryChange={setCategoryFilter}
        onStatusChange={setStatusFilter}
        onAddClick={() => openProductModal("create")}
        onManageCategoriesClick={() => setCategoryModalOpen(true)}
      />

      <InventoryTable
        data={tableData}
        loading={isLoading}
        onEdit={(id) => openProductModal("edit", id)}
        onDelete={handleDelete}
      />

      <StatCard totalProducts={products.length} products={products} />

      <ProductFormModal
        open={productModal.open}
        mode={productModal.mode}
        product={editingProduct}
        categories={categories}
        loading={isCreating || isUpdating}
        onClose={closeProductModal}
        onSubmit={handleFormSubmit}
      />

      <CategoryManagerModal
        open={categoryModalOpen}
        categories={categories}
        onClose={() => setCategoryModalOpen(false)}
      />
    </>
  );
};

export default Inventory;
