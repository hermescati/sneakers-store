import ProductReelSkeleton from '@/components/product/skeletons/ProductReelSkeleton'
import { cn } from '@/utils'

const CollabItemSkeleton = ({ layout }: { layout: 'normal' | 'alternate' }) => {
  return (
    <div className="flex flex-col gap-6 xl:flex-row">
      <div
        className={cn(
          'relative aspect-video w-full overflow-clip xl:aspect-[3/2] xl:w-[50%]',
          layout === 'normal' ? 'xl:order-1' : 'xl:order-2'
        )}
      >
        <div className="h-full w-full rounded-xl bg-skeleton md:rounded-2xl" />
      </div>

      <div className={cn('xl:w-[50%]', layout === 'normal' ? 'xl:order-2' : 'xl:order-1')}>
        <ProductReelSkeleton className="grid grid-flow-row grid-cols-2 gap-6 lg:grid-cols-3" />
      </div>
    </div>
  )
}

export default CollabItemSkeleton
