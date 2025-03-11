import toast from '@/components/base/toast/Toast'
import { SelectedSize } from '@/types'
import { Product } from '@/types/payload'
import Stripe from 'stripe'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type CartItem = {
  product: Product
  size: SelectedSize
}

type CartState = {
  items: CartItem[]
  isOpen: boolean
  shipping: Stripe.ShippingRate | undefined
  discount: Stripe.PromotionCode | undefined
  addItem: (product: Product, size: SelectedSize) => void
  removeItem: (productId: Product['id'], size: SelectedSize) => void
  setShipping: (method: Stripe.ShippingRate) => void
  setDiscount: (discount: Stripe.PromotionCode) => void
  clearShipping: VoidFunction
  clearDiscount: VoidFunction
  clearCart: VoidFunction
  open: VoidFunction
  close: VoidFunction
}

export const useCartStore = create<CartState>()(
  persist((set) => ({
    items: [],
    isOpen: false,
    shipping: undefined,
    discount: undefined,
    addItem: (product, size) =>
      set((state) => {
        const itemExists = state.items.some((item) =>
          item.product.id === product.id && item.size?.size === size?.size
        )
        if (itemExists) {
          toast.warning('This product is already added to your cart.')
          return state
        }
        state.open()
        return { items: [...state.items, { product, size }] }
      }),
    removeItem: (id, size) =>
      set((state) => {
        const updatedItems = state.items.filter((item) =>
          item.product.id !== id && item.size !== size
        )
        return { items: updatedItems }
      }),
    setShipping: (shipping) =>
      set((state) => {
        const isSelected = state.shipping?.id === shipping.id
        if (isSelected) return state
        return { shipping: shipping }
      }),
    setDiscount: (discount) =>
      set((state) => {
        if (state.discount?.id === discount.id) return state
        toast.success('Discount was applied successfully.')
        return { discount }
      }),
    clearShipping: () => set({ shipping: undefined }),
    clearDiscount: () => set({ discount: undefined }),
    clearCart: () =>
      set({
        items: [],
        shipping: undefined,
        discount: undefined
      }),
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
  }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
