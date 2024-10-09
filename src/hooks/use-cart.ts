import { ProductSize } from "@/types";
import { Product } from "@/types/payload";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  product: Product;
  size: ProductSize;
};

type CartState = {
  items: CartItem[];
  cartOpen: boolean;
  addItem: (product: Product, size: ProductSize) => void;
  removeItem: (productId: Product["id"], size: ProductSize) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      cartOpen: false,
      addItem: (product, size) =>
        set((state) => {
          const itemExists = state.items.some(
            (item) =>
              item.product.id === product.id && item.size.size === size.size
          );

          if (itemExists) {
            toast.warning("This product is already added to your cart.");
            return state;
          }

          state.openCart();
          return {
            items: [...state.items, { product, size }],
          };
        }),
      removeItem: (id, size) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.product.id !== id || item.size !== size
          ),
        })),
      clearCart: () => set({ items: [] }),
      openCart: () => set({ cartOpen: true }),
      closeCart: () => set({ cartOpen: false }),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
