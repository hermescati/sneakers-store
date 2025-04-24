'use client'

import routes from '@/lib/routes'
import { ActiveIndicator, BreadcrumbItem, SelectedSize } from '@/types'
import { Product } from '@/types/payload'
import { cn } from '@/utils'
import { getProductInfo, getProductSlugs } from '@/utils/product'
import { useEffect, useRef, useState } from 'react'
import Breadcrumbs from '../base/Breadcrumbs'
import ProductCarousel from './base/ProductCarousel'
import ProductDetails from './base/ProductDetails'
import ProductPricing from './base/ProductPricing'
import ProductSizes from './base/ProductSizes'

const TABS = ['Details', 'Reviews']

const ProductPage = ({ product }: { product: Product }) => {
  const [selectedSize, setSelectedSize] = useState<SelectedSize>(null)

  const [activeTab, setActiveTab] = useState<number>(0)
  const [activeIndicator, setActiveIndicator] = useState<ActiveIndicator>({
    left: 0,
    width: 0
  })
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const { brand, model, collaboration, images } = getProductInfo(product)
  const { brandSlug, modelSlug, collabSlug } = getProductSlugs(product)

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Sneakers', href: routes.products.home },
    {
      label: `${brand} Shoes`,
      href: `${routes.products.home}?brand=${brandSlug}`
    },
    collaboration
      ? {
          label: `${collaboration}`,
          href: `${routes.products.home}?brand=${brand}&collaboration=${collabSlug}`
        }
      : {
          label: `${model}`,
          href: `${routes.products.home}?brand=${brand}&model=${modelSlug}`
        },
    { label: `${product.nickname}` }
  ]

  useEffect(() => {
    if (activeTab !== null && tabRefs.current[activeTab]) {
      const { offsetLeft, offsetWidth } = tabRefs.current[activeTab]!
      setActiveIndicator({ left: offsetLeft, width: offsetWidth })
    }
  }, [activeTab])

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs items={breadcrumbs} className="hidden sm:block" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 lg:gap-x-8 xl:gap-x-12">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="lg:hidden">
            <ProductPricing product={product} selectedSize={selectedSize} />
          </div>
          <ProductCarousel images={images} />
        </div>

        <div className="flex flex-col gap-4 xl:gap-8 lg:justify-between lg:col-span-1">
          <div className="hidden lg:block">
            <ProductPricing product={product} selectedSize={selectedSize} />
          </div>
          <ProductSizes
            product={product}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
        </div>
      </div>

      <div>
        <div className="relative mt-2 lg:mt-4">
          <div className="flex gap-x-4 border-b border-border">
            {TABS.map((tab, index) => (
              <button
                key={tab}
                ref={(el) => {
                  tabRefs.current[index] = el
                }}
                onClick={() => setActiveTab(index)}
                className={cn('px-4 py-3 font-semibold', {
                  'text-primary-500': activeTab !== index
                })}
              >
                {tab}
              </button>
            ))}
          </div>

          <span
            className="absolute bottom-0 h-[0.2rem] rounded-full bg-foreground transition-all duration-300 ease-in-out"
            style={{
              left: `${activeIndicator.left}px`,
              width: `${activeIndicator.width}px`
            }}
          />
        </div>

        <div className="mt-2">
          {activeTab === 0 ? (
            <ProductDetails product={product} />
          ) : (
            <p>Reviews section here</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductPage
