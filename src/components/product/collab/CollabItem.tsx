import { getProducts } from "@/services/products"
import { Collaboration } from "@/types/payload"
import { cn } from "@/utils"
import ProductReel from "../ProductReel"
import CollabCover from "./CollabCover"
import CollabItemSkeleton from "../skeletons/CollabItemSkeleton"

interface CollabItemProps {
    collaboration: Collaboration
    layout?: 'normal' | 'alternate'
}

const CollabItem = async ({ collaboration, layout = 'normal' }: CollabItemProps) => {
    const { data: products } = await getProducts({
        where: { collaboration: { equals: collaboration.id } },
        limit: 6
    })

    if (products.length === 0) return <CollabItemSkeleton layout={layout} />

    return (
        <section className="flex flex-col xl:flex-row gap-6">
            <div className={cn("w-full xl:w-1/2", layout === "normal" ? "xl:order-1" : "xl:order-2")}>
                <CollabCover collaboration={collaboration} />
            </div>
            <div className={cn("xl:w-1/2", layout === "normal" ? "xl:order-2" : "xl:order-1")}>
                <ProductReel
                    products={products}
                    className="grid grid-flow-row grid-cols-2 lg:grid-cols-3 gap-6"
                />
            </div>
        </section>
    )
}

export default CollabItem