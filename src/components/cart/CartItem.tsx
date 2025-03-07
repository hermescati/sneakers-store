'use client'

import { SIZING_CATEGORY_OPTIONS } from '@/lib/options'
import { SelectedSize } from '@/types'
import { Product } from '@/types/payload'
import { getProductInfo, getProductPrice } from '@/utils/product'
import CompactCartItem from './base/CompactCartItem'
import DetailedCartItem from './base/DetailedCartItem'

interface CartItemProps {
  product: Product
  size: SelectedSize
  index: number
  compact?: boolean
  onRemove: () => void
}

const CartItem = ({
  product,
  index,
  size,
  compact,
  onRemove
}: CartItemProps) => {
  const { thumbnail } = getProductInfo(product)
  const { finalPrice } = getProductPrice(product)
  const category = SIZING_CATEGORY_OPTIONS.find((o) => o.value === product.size_category)?.label as string

  const handleOnRemove = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation()
    event.preventDefault()
    onRemove()
  }

  return (
    <>
      {compact ? (
        <CompactCartItem
          index={index}
          name={product.nickname}
          category={category}
          size={size?.size as number}
          price={finalPrice}
          thumbnail={thumbnail}
          onRemove={handleOnRemove}
        />
      ) : (
        <DetailedCartItem
          index={index}
          name={product.nickname}
          nickname={product.nickname}
          category={category}
          size={size?.size as number}
          discountedPrice={finalPrice}
          basePrice={size?.price as number}
          thumbnail={thumbnail}
          onRemove={handleOnRemove}
        />
      )}
    </>
  )
}

export default CartItem
