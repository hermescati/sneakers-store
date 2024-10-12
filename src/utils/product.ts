import { CartItem } from '@/hooks/use-cart'
import { calculatePrice } from '.'

export function getCartTotal(cartItems: CartItem[]) {
  return cartItems.reduce((total, { size }) => {
    if (!size.stock) return total

    const price = calculatePrice(size)
    return price + total
  }, 0)
}
