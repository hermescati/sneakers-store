'use client'

import Button from '@/components/base/button/Button'
import IconButton from '@/components/base/button/IconButton'
import Link from '@/components/base/Link'
import Modal from '@/components/base/Modal'
import toast from '@/components/base/toast/Toast'
import { SIZING_CATEGORY_OPTIONS } from '@/lib/options'
import { useCartStore } from '@/stores/cartStore'
import { SelectedSize } from '@/types'
import { Product } from '@/types/payload'
import { cn } from '@/utils'
import { useState } from 'react'
import NotifyForm from './NotifyForm'
import SizeGuides from './SizeGuides'

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
  const [showGuidesModal, setShowGuidesModal] = useState(false)
  const [showNotifyModal, setShowNotifyModal] = useState(false)

  const { addItem } = useCartStore()

  return (
    <div className='flex flex-col gap-2'>
      <div className="flex flex-col">
        <h4 className="font-semibold text-lg mb-2">
          {`Sizes - US ${SIZING_CATEGORY_OPTIONS.find((o) => o.value === product.size_category)?.label}`}
        </h4>

        <ul className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 lg:grid-cols-5 2xl:grid-cols-6 gap-2">
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

        <Link
          underline
          className="w-fit py-2 mb-4 font-medium text-md text-primary-600 hover:text-secondary cursor-pointer transition-colors ease-in-out duration-300"
          onClick={() => setShowGuidesModal(true)}>
          Size Guide
        </Link>

        <div className='flex gap-2 items-center'>
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
      </div>

      <Link
        underline
        className="w-fit py-2 lg:pb-0 font-medium text-md leading-none hover:text-secondary cursor-pointer transition-colors ease-in-out duration-300"
        onClick={() => setShowNotifyModal(!showGuidesModal)}>
        Can&apos;t find your size? Get notified!
      </Link>

      <Modal
        title='Size Guides'
        size='big'
        isOpen={showGuidesModal}
        onClose={() => setShowGuidesModal(false)}>
        <SizeGuides />
      </Modal>

      <Modal
        title='Notify Me'
        isOpen={showNotifyModal}
        childrenClasses='overflow-visible'
        onClose={() => setShowNotifyModal(false)}
      >
        <NotifyForm />
      </Modal>
    </div>
  )
}

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
    hover:border-primary-400
    cursor-pointer transition-color ease-in-out duration-300
  `

  return (
    <button
      disabled={!stock}
      className={cn(baseStyle, {
        "opacity-40 cursor-not-allowed": !stock,
        "border-none bg-primary-900 text-background shadow-[0_2px_8px_-2px_rgba(var(--primary-800),0.35)]": selected
      })}
      onClick={onSelect}
    >
      {size}
    </button>
  )
}

export default ProductSizes
