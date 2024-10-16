import Accordion, { AccordionItem } from '@/components/base/Accordion'
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
        'h-full grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8 px-6 py-4 bg-primary-100 rounded-2xl',
        { '3xl:flex 3xl:justify-between': hasDescription }
      )}
    >
      {productInfo.map((data, index) => (
        <li
          key={index}
          className={cn('flex items-start', {
            'col-span-2 md:col-span-1': data.label === 'Colorway',
            'hidden md:block': data.label === 'Gender'
          })}
        >
          <div className="flex flex-col">
            <span className="font-semibold text-md text-primary-500">
              {data.label}
            </span>
            <span className="font-medium text-primary-700">{data.value}</span>
          </div>
        </li>
      ))}
    </ul>
  )

  const renderAccordions = () => (
    <>
      <div className="hidden lg:flex lg:gap-x-10">
        <div className="lg:w-[60%] xl:w-2/3">
          {hasDescription ? (
            <>
              <h4 className="py-3 font-semibold text-lg">
                {accordionItems[0].title}
              </h4>
              <p className="py-1 bg-background text-primary-700 text-justify text-md sm:text-base leading-7">
                {accordionItems[0].content}
              </p>
            </>
          ) : (
            renderProductInfo()
          )}
        </div>
        <div className="lg:w-[40%] xl:w-1/3">
          <Accordion items={accordionItems.slice(1)} activeIndex={0} />
        </div>
      </div>
      <div className="lg:hidden">
        <Accordion items={accordionItems} />
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

// {/* Policies */}
// <div className="flex flex-col rounded-2xl border border-primary-300 mt-6 divide-y divide-primary-300">
//   {/* Free Returns */}
//   <div className="px-5 py-4">
//     <h2 className="flex items-center gap-2 font-bold text-lg">
//       <Icon icon="fad:undo" className="text-2xl" />
//       Free Returns
//     </h2>
//     <p className="text-md text-primary-600 mt-1">
//       30 day returns for any reason.
//     </p>
//   </div>

//   {/* Shipping & Delivery */}
//   <div className="px-5 py-4">
//     <h2 className="flex items-center gap-2 font-bold text-lg">
//       <Icon icon="hugeicons:delivery-truck-01" className="text-2xl" />
//       Shipping & Delivery
//     </h2>
//     <p className="text-md text-primary-600 mt-1">
//       Orders are delivered on business days (Monday - Friday) excluding
//       public holidays.
//     </p>
//   </div>
// </div>
