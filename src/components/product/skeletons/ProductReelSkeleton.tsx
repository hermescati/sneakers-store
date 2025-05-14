import { cn } from '@/utils'
import ProductCardSkeleton from './ProductCardSkeleton'

interface ProductReelSkeletonProps {
  title?: string
  className?: string
}

const ProductReelSkeleton = ({ title, className }: ProductReelSkeletonProps) => {
  const productsArray: number[] = new Array(6).fill(0)

  return (
    <section className="flex flex-col gap-4">
      {title && (
        <div className="flex items-center justify-start gap-3">
          <div className="max-w-2xl lg:max-w-4xl">
            <h2 className="font-bold text-xl">{title}</h2>
          </div>
        </div>
      )}

      <ul
        className={cn(
          className ? className : 'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6'
        )}
      >
        {productsArray.map((_, index) => (
          <li key={index}>
            <ProductCardSkeleton />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProductReelSkeleton
