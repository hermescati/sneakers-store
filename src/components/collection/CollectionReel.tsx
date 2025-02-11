import { Collection } from "@/types/payload"
import CollectionItem from "./CollectionItem"
import CollectionReelSkeleton from "./skeletons/CollectionReelSkeleton"

// FIXME: Update logic to not show a collection unless there are items in it
const CollectionReel = ({ collections }: { collections: Collection[] }) => {
    if (!collections.length) return <CollectionReelSkeleton limit={2} />

    return (
        <ul className="flex flex-col gap-12">
            {collections.map((collection, index) => (
                <li key={collection.id}>
                    <CollectionItem
                        collection={collection}
                        layout={index % 2 === 0 ? "normal" : "alternate"}
                    />
                </li>
            ))}
        </ul>
    )
}

export default CollectionReel