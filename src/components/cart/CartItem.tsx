'use client'

import { ProductSize } from '@/types'
import { Product } from '@/types/payload'
import {
  calculatePrice,
  capitalizeFirstLetter,
  getThumbnailImage
} from '@/utils'
import CompactCartItem from './base/CompactCartItem'
import DetailedCartItem from './base/DetailedCartItem'

interface CartItemProps {
  product: Product
  size: ProductSize
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
  const isDiscounted = size.discount

  const productPrice = isDiscounted ? calculatePrice(size) : size.price
  const category = capitalizeFirstLetter(product.size_category)
  const thumbnail = getThumbnailImage(product)

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
          name={product.name!}
          category={category}
          size={size.size}
          price={productPrice}
          thumbnail={thumbnail}
          onRemove={handleOnRemove}
        />
      ) : (
        <DetailedCartItem
          index={index}
          name={product.name!}
          nickname={product.nickname!}
          category={category}
          size={size.size}
          discountedPrice={productPrice}
          basePrice={size.price}
          thumbnail={thumbnail}
          onRemove={handleOnRemove}
        />
      )}
    </>
  )
}

export default CartItem
