import { useCart } from '@/hooks/use-cart'
import { ProductSize } from '@/types'
import { Product } from '@/types/payload'
import { capitalizeFirstLetter, cn } from '@/utils'
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
    flex items-center justify-center p-4 3xl:max-w-16 3xl:max-h-16
    rounded-xl border border-primary-300 
    bg-background 
    font-semibold text-primary-700
    hover:border-primary-400
    cursor-pointer transition-color ease-in-out duration-300
  `

  return (
    <button
      disabled={!stock}
      className={cn(baseStyle, {
        'opacity-40 cursor-not-allowed': !stock,
        'border-none bg-primary-900 text-background shadow-[0_2px_16px_-2px_rgba(33,36,39,0.50)]':
          selected
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
  const { addItem } = useCart()

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-4 p-5 bg-primary-100 rounded-2xl">
        <h4 className="font-semibold w-full">{`Select Sizes (US ${capitalizeFirstLetter(product.size_category)})`}</h4>
        <span className="w-full h-px bg-primary-300 rounded-full" />

        <ul className="grid grid-cols-5 gap-2 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-5 xl:grid-cols-6 xl:gap-2.5">
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

        <span className="w-fit text-md underline underline-offset-4 cursor-pointer font-medium hover:text-secondary">
          Size Guide
        </span>

        <div className="flex flex-col gap-2">
          <Button
            disabled={!selectedSize}
            iconPrepend="solar:cart-large-minimalistic-linear"
            onClick={() => {
              addItem(product, selectedSize as ProductSize)
            }}
          >
            Add to cart
          </Button>
          <Button
            variant="ghost"
            label="Wishlist sneaker"
            iconPrepend="solar:heart-outline"
          />
        </div>
      </div>

      {/* TODO: Implement a modal that when this is clicked, shows the markup below */}
      <span className="w-fit py-2 text-md underline underline-offset-4 cursor-pointer font-medium hover:text-secondary">
        Can&apos;t find your size? Get notified!
      </span>

      {/* <div className="flex flex-col md:flex-row lg:flex-col items-center gap-y-2 gap-x-2">
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
        </div> */}
    </div>
  )
}

export default ProductSizes
