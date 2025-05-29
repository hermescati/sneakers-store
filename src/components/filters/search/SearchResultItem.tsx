import Icon from '@/components/base/Icon'
import { SIZING_CATEGORY_OPTIONS } from '@/lib/options'
import { Product } from '@/types/payload'
import { getProductInfo } from '@/utils/product'
import Image from 'next/image'

interface SearchResultItem {
  product: Product
  onClick: VoidFunction
}

const SearchResultItem = ({ product, onClick }: SearchResultItem) => {
  const { brand, model, thumbnail } = getProductInfo(product)

  return (
    <div
      key={product.id}
      className="flex cursor-pointer items-center justify-between gap-2 py-2 pl-2 pr-6 transition-all duration-300 ease-in-out hover:bg-primary-100"
      onClick={onClick}
    >
      <div className="relative aspect-video h-16">
        <Image
          alt={product.nickname}
          src={thumbnail.url!}
          width={thumbnail.width!}
          height={thumbnail.height!}
          className="object-contain"
        />
      </div>

      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 text-sm font-medium text-primary-500">
            <span>{brand}</span>
            <span>&gt;</span>
            <span>{model}</span>
            <span>&gt;</span>
            <span>
              {SIZING_CATEGORY_OPTIONS.find(o => o.value === product.size_category)?.label}
            </span>
          </div>
          <span className="text-md font-semibold">{product.nickname}</span>
        </div>
        <Icon icon="mage:chevron-right" className="text-xl text-primary-500" />
      </div>
    </div>
  )
}

export default SearchResultItem
