'use client'

import routes from '@/lib/routes'
import { Product } from '@/types/payload'
import { cn, formatPrice } from '@/utils'
import { getProductInfo, getProductPrice } from '@/utils/product'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from '../base/Link'
import BrandLogo from './base/BrandLogo'
import ProductCardSkeleton from './skeletons/ProductCardSkeleton'

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

  if (!product || !isLoaded) return <ProductCardSkeleton />

  const { brand, model, thumbnail } = getProductInfo(product)
  const { basePrice, finalPrice } = getProductPrice(product)

  return (
    <Link
      href={`${routes.products.product(product.slug)}`}
      className={cn('group invisible h-full w-full cursor-pointer', {
        'animate-in fade-in-5 visible': isLoaded
      })}
    >
      <div className="flex flex-col gap-2">
        <div className="relative flex aspect-square items-center justify-center overflow-clip rounded-2xl bg-primary-100 dark:bg-primary-800 sm:aspect-video">
          <Image
            src={thumbnail.url!}
            alt={`${product.nickname} thumbnail`}
            height={thumbnail.height!}
            width={thumbnail.width!}
            className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>

        <div className="flex w-full flex-col gap-0.5 lg:gap-0">
          <h3 className="font-semibold">{product.nickname}</h3>

          <span className="flex items-center gap-1 text-primary-500">
            <BrandLogo brand={brand} />
            <p className="text-md font-medium leading-tight">{model}</p>
          </span>

          <div className="flex items-baseline gap-2 lg:mt-1">
            <span className="text-lg font-bold">{formatPrice(finalPrice)}</span>
            {finalPrice !== basePrice && (
              <span className="text-md text-primary-600 line-through">
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
