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
        <section className="flex flex-col gap-4">
            <h2 className="font-bold text-xl">{collection.name}</h2>

            <div className="flex flex-col xl:flex-row gap-6">
                <div className={cn(
                    'relative aspect-video w-full xl:aspect-[3/2] xl:w-[50%] rounded-2xl lg:rounded-3xl overflow-clip',
                    layout === 'normal' ? 'xl:order-1' : 'xl:order-2'
                )}>
                    <CollectionCover collection={collection} />
                </div>

                <div className={cn(
                    'xl:w-[50%]',
                    layout === 'normal' ? 'xl:order-2' : 'xl:order-1'
                )}>
                    <ProductReel
                        products={products}
                        className="grid grid-flow-row grid-cols-2 lg:grid-cols-3 gap-6"
                    />
                </div>
            </div>
        </section>
    )
}

export default CollectionItem