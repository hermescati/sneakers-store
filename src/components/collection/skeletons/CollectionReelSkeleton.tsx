import ProductReelSkeleton from "@/components/product/skeletons/ProductReelSkeleton"
import { cn } from "@/utils"

const CollectionItemSkeleton = ({ layout }: { layout: 'normal' | 'alternate' }) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="h-7 bg-zinc-200/75 rounded w-1/12" />

            <div className="flex flex-col xl:flex-row gap-6">
                <div className={cn(
                    'relative aspect-video w-full xl:aspect-[3/2] xl:w-[50%] rounded-2xl lg:rounded-3xl overflow-clip',
                    layout === 'normal' ? 'xl:order-1' : 'xl:order-2'
                )}>
                    <div className="w-full h-full rounded-2xl bg-zinc-200/75"></div>
                </div>

                <div className={cn(
                    'xl:w-[50%]',
                    layout === 'normal' ? 'xl:order-2' : 'xl:order-1'
                )}>
                    <ProductReelSkeleton className="grid grid-flow-row grid-cols-2 lg:grid-cols-3 gap-6" />
                </div>
            </div>
        </div>
    )
}


const CollectionReelSkeleton = ({ limit }: { limit: number }) => {
    const collections: number[] = new Array(limit).fill(0)

    return (
        <ul className="animate-pulse flex flex-col gap-12">
            {collections.map((_, index) => (
                <li key={index}>
                    <CollectionItemSkeleton layout={index % 2 === 0 ? 'normal' : 'alternate'} />
                </li>
            ))}
        </ul>
    )
}

export default CollectionReelSkeleton