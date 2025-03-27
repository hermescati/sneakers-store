import { SIZING_CATEGORY_OPTIONS } from '@/lib/options'
import { Product } from '@/types/payload'
import { getProductInfo } from '@/utils/product'
import { Icon } from '@iconify/react'
import Image from 'next/image'

interface SearchItemProps {
    product: Product
    onClick: VoidFunction
}

const SearchItem = ({ product, onClick }: SearchItemProps) => {
    const { brand, model, thumbnail } = getProductInfo(product)

    return (
        <div
            key={product.id}
            className="flex items-center justify-between gap-2 py-2 pl-2 pr-6 cursor-pointer hover:bg-primary-100 transition-all duration-300 ease-in-out"
            onClick={onClick}>
            <div className="relative aspect-video h-16">
                <Image
                    alt={product.nickname}
                    src={thumbnail}
                    fill
                    className="object-contain" />
            </div>

            <div className='flex items-center justify-between gap-2 w-full'>
                <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2 font-medium text-sm text-primary-500">
                        <span>{brand}</span>
                        <span>&gt;</span>
                        <span>{model}</span>
                        <span>&gt;</span>
                        <span>{SIZING_CATEGORY_OPTIONS.find((o) => o.value === product.size_category)?.label}</span>
                    </div>
                    <span className="font-semibold text-md">{product.nickname}</span>
                </div>
                <Icon icon="mage:chevron-right" className="text-xl text-primary-500" />
            </div>

        </div>
    )
}

export default SearchItem