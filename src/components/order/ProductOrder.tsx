'use client'

import { Product } from '@/types/payload'
import {
  capitalizeFirstLetter,
  formatPrice,
  getProductInfo,
  getThumbnailImage
} from '@/utils'
import Image from 'next/image'
import { useMediaQuery } from 'usehooks-ts'

interface ProductOrderProps {
  product: Product
  size: number
  price: number
}

const ProductOrder = ({ product, size, price }: ProductOrderProps) => {
  const { brand, model } = getProductInfo(product)
  const category = capitalizeFirstLetter(product.size_category)
  const imageUrl = getThumbnailImage(product)

  const isTablet = useMediaQuery('(min-width: 768px)')

  return (
    <div className="flex items-center gap-6 py-4">
      <div className="aspect-square md:aspect-video">
        <Image
          alt={product.name || 'order item image'}
          src={imageUrl}
          height={80}
          width={isTablet ? 140 : 120}
          className="h-full w-full object-contain rounded-md"
        />
      </div>

      <div className="flex w-full justify-between gap-x-6">
        <div className="flex flex-col">
          <h5 className="font-semibold md:text-lg">{product.nickname}</h5>
          <div className="lg:flex items-center gap-1 text-primary-600 text-md">
            <span>{brand}</span> - <span>{model}</span>
          </div>
          <div className="text-primary-600 text-md">
            {category} (US) - {size}
          </div>
        </div>

        <h5 className="font-semibold md:text-lg">{formatPrice(price)}</h5>
      </div>
    </div>
  )
}

export default ProductOrder
