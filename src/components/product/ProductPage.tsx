'use client'

import { PRODUCT_PAGE_TABS } from '@/lib/options'
import { ActiveIndicator, BreadcrumbItem, SelectedSize, SelectOption } from '@/types'
import { Product } from '@/types/payload'
import { cn } from '@/utils'
import { getProductBreadcrumbs, getProductInfo } from '@/utils/product'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import Breadcrumbs from '../base/Breadcrumbs'
import ProductCarousel from './base/ProductCarousel'
import ProductDetails from './base/ProductDetails'
import ProductPricing from './base/ProductPricing'
import ProductReviews from './base/ProductReviews'
import ProductSizes from './base/ProductSizes'

const ProductPage = ({ product }: { product: Product }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedSize, setSelectedSize] = useState<SelectedSize>(null)
  const [indicatorStyle, setIndicatorStyle] = useState<ActiveIndicator>({ left: 0, width: 0 })
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const { images } = getProductInfo(product)
  const breadcrumbs: BreadcrumbItem[] = useMemo(() => getProductBreadcrumbs(product), [product])

  const activeTab = useMemo(() => {
    const tabParam = searchParams.get('tab')
    const index = PRODUCT_PAGE_TABS.findIndex(
      tab => tab.value.toLowerCase() === tabParam?.toLowerCase()
    )
    return index !== -1 ? index : 0
  }, [searchParams])

  const handleTabChange = (selectedTab: SelectOption['value'], index: number) => {
    if (index === activeTab) return
    const updatedParams = new URLSearchParams(searchParams.toString())
    updatedParams.set('tab', selectedTab)
    router.replace(`?${updatedParams.toString()}`, { scroll: false })
  }

  useLayoutEffect(() => {
    const el = tabRefs.current[activeTab ?? 0]
    if (el) {
      setIndicatorStyle({
        left: el.offsetLeft,
        width: el.offsetWidth
      })
    }
  }, [activeTab])

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs items={breadcrumbs} className="hidden sm:block" />

      <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-3 lg:gap-x-8 xl:gap-x-12">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="lg:hidden">
            <ProductPricing product={product} selectedSize={selectedSize} />
          </div>
          <ProductCarousel images={images} />
        </div>

        <div className="flex flex-col gap-4 lg:col-span-1 lg:justify-between xl:gap-8">
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
        <div className="relative mt-2">
          <div className="flex gap-x-4 border-b border-border">
            {PRODUCT_PAGE_TABS.map((tab, index) => (
              <button
                key={tab.value}
                ref={el => {
                  tabRefs.current[index] = el
                }}
                onClick={() => handleTabChange(tab.value, index)}
                className={cn('px-4 py-3 font-semibold', {
                  'text-primary-500': activeTab !== index
                })}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span
            className="absolute bottom-0 h-1 rounded-full bg-foreground transition-all duration-300 ease-in-out"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`
            }}
          />
        </div>

        {activeTab === 0 ? (
          <ProductDetails product={product} />
        ) : (
          <ProductReviews product={product} />
        )}
      </div>
    </div>
  )
}

export default ProductPage
