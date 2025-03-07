'use client'

import { Product } from '@/types/payload'
import { cn } from '@/utils'
import { Icon } from '@iconify/react'
import Link from '../base/Link'
import ProductCard from './ProductCard'
import ProductReelSkeleton from './skeletons/ProductReelSkeleton'

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
  if (!products || !products.length) return <ProductReelSkeleton title={title} className={className} />

  return (
    <section className="flex flex-col gap-3">
      {/* TODO: Change the icon and add a small animation that the arrow is moving when hovering */}
      {title && (
        <Link href={href} className="flex items-center justify-start gap-3">
          <h2 className="font-bold text-xl">{title}</h2>
          <Icon icon="solar:arrow-right-linear" height="1.5rem" />
        </Link>
      )}

      <ul className={cn(className ?? 'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6')}>
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
