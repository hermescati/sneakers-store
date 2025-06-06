'use client'

import routes from '@/lib/routes'
import { ProductTileActionEvent } from '@/types'
import { Product } from '@/types/payload'
import { formatPrice } from '@/utils'
import { getProductInfo, getProductPrice } from '@/utils/product'
import Image from 'next/image'
import React from 'react'
import Link from '../base/Link'
import IconButton from '../base/button/IconButton'
import BrandLogo from './base/BrandLogo'
import SizeDrawer from './base/SizeDrawer'

// TODO: Use the same component for the cart
interface ProductTileProps {
  product: Product
  onAction: ({ product, size }: ProductTileActionEvent) => void
  onRemove: (productId: Product['id']) => void
}

const ProductTile = ({ product, onAction, onRemove }: ProductTileProps) => {
  const { brand, model, thumbnail } = getProductInfo(product)
  const { finalPrice, basePrice } = getProductPrice(product)

  const isDiscounted = finalPrice !== basePrice

  const handleOnAction = (size: number) => onAction({ product, size })

  const handleOnRemove = (e: React.MouseEvent) => {
    e.preventDefault()
    onRemove(product.id)
  }

  return (
    <Link
      href={routes.products.product(product.slug)}
      className="group flex w-full gap-x-6 sm:flex-col"
    >
      <div className="relative flex aspect-square w-2/3 rounded-2xl bg-primary-100 dark:bg-primary-100 sm:w-full lg:aspect-video">
        <Image
          alt={`${product.nickname} thumbnail`}
          src={thumbnail.url!}
          width={thumbnail.width!}
          height={thumbnail.height!}
          loading="lazy"
          className="object-contain object-center transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <IconButton
          icon="solar:heart-bold"
          className="absolute left-2 top-2 hidden border border-border bg-background text-secondary hover:bg-background active:bg-background md:block"
          onClick={handleOnRemove}
        />
      </div>

      <div className="flex w-full flex-col justify-between gap-2 py-2.5 lg:gap-2.5">
        <div className="flex flex-col gap-0.5">
          <h3 className="line-clamp-1 text-lg font-semibold lg:text-base xl:text-lg">
            &quot;{product.nickname}&quot;
          </h3>
          <p className="flex items-center gap-2 text-primary-600">
            <BrandLogo brand={brand} />
            <span className="text-md font-medium leading-none">{model}</span>
          </p>
        </div>

        <div className="flex items-end justify-between align-bottom">
          <div>
            {isDiscounted && (
              <p className="text-md leading-none text-primary-600 line-through">
                {formatPrice(basePrice)}
              </p>
            )}
            <p className="text-xl font-semibold">{formatPrice(finalPrice)}</p>
          </div>

          <div className="flex items-center gap-1 rounded-2xl">
            <SizeDrawer product={product} onSelect={handleOnAction} />
            <IconButton
              icon="solar:heart-bold"
              className="border border-border text-secondary md:hidden"
              onClick={handleOnRemove}
            />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductTile
