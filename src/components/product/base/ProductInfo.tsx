import { Accordion, AccordionItem } from '@/components/base/Accordion'
import { Product } from '@/types/payload'
import { capitalizeFirstLetter, cn, formatPrice, getProductInfo } from '@/utils'
import { format } from 'date-fns'

interface ProductInfoProps {
  product: Product
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { brand } = getProductInfo(product)

  const hasDescription = !!product.description

  const releaseDate = product.release_date
    ? format(new Date(product.release_date as string), 'MM/dd/yyyy')
    : '-'

  const productInfo = [
    { label: 'Manufactured SKU', value: product.sku },
    { label: 'Brand', value: brand },
    { label: 'Colorway', value: product.colorway },
    { label: 'Gender', value: capitalizeFirstLetter(product.size_category) },
    { label: 'Retail Price', value: formatPrice(product.retail_price) },
    { label: 'Release Date', value: releaseDate }
  ]

  const accordionItems: AccordionItem[] = [
    {
      title: 'Sneaker Description',
      icon: 'hugeicons:running-shoes',
      content: product.description as string
    },
    {
      title: 'Authenticity Guarantee',
      icon: 'solar:shield-check-outline',
      content:
        "Every sneaker we sell undergoes meticulous inspection by our expert team, comprised of the industry's most seasoned and highly trained authenticators."
    },
    {
      title: 'Returns Accepted',
      icon: 'fad:undo',
      content:
        "Our straightforward returns policy ensures a hassle-free experience. Reach out to our support team, and we'll guide you through the process, prioritizing your peace of mind."
    }
  ]

  const renderProductInfo = () => (
    <ul
      className={cn(
        "h-full grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8 px-6 py-4 bg-primary-100/50 rounded-xl",
        { "2xl:flex 2xl:justify-between": hasDescription }
      )}
    >
      {productInfo.map((data, index) => (
        <li key={index}>
          <div className="flex flex-col leading-snug">
            <span className="font-medium text-md text-primary-600">
              {data.label}
            </span>
            <span className="font-medium text-primary-800">{data.value}</span>
          </div>
        </li>
      ))}
    </ul>
  )

  const renderAccordions = () => (
    <>
      <div className="hidden lg:flex lg:gap-x-6">
        {hasDescription ? (
          <div className="lg:w-[57%] xl:w-[69%]">
            <h4 className="py-2 font-semibold text-lg">
              {accordionItems[0].title}
            </h4>
            <p className="text-primary-700 dark:text-primary-800 text-justify text-md sm:text-base leading-relaxed">
              {accordionItems[0].content}
            </p>
          </div>
        ) : (
          renderProductInfo()
        )}
        <div className="lg:w-[43%] xl:w-[33%]">
          <Accordion
            activeIndex={0}
            items={accordionItems.slice(1)}
            titleClass="rounded-xl hover:bg-primary-100/50 font-semibold text-lg"
            contentClass="dark:text-primary-800"
            iconClass="text-2xl" />
        </div>
      </div>

      <div className="lg:hidden">
        <Accordion
          items={accordionItems}
          titleClass="rounded-xl hover:bg-primary-100/50 font-semibold text-lg"
          contentClass="dark:text-primary-800"
          iconClass="text-2xl" />
      </div>
    </>
  )

  return (
    <div className="flex flex-col gap-6">
      <div className={cn({ 'lg:hidden': !hasDescription })}>
        {renderProductInfo()}
      </div>
      {renderAccordions()}
    </div>
  )
}

export default ProductInfo