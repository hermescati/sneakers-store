'use client'

import { useCartStore } from '@/stores/cartStore'
import { cn } from '@/utils'
import { useMediaQuery } from 'usehooks-ts'
import Link from '../base/Link'
import CartItem from './CartItem'

interface CartListProps {
  compact?: boolean
}

const CartList = ({ compact = false }: CartListProps) => {
  const { items, removeItem } = useCartStore()
  const isMobile = useMediaQuery('(max-width: 767px)')

  return (
    <>
      <h2 className="sr-only">Items in your shopping cart</h2>
      <ul
        className={cn(
          compact || isMobile
            ? "pb-6 md:pb-0 flex flex-col divide-y divide-border overflow-y-auto"
            : "md:pt-4 pb-8 lg:mb-0 md:grid md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 md:gap-6",
        )}>
        {items.map(({ product, size }, index) => (
          <Link
            key={`${product.id}-${size?.size}`}
            href={compact ? "" : `/sneakers/${product.id}`}>
            <CartItem
              index={index}
              product={product}
              size={size}
              compact={compact || isMobile}
              onRemove={() => removeItem(product.id, size)}
            />
          </Link>
        ))}
      </ul>
    </>
  )
}

export default CartList
