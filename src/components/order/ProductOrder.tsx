'use client'

import { SIZING_CATEGORY_OPTIONS } from '@/lib/options'
import { Product } from '@/types/payload'
import { formatPrice } from '@/utils'
import { getProductInfo } from '@/utils/product'
import Image from 'next/image'

interface ProductOrderProps {
  product: Product
  size: number
  price: number
}

const ProductOrder = ({ product, size, price }: ProductOrderProps) => {
  const { brand, model, thumbnail } = getProductInfo(product)

  return (
    <div className="flex items-center gap-6 py-4">
      <div className="relative aspect-square md:aspect-video">
        <Image
          alt={product.nickname || 'order item image'}
          src={thumbnail.url!}
          width={thumbnail.width!}
          height={thumbnail.height!}
          className="rounded-md object-contain"
        />
      </div>

      <div className="flex w-full justify-between gap-x-6">
        <div className="flex flex-col">
          <h5 className="font-semibold md:text-lg">{product.nickname}</h5>
          <div className="items-center gap-1 text-md text-primary-600 lg:flex">
            <span>{brand}</span> - <span>{model}</span>
          </div>
          <div className="text-md text-primary-600">
            {SIZING_CATEGORY_OPTIONS.find(o => o.value === product.size_category)?.label} (US) -{' '}
            {size}
          </div>
        </div>

        <h5 className="font-semibold md:text-lg">{formatPrice(price)}</h5>
      </div>
    </div>
  )
}

export default ProductOrder
