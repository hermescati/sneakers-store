'use client'

import { useCart } from '@/hooks/use-cart'
import { cn } from '@/utils'
import { useMediaQuery } from 'usehooks-ts'
import CartItem from './CartItem'

const CartList = () => {
  const { items, removeItem } = useCart()
  const isMobile = useMediaQuery('(max-width: 1023px)')

  return (
    <>
      <h2 className="sr-only">Items in your shopping cart</h2>
      <ul
        className={cn('lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-8', {
          'divide-y divide-primary-200 border-b border-t border-primary-200 lg:divide-y-0 lg:border-none':
            !!items.length
        })}
      >
        {items.map(({ product, size }, index) => (
          <li key={`${product.id}-${size.size}`}>
            <CartItem
              href={`${product.id}`}
              product={product}
              size={size}
              compact={isMobile}
              index={index}
              onRemove={() => removeItem(product.id, size)}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default CartList
