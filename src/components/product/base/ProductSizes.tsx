import Input from '@/components/base/Input'
import Link from '@/components/base/Link'
import { useCartStore } from '@/stores/cartStore'
import { ProductSize } from '@/types'
import { Product } from '@/types/payload'
import { capitalizeFirstLetter, cn } from '@/utils'
import { useState } from 'react'
import Button from '../../base/Button'

interface SizeBoxProps {
  size: number
  stock: number
  selected: boolean
  onSelect: () => void
}

interface ProductSizeProps {
  product: Product
  selectedSize: ProductSize | null
  setSelectedSize: (size: ProductSize | null) => void
}

const SizeBox = ({ size, stock, selected, onSelect }: SizeBoxProps) => {
  const baseStyle = `
    flex items-center justify-center p-4 max-w-18 max-h-18
    rounded-xl border border-border 
    bg-background 
    font-semibold text-primary-800
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

const ProductSizes = ({
  product,
  selectedSize,
  setSelectedSize
}: ProductSizeProps) => {
  const [showModal, setShowModal] = useState(false)
  const { addItem } = useCartStore()

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-4 p-5 bg-primary-100/50 rounded-2xl">
        <h4 className="font-semibold text-lg lg:text-base w-full">{`Select Sizes (US ${capitalizeFirstLetter(product.size_category)})`}</h4>

        <span className="w-full h-px bg-border rounded-full" />

        <ul className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-5 2xl:grid-cols-6 gap-2">
          {product.sizes.map((item) => (
            <SizeBox
              key={item.id}
              size={item.size}
              stock={item.stock}
              selected={item.id === selectedSize?.id}
              onSelect={() => setSelectedSize(item)}
            />
          ))}
        </ul>

        {/* TODO: Add a modal to show the size guides */}
        <Link
          underline
          className="w-fit font-medium text-md hover:text-secondary cursor-pointer transition-colors ease-in-out duration-300">
          Size Guide
        </Link>

        <Button
          disabled={!selectedSize}
          label="Add to cart"
          iconPrepend="solar:cart-large-minimalistic-linear"
          onClick={() => {
            addItem(product, selectedSize as ProductSize)
          }} />

        {/* TODO: Implement the wishlist feature for products */}
        {/* <Button
          variant="ghost"
          label="Wishlist sneaker"
          iconPrepend="solar:heart-outline"
        /> */}
      </div>

      <Link
        underline
        className="w-fit py-2 lg:pb-0 font-medium text-md hover:text-secondary cursor-pointer transition-colors ease-in-out duration-300"
        onClick={() => setShowModal(!showModal)}>
        Can&apos;t find your size? Get notified!
      </Link>

      {/* TODO: Move this into a modal with portal */}
      {showModal &&
        <div className="flex flex-col md:flex-row lg:flex-col items-center gap-y-2 gap-x-2">
          <Input type="email" placeholder="Email address" />
          <div className="flex flex-col sm:flex-row lg:flex-col 2xl:flex-row items-center gap-2 w-full">
            <div className="w-full md:w-1/2 lg:w-full">
              <Input
                type="number"
                placeholder="Size (US)"
                min={3.5}
                max={16}
                step={0.5}
              />
            </div>
            <Button
              label="Notify me"
              iconPrepend="gravity-ui:bell-dot"
              className="w-full md:w-1/2 lg:w-full"
            />
          </div>
        </div>
      }
    </div>
  )
}

export default ProductSizes
