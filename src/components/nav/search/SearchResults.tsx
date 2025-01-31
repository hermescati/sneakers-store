import Button from '@/components/base/Button'
import Link from '@/components/base/Link'
import { Product } from '@/types/payload'
import { capitalizeFirstLetter, getProductInfo, getThumbnailImage } from '@/utils'
import Image from 'next/image'

export type SearchItemClickEvent = {
    query: string,
    href: string
}

const ResultItem = ({ product, onClick }: { product: Product, onClick: (event: SearchItemClickEvent) => void }) => {
    const { brand, model } = getProductInfo(product)
    const thumbnail = getThumbnailImage(product)

    return (
        <div
            key={product.id}
            className="flex items-center justify-between gap-4 py-1.5 px-4 cursor-pointer hover:bg-primary-100 transition-all duration-300 ease-in-out"
            onClick={() => onClick(
                {
                    query: product.nickname as string,
                    href: `sneakers/${product.id}`
                }
            )}>
            <div className="aspect-video">
                <Image
                    alt={product.name!}
                    src={thumbnail}
                    height={80}
                    width={120}
                    className="h-full w-full object-contain rounded-md"
                />
            </div>

            <div className="flex flex-col w-full">
                <div className="flex items-center gap-2 font-medium text-sm text-primary-600">
                    <span>{brand}</span>
                    <span>&gt;</span>
                    <span>{model}</span>
                    <span>&gt;</span>
                    <span>{capitalizeFirstLetter(product.size_category!)}</span>
                </div>
                <span className="font-semibold text-md">{product.nickname}</span>
            </div>

            <Button
                variant="ghost"
                size="icon"
                icon="mage:chevron-right"
                className="text-primary-600 hover:bg-transparent" />
        </div>
    )
}


const SearchResults = ({ results, onItemClick }: { results: Product[], onItemClick: (event: SearchItemClickEvent) => void }) => {
    return (
        <div className="flex flex-col">
            <span className="ml-4 mb-1 font-medium text-md text-primary-700">Results</span>
            <ul className="max-h-96 overflow-y-none overscroll-contain border-y border-border divide-y divide-border/50">
                {results.map((result) => (
                    <ResultItem
                        key={result.id}
                        product={result}
                        onClick={onItemClick} />
                ))}
            </ul>

            <Link
                underline
                className="flex justify-center items-center py-3 font-medium text-md text-primary-700 hover:text-secondary cursor-pointer transition-all duration-300 ease-in-out">
                Show more results ...
            </Link>
        </div>
    )
}

export default SearchResults