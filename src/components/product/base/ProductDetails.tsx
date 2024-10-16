import { ProductSize } from '@/types'
import { Product } from '@/types/payload'
import {
  calculateMinPrices,
  calculatePrice,
  cn,
  formatPrice,
  getProductInfo
} from '@/utils'
import { Icon } from '@iconify/react'
import BrandLogo from './BrandLogo'

interface ProductDetailsProps {
  product: Product
  selectedSize: ProductSize | null
}

const ProductDetails = ({ product, selectedSize }: ProductDetailsProps) => {
  const { brand } = getProductInfo(product)
  const { basePrice, discountedPrice } = calculateMinPrices(product)
  const productPrice = !!selectedSize ? calculatePrice(selectedSize) : null

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <div className="flex flex-col lg:gap-2">
        <div className="flex items-center gap-2 text-primary-600 text-md sm:text-base">
          <BrandLogo brand={brand} />
          <h3 className="font-medium">{brand}</h3>
        </div>

        <div className="flex flex-col">
          <h1 className="font-bold text-2xl lg:text-3xl">{product.name}</h1>
          <h2 className="font-medium text-xl">
            &quot;{product.nickname}&quot;
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {!!selectedSize && !!productPrice ? (
          <div className="flex items-baseline gap-1">
            <h1 className="font-semibold text-2xl lg:font-bold">
              {formatPrice(productPrice)}
            </h1>
            {selectedSize.discount && (
              <span className="line-through">
                {formatPrice(selectedSize.price)}
              </span>
            )}
          </div>
        ) : (
          <div className="flex items-baseline gap-1">
            <h1 className="font-semibold text-2xl lg:font-bold">
              {formatPrice(discountedPrice ? discountedPrice : basePrice)}
            </h1>
            <span>& up</span>
          </div>
        )}
        <div
          className={cn(
            'opacity-0 flex items-center gap-1 text-secondary font-semibold',
            { 'opacity-100': !!selectedSize && selectedSize.stock <= 3 }
          )}
        >
          <Icon icon="ph:fire-simple-duotone" height="1.25rem" />
          <span>
            Hurry up! Only {!!selectedSize && selectedSize.stock} in stock.
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
