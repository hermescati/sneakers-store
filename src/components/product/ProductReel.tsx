import { Product } from '@/types/payload'
import { cn } from '@/utils'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import ProductCard from './ProductCard'

interface ProductReelProps {
  products: Product[]
  title: string
  href?: string
}

const ProductReel = ({ products, title, href }: ProductReelProps) => {
  return (
    <section className={cn('flex flex-col gap-4', { 'py-6': !!href })}>
      {/* Header */}
      <div className="flex items-center justify-start gap-3">
        <div className="max-w-2xl lg:max-w-4xl">
          {title && <h2 className="font-bold text-xl">{title}</h2>}
        </div>
        {href && (
          <Link href={href}>
            <Icon icon="solar:arrow-right-linear" height="1.5rem" />
          </Link>
        )}
      </div>

      {/* Cards */}
      <div className="flex items-center w-full">
        <ul className="w-full grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 md:gap-x-8 md:gap-y-6 lg:grid-cols-3 lg:gap-x-6 xl:grid-cols-6">
          {products.map((product, index) => (
            <li key={product.id}>
              <ProductCard product={product} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ProductReel
