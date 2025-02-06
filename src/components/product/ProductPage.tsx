'use client'

import { BreadcrumbItem, ProductSize } from '@/types'
import { Product } from '@/types/payload'
import { getProductInfo } from '@/utils'
import { useState } from 'react'
import Breadcrumbs from '../base/Breadcrumbs'
import ImageSlider from '../slider/ImageSlider'
import ProductDetails from './base/ProductDetails'
import ProductInfo from './base/ProductInfo'
import ProductSizes from './base/ProductSizes'

const ProductPage = ({ product }: { product: Product }) => {
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null)

  const { brand, model } = getProductInfo(product)
  const imageUrls = product.images
    .map(({ image }) => (typeof image === 'string' ? image : image.url))
    .filter(Boolean) as string[]

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Sneakers', href: '/sneakers' },
    { label: `${brand} Shoes`, href: `/sneakers?brand=${brand}` },
    { label: `${model}`, href: `/sneakers?brand=${brand}&model=${model}` },
    { label: `${product.nickname}` }
  ]

  return (
    <>
      <div className="flex flex-col gap-y-6 lg:flex-row lg:gap-x-8">
        <div className="flex flex-col gap-4 lg:w-[55%] xl:w-2/3">
          <Breadcrumbs items={breadcrumbs} className="hidden sm:block" />
          <div className="lg:hidden">
            <ProductDetails product={product} selectedSize={selectedSize} />
          </div>
          <ImageSlider urls={imageUrls} />
        </div>

        <div className="flex flex-col gap-4 lg:w-[45%] lg:justify-between xl:w-1/3 xl:gap-8">
          <div className="hidden lg:block">
            <ProductDetails product={product} selectedSize={selectedSize} />
          </div>
          <ProductSizes
            product={product}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
        </div>
      </div>

      <ProductInfo product={product} />
    </>
  )
}

export default ProductPage
