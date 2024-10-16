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

type CartState = {
  items: CartItem[]
  cartOpen: boolean
  shippingMethod: Stripe.ShippingRate | null
  discount: Stripe.Coupon | null
  addItem: (product: Product, size: ProductSize) => void
  removeItem: (productId: Product['id'], size: ProductSize) => void
  setDeliveryMethod: (method: Stripe.ShippingRate) => void
  setDiscount: (discount: Stripe.Coupon) => void
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
      cartOpen: false,
      shippingMethod: null,
      discount: null,
      addItem: (product, size) =>
        set((state) => {
          const itemExists = state.items.some(
            (item) =>
              item.product.id === product.id && item.size.size === size.size
          )

          if (itemExists) {
            toast.warning('This product is already added to your cart.')
            return state
          }

          state.openCart()
          return { items: [...state.items, { product, size }] }
        }),
      removeItem: (id, size) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.product.id !== id || item.size !== size
          )
        })),
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
