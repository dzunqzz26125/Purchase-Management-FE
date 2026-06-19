import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productApi } from "../api/productApi";
import { providerApi } from "../api/providerApi";
import { paymentApi } from "../api/paymentApi";
import {
  purchaseOrderApi,
  type CreatePOInput,
  type PurchaseOrder,
} from "../api/purchaseOrderApi";
import type { Product } from "../types/product";

export type PoLineItem = {
  productId: string;
  qtyOrdered: number;
  costPrice: number;
};

const emptyLine = (): PoLineItem => ({
  productId: "",
  qtyOrdered: 1,
  costPrice: 0,
});

export function usePoForm() {
  const queryClient = useQueryClient();
  const [providerId, setProviderId] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);
  const [debtPayAmount, setDebtPayAmount] = useState(0);
  const [debtPayNote, setDebtPayNote] = useState("");
  const [items, setItems] = useState<PoLineItem[]>([emptyLine()]);

  const { data: providers = [] } = useQuery({
    queryKey: ["providers", "list"],
    queryFn: providerApi.list,
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["products", "list", providerId || "all"],
    queryFn: () =>
      providerId
        ? productApi.list({ providerId })
        : productApi.list(),
    enabled: Boolean(providerId),
  });

  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ["purchase-orders", "list"],
    queryFn: purchaseOrderApi.list,
  });

  const selectedProvider = providers.find((p) => p._id === providerId);

  const filteredProducts = useMemo(() => {
    if (!providerId) return [];
    return products;
  }, [providerId, products]);

  const grandTotal = useMemo(
    () =>
      items.reduce((sum, line) => sum + line.qtyOrdered * line.costPrice, 0),
    [items],
  );

  const resetForm = () => {
    setItems([emptyLine()]);
    setPaidAmount(0);
    setDebtPayAmount(0);
    setDebtPayNote("");
  };

  const handleProviderChange = (newProviderId: string) => {
    setProviderId(newProviderId);
    resetForm();
  };

  const updateLine = (index: number, patch: Partial<PoLineItem>) => {
    setItems((prev) =>
      prev.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    );
  };

  const addLine = () => setItems((prev) => [...prev, emptyLine()]);

  const removeLine = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const createMutation = useMutation({
    mutationFn: (input: CreatePOInput) => purchaseOrderApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchase-orders"] });
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      resetForm();
    },
  });

  const completeMutation = useMutation({
    mutationFn: (order: PurchaseOrder) =>
      purchaseOrderApi.complete(order._id, {
        items: order.items.map((i) => ({
          productId:
            typeof i.productId === "string"
              ? i.productId
              : String((i.productId as { _id?: string })._id ?? i.productId),
          qtyReceived: i.qtyOrdered,
        })),
        paidAmount: order.paidAmount,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchase-orders"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });

  const payDebtMutation = useMutation({
    mutationFn: () =>
      paymentApi.settleDebt({
        partyType: "provider",
        partyId: providerId,
        amount: debtPayAmount,
        method: "cash",
        note:
          debtPayNote ||
          `Thanh toán công nợ NCC ${selectedProvider?.name ?? ""}`,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      setDebtPayAmount(0);
      setDebtPayNote("");
    },
  });

  const handleCreate = async () => {
    const activeItems = items.filter((i) => i.productId);
    if (activeItems.length === 0) {
      throw new Error("Vui lòng chọn ít nhất một sản phẩm!");
    }
    await createMutation.mutateAsync({
      providerId,
      items: activeItems,
      paidAmount,
    });
  };

  return {
    providerId,
    paidAmount,
    setPaidAmount,
    debtPayAmount,
    setDebtPayAmount,
    debtPayNote,
    setDebtPayNote,
    items,
    providers,
    filteredProducts,
    orders,
    ordersLoading,
    selectedProvider,
    grandTotal,
    handleProviderChange,
    updateLine,
    addLine,
    removeLine,
    handleCreate,
    createMutation,
    completeMutation,
    payDebtMutation,
  };
}
