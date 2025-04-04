'use client'

import { Accordion } from '@/components/base/Accordion'
import { SIZING_CATEGORY_OPTIONS } from '@/lib/options'
import { AccordionItem } from '@/types'
import { Product } from '@/types/payload'
import { cn, formatPrice } from '@/utils'
import { getProductInfo } from '@/utils/product'
import { format } from 'date-fns'
import { useState } from 'react'

interface ProductInfoProps {
  product: Product
}

const ProductDetails = ({ product }: ProductInfoProps) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState<boolean>(false)

  const { brand } = getProductInfo(product)

  const productInfo = [
    { label: 'Manufactured SKU', value: product.sku },
    { label: 'Brand', value: brand },
    { label: 'Colorway', value: product.colorway || '-' },
    { label: 'Gender', value: SIZING_CATEGORY_OPTIONS.find((o) => o.value === product.size_category)?.label },
    { label: 'Retail Price', value: formatPrice(product.retail_price) || '-' },
    { label: 'Release Date', value: format(new Date(product.release_date as string), 'MM/dd/yyyy') || '-' }
  ]

  const accordionItems: AccordionItem[] = [
    {
      title: 'Authenticity Guarantee',
      icon: 'solar:shield-check-outline',
      content: "Authenticity is the foundation of our business, and every item we sell is inspected by our expert team. Our authenticators are the most experienced and highly trained in the business. In addition, we source our products only from trusted suppliers."
    },
    {
      title: 'In Stock & Ready to Ship',
      icon: 'hugeicons:delivery-truck-01',
      content: "We hold and authenticate inventory on site so you don’t have to wait to receive product from a 3rd party seller. Processing and order verification typically occur 1-3 business days prior to shipping."
    },
    {
      title: 'Returns Accepted',
      icon: 'fad:undo',
      content: "Our straightforward returns policy ensures a hassle-free experience. Reach out to our support team, and we'll guide you through the process, prioritizing your peace of mind."
    }
  ]

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 lg:gap-x-8 xl:gap-x-12">
      <div className='lg:col-span-2 flex flex-col gap-6'>
        {!!product.description &&
          <div>
            <h4 className="py-2 font-semibold">Description</h4>
            <p className="relative text-primary-700 dark:text-primary-800 text-justify transition-all duration-500">
              <span className={cn('leading-relaxed', { 'max-h-32 overflow-hidden block line-clamp-5': !isDescriptionExpanded })}>
                {product.description}
              </span>
              <span className={cn(
                'absolute inset-x-0 bottom-0 transition-all duration-500 ease-in-out',
                { 'h-32 bg-gradient-to-b from-transparent to-background': !isDescriptionExpanded }
              )} />
            </p>

            <button
              onClick={() => setIsDescriptionExpanded((prev) => !prev)}
              className={cn(
                'w-fit py-2 font-medium text-md text-primary-700 bg-transparent border-none cursor-pointer underline underline-offset-4',
                { 'mt-2': isDescriptionExpanded }
              )}>
              {isDescriptionExpanded ? 'Show Less' : 'Show More'}
            </button>
          </div>
        }

        <ul className='h-full grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8 px-6 py-4 bg-primary-100/50 rounded-xl'>
          {productInfo.map((data, index) => (
            <li key={index}>
              <span className="flex flex-col leading-snug font-medium">
                <p className="font-medium text-md text-primary-600">{data.label}</p>
                <p className="font-semibold text-primary-700 dark:text-primary-800">{data.value}</p>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className='lg:mt-2 lg:col-span-1'>
        <Accordion
          activeIndex={0}
          items={accordionItems} />
      </div>
    </section>
  )
}

export default ProductDetails