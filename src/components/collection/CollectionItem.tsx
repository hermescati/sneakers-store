import { getProducts } from "@/services/products";
import { Collection } from "@/types/payload";
import { cn } from "@/utils";
import ProductReel from "../product/ProductReel";
import CollectionCover from "./base/CollectionCover";

interface CollectionItemProps {
    collection: Collection
    layout?: 'normal' | 'alternate'
}

const CollectionItem = async ({ collection, layout = 'normal' }: CollectionItemProps) => {
    const { products } = await getProducts({
        query: { collection: { equals: collection.id } },
        limit: 6
    })

    return (
        <section className="flex flex-col xl:flex-row gap-6">
            <div className={cn("w-full xl:w-1/2", layout === "normal" ? "xl:order-1" : "xl:order-2")}>
                <CollectionCover collection={collection} />
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

export default CollectionItem