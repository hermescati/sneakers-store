'use client'

import routes from '@/lib/routes'
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
            ? 'flex flex-col divide-y divide-border overflow-y-auto pb-6 md:pb-0'
            : 'pb-8 md:grid md:grid-cols-3 md:gap-6 md:pt-4 lg:mb-0 lg:grid-cols-2 xl:grid-cols-3'
        )}
      >
        {items.map(({ product, size }, index) => (
          <Link
            key={`${product.id}-${size?.size}`}
            href={compact ? '' : routes.products.product(product.slug)}
          >
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
