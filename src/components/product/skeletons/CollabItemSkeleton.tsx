import ProductReelSkeleton from "@/components/product/skeletons/ProductReelSkeleton"
import { cn } from "@/utils"

const CollabItemSkeleton = ({ layout }: { layout: 'normal' | 'alternate' }) => {
    return (
        <div className="flex flex-col xl:flex-row gap-6">
            <div className={cn(
                "relative aspect-video w-full xl:aspect-[3/2] xl:w-[50%] overflow-clip",
                layout === "normal" ? "xl:order-1" : "xl:order-2"
            )}>
                <div className="w-full h-full bg-skeleton rounded-xl md:rounded-2xl" />
            </div>

            <div className={cn(
                "xl:w-[50%]",
                layout === "normal" ? "xl:order-2" : "xl:order-1"
            )}>
                <ProductReelSkeleton className="grid grid-flow-row grid-cols-2 lg:grid-cols-3 gap-6" />
            </div>
        </div>
    )
}

export default CollabItemSkeleton