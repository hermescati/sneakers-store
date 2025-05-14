'use client'

import { Product } from '@/types/payload'
import { cn } from '@/utils'
import Icon from '../base/Icon'
import Link from '../base/Link'
import ProductCard from './ProductCard'
import ProductReelSkeleton from './skeletons/ProductReelSkeleton'

interface ProductReelProps {
  products: Product[]
  title?: string
  href?: string
  className?: string
}

const ProductReel = ({ products, title, href, className }: ProductReelProps) => {
  if (!products || !products.length)
    return <ProductReelSkeleton title={title} className={className} />

  return (
    <section className="flex flex-col gap-3">
      {title && (
        <Link href={href} className="group flex items-center justify-start gap-3">
          <h2 className="font-bold text-xl">{title}</h2>
          <Icon icon="flowbite:arrow-right-outline" className="text-2xl group-hover:animate-bump" />
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
