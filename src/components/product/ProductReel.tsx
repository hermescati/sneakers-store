import { Product } from '@/types/payload'
import { cn } from '@/utils'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import ProductCard from './ProductCard'

interface ProductReelProps {
  products: Product[]
  title?: string
  href?: string
  className?: string
}

const ProductReel = ({
  products,
  title,
  href,
  className
}: ProductReelProps) => {
  return (
    <section className="flex flex-col gap-4">
      {/* Header */}
      {title && (
        <div className="flex items-center justify-start gap-3">
          <div className="max-w-2xl lg:max-w-4xl">
            <h2 className="font-bold text-xl">{title}</h2>
          </div>
          {href && (
            <Link href={href}>
              <Icon icon="solar:arrow-right-linear" height="1.5rem" />
            </Link>
          )}
        </div>
      )}

      {/* Cards */}
      <ul
        className={cn(
          className
            ? className
            : 'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6'
        )}
      >
        {products.map((product, index) => (
          <li key={product.id}>
            <ProductCard product={product} index={index} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProductReel
