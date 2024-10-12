'use client'

import { Product } from '@/types/payload'
import {
  calculateMinPrices,
  cn,
  formatPrice,
  getProductInfo,
  getThumbnailImage
} from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ProductSkeleton from '../skeletons/ProductSkeleton'
import BrandLogo from './BrandLogo'

interface ProductCardProps {
  product: Product
  index: number
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, index * 75)

    return () => clearTimeout(timer)
  }, [index])

  if (!product || !isLoaded) return <ProductSkeleton />

  const { brand } = getProductInfo(product)
  const { basePrice, discountedPrice } = calculateMinPrices(product)
  const thumbnail = getThumbnailImage(product)

  const productPrice = discountedPrice ? discountedPrice : basePrice

  return (
    <Link
      href={`/sneakers/${product.id}`}
      className={cn('invisible h-full w-full cursor-pointer group', {
        'visible animate-in fade-in-5': isLoaded
      })}
    >
      <div className="flex flex-col gap-2 w-full">
        {/* Thumbnail */}
        <div className="relative px-5 bg-zinc-100 rounded-2xl aspect-square sm:aspect-auto">
          <Image
            alt={`${product.nickname} thumbnail`}
            src={thumbnail}
            width={400}
            height={300}
            loading="eager"
            priority
            className="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col gap-0.5 lg:gap-0 w-full">
          {/* Nickname */}
          <h3 className="font-semibold text-primary-800 line-clamp-1 text-lg lg:text-base">
            {product.nickname}
          </h3>

          {/* Brand & Model */}
          <span className="flex items-center gap-2 text-primary-600">
            <BrandLogo brand={brand} />
            <p className="text-md">{product.name}</p>
          </span>

          {/* Price */}
          <div className="flex items-baseline gap-2 lg:mt-1">
            <span className="font-semibold text-lg lg:text-base">
              {formatPrice(productPrice)}
            </span>
            {discountedPrice && (
              <span className="text-md line-through text-primary-600">
                {formatPrice(basePrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
