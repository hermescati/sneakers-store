'use client'

import Icon from '@/components/base/Icon'
import { SelectedSize } from '@/types'
import { Product } from '@/types/payload'
import { formatPrice } from '@/utils'
import { getProductInfo, getProductPrice } from '@/utils/product'
import BrandLogo from './BrandLogo'

interface ProductDetailsProps {
  product: Product
  selectedSize: SelectedSize
}

const ProductPricing = ({ product, selectedSize }: ProductDetailsProps) => {
  const { brand, model } = getProductInfo(product)
  const { basePrice, finalPrice } = getProductPrice(product, selectedSize)

  return (
    <div className="flex flex-col gap-y-4">
      <div className="leading-snug">
        <span className="inline-flex items-center gap-2 text-lg text-primary-600">
          <BrandLogo brand={brand} />
          <h3 className="font-medium">{brand}</h3>
        </span>
        <h1 className="text-2xl font-bold 2xl:text-3xl">{model}</h1>
        <h2 className="font-medium 2xl:text-lg">{product.nickname}</h2>
      </div>

      <div className="flex flex-col gap-y-1">
        <div className="flex items-baseline gap-x-2">
          <h1 className="text-2xl font-bold md:text-3xl">{formatPrice(finalPrice)}</h1>
          {finalPrice !== basePrice && (
            <span className="font-medium text-primary-600 line-through">
              {formatPrice(basePrice)}
            </span>
          )}
        </div>

        {!!selectedSize && selectedSize.quantity <= 2 && (
          <p className="inline-flex items-center gap-x-1 font-semibold text-secondary dark:text-secondary-700">
            <Icon icon="ph:fire-simple-duotone" className="text-xl" />
            <span>Hurry up! Only {!!selectedSize && selectedSize.quantity} in stock.</span>
          </p>
        )}
      </div>
    </div>
  )
}

export default ProductPricing
