'use client'

import { ProductSize } from '@/types'
import { Product } from '@/types/payload'
import {
  calculatePrice,
  capitalizeFirstLetter,
  getThumbnailImage
} from '@/utils'
import Link from 'next/link'
import CompactCartItem from './base/CompactCartItem'
import DetailedCartItem from './base/DetailedCartItem'

interface CartItemProps {
  product: Product
  size: ProductSize
  index: number
  href?: string
  compact?: boolean
  onRemove: () => void
}

// TODO: Refactor this component
const CartItem = ({
  product,
  index,
  size,
  href,
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
      {href ? (
        <Link href={`/sneakers/${product.id}`}>
          {compact ? (
            <CompactCartItem
              index={index}
              name={product.name!}
              nickname={product.nickname!}
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
        </Link>
      ) : (
        <>
          {compact ? (
            <CompactCartItem
              index={index}
              name={product.name!}
              nickname={product.nickname!}
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
      )}
    </>
  )
}

export default CartItem
