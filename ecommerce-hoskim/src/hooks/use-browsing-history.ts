import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = { id: string; category: string };

type BrowsingHistory = {
  products: Product[];
  addItem: (product: Product) => void;
  clear: () => void;
};

const initialState: BrowsingHistory = {
  products: [],
  addItem: () => {},
  clear: () => {},
};

export const browsingHistoryStore = create<BrowsingHistory>()(
  persist(
    (set, get) => ({
      products: [],
      addItem: (product) => {
        const current = get().products;

        // حذف تکراری
        const filtered = current.filter((p) => p.id !== product.id);

        // اضافه کردن به ابتدای لیست
        const updated = [product, ...filtered].slice(0, 10);

        set({ products: updated });
      },
      clear: () => set({ products: [] }),
    }),
    {
      name: "browsingHistoryStore",
    }
  )
);

export default function useBrowsingHistory() {
  return browsingHistoryStore();
}
