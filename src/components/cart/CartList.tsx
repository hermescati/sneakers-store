'use client'

import { useCart } from '@/hooks/use-cart'
import { cn } from '@/utils'
import { useMediaQuery } from 'usehooks-ts'
import Link from '../base/Link'
import CartItem from './CartItem'

const CartList = () => {
  const { items: cartItems, removeItem } = useCart()
  const isMobile = useMediaQuery('(max-width: 767px)')

  const items = Array.from({ length: 15 }, (_, i) => ({
    ...cartItems[i % cartItems.length], // Cycle through real cart items
  }))

  return (
    <>
      <h2 className="sr-only">Items in your shopping cart</h2>
      <ul
        className={cn(
          "py-4 md:mb-4 lg:mb-0 md:grid md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 md:gap-6",
          { "divide-y divide-border": !!items.length && isMobile }
        )}>
        {items.map(({ product, size }, index) => (
          <li key={`${product.id}-${size.size}`}>
            <Link href={`/sneakers/${product.id}`}>
              <CartItem
                href={`${product.id}`}
                product={product}
                size={size}
                compact={isMobile}
                index={index}
                onRemove={() => removeItem(product.id, size)}
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default CartList
