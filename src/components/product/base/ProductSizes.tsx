'use client'

import Button from '@/components/base/button/Button'
import IconButton from '@/components/base/button/IconButton'
import toast from '@/components/base/toast/Toast'
import { SIZING_CATEGORY_OPTIONS } from '@/lib/options'
import { useCartStore } from '@/stores/cartStore'
import { SelectedSize } from '@/types'
import { Product } from '@/types/payload'
import { cn } from '@/utils'
import NotifyForm from './NotifyForm'
import SizeGuides from './SizeGuides'

interface SizeBoxProps {
  size: number
  stock: number
  selected: boolean
  onSelect: VoidFunction
}

const SizeBox = ({ size, stock, selected, onSelect }: SizeBoxProps) => {
  const baseStyle = `
    flex items-center justify-center p-4
    rounded-xl border border-border 
    bg-background 
    font-semibold text-primary-700
    disabled:opacity-40 disabled:cursor-not-allowed
    enabled:hover:border-primary-400
    cursor-pointer transition-color ease-in-out duration-300
  `

  return (
    <button
      disabled={!stock}
      className={cn(baseStyle, {
        "border-none bg-primary-900 text-background shadow-[0_2px_8px_-2px_rgba(var(--primary-800),0.35)]": selected
      })}
      onClick={onSelect}
    >
      {size}
    </button>
  )
}

interface ProductSizeProps {
  product: Product
  selectedSize: SelectedSize
  setSelectedSize: (size: SelectedSize) => void
}

const ProductSizes = ({
  product,
  selectedSize,
  setSelectedSize
}: ProductSizeProps) => {
  const { addItem } = useCartStore()

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <h4 className="font-semibold text-lg">
          {`Sizes - US ${SIZING_CATEGORY_OPTIONS.find((o) => o.value === product.size_category)?.label}`}
        </h4>
        <div className='md:hidden'>
          <SizeGuides />
        </div>
      </div>

      <ul className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 lg:grid-cols-4 xl:grid-cols-6 gap-2">
        {product.stock.map((item) => (
          <SizeBox
            key={item.id}
            size={item.size}
            stock={item.quantity}
            selected={item.id === selectedSize?.id}
            onSelect={() => setSelectedSize(item)}
          />
        ))}
      </ul>

      <div className='hidden md:block'>
        <SizeGuides />
      </div>

      <div className='flex gap-2 items-center mt-4'>
        <Button
          disabled={!selectedSize}
          label="Add to cart"
          iconPrepend="solar:cart-large-minimalistic-linear"
          onClick={() => addItem(product, selectedSize)}
          className='w-full' />
        <IconButton
          icon="solar:heart-outline"
          className='bg-primary-100 rounded-2xl h-full aspect-square'
          onClick={() => toast.success('Added to your wishlist.')} />
      </div>

      <NotifyForm />
    </div>
  )
}

export default ProductSizes
