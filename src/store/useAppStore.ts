import { create } from "zustand";

type ModalState = {
  open: boolean;
  mode: "create" | "edit";
  resourceId: string | null;
};

type AppState = {
  productModal: ModalState;
  providerModal: ModalState;
  categoryFilter: string;
  statusFilter: string;
  poSelectedId: string | null;
  soSelectedId: string | null;
  openProductModal: (mode?: "create" | "edit", id?: string | null) => void;
  closeProductModal: () => void;
  openProviderModal: (mode?: "create" | "edit", id?: string | null) => void;
  closeProviderModal: () => void;
  setCategoryFilter: (value: string) => void;
  setStatusFilter: (value: string) => void;
  setPoSelectedId: (id: string | null) => void;
  setSoSelectedId: (id: string | null) => void;
};

const defaultModal = (): ModalState => ({
  open: false,
  mode: "create",
  resourceId: null,
});

export const useAppStore = create<AppState>((set) => ({
  productModal: defaultModal(),
  providerModal: defaultModal(),
  categoryFilter: "",
  statusFilter: "",
  poSelectedId: null,
  soSelectedId: null,
  openProductModal: (mode = "create", id = null) =>
    set({ productModal: { open: true, mode, resourceId: id } }),
  closeProductModal: () => set({ productModal: defaultModal() }),
  openProviderModal: (mode = "create", id = null) =>
    set({ providerModal: { open: true, mode, resourceId: id } }),
  closeProviderModal: () => set({ providerModal: defaultModal() }),
  setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setPoSelectedId: (poSelectedId) => set({ poSelectedId }),
  setSoSelectedId: (soSelectedId) => set({ soSelectedId }),
}));
