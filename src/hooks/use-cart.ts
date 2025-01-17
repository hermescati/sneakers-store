import { ProductSize } from '@/types'
import { Product } from '@/types/payload'
import { toast } from 'sonner'
import Stripe from 'stripe'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type CartItem = {
  product: Product
  size: ProductSize
}

const calculateCartTotal = (items: CartItem[]) => {
  return items.reduce((total, {size}) => {
    if (!size.stock) return total
    return total + size.price
  }, 0)
}

type CartState = {
  items: CartItem[]
  total: number
  cartOpen: boolean
  shippingMethod: Stripe.ShippingRate | null
  discount: Stripe.PromotionCode | null
  addItem: (product: Product, size: ProductSize) => void
  removeItem: (productId: Product['id'], size: ProductSize) => void
  setDeliveryMethod: (method: Stripe.ShippingRate) => void
  setDiscount: (discount: Stripe.PromotionCode) => void
  clearDeliveryMethod: () => void
  clearDiscount: () => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      total: 0,
      cartOpen: false,
      shippingMethod: null,
      discount: null,
      addItem: (product, size) =>
        set((state) => {
          const itemExists = state.items.some(
            (item) =>
              item.product.id === product.id && item.size.size === size.size
          );

          if (itemExists) {
            toast.warning('This product is already added to your cart.');
            return state;
          }

          const updatedItems = [...state.items, { product, size }];
          const updatedTotal = calculateCartTotal(updatedItems);

          state.openCart();
          return { items: updatedItems, total: updatedTotal };
        }),
      removeItem: (id, size) =>
        set((state) => {
          const updatedItems = state.items.filter(
            (item) => item.product.id !== id || item.size !== size
          );
          const updatedTotal = calculateCartTotal(updatedItems);

          return { items: updatedItems, total: updatedTotal };
        }),
      setDeliveryMethod: (method) =>
        set((state) => {
          const isSelected = state.shippingMethod?.id === method.id

          if (isSelected) return state

          return { shippingMethod: method }
        }),
      setDiscount: (discount) =>
        set((state) => {
          const isApplied = state.discount?.id === discount.id

          if (isApplied) return state
          toast.success('Discount was applied successfully.')

          return { discount: discount }
        }),
      clearDeliveryMethod: () => set({ shippingMethod: null }),
      clearDiscount: () => set({ discount: null }),
      clearCart: () => set({ items: [], shippingMethod: null, discount: null }),
      openCart: () => set({ cartOpen: true }),
      closeCart: () => set({ cartOpen: false })
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
