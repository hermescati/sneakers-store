import Button from '@/components/base/Button'
import { useCart } from '@/hooks/use-cart'
import { formatPrice } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import CartItem from './CartItem'

const ShoppingCart = () => {
  const router = useRouter()

  const { 
    items,
    total: cartTotal, 
    removeItem, 
    closeCart 
  } = useCart()
  const hasItems = items.length > 0

  const handleViewItems = () => {
    closeCart()
    router.push('/cart')
  }

  return (
    <div className="fixed hidden lg:flex flex-col z-20 right-[1rem] top-[5rem] overflow-clip border border-border divide-y divide-border bg-background rounded-xl shadow-lg max-h-[calc(100vh-6.5rem)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-8 p-4">
        <h4 className="font-semibold text-lg">
          {hasItems ? 'Added to cart' : 'Your cart is empty'}
        </h4>
        <Button
          variant="ghost"
          size="icon"
          icon="tabler:x"
          onClick={() => closeCart()}
        />
      </div>

      {/* Products */}
      <div className="flex-1 w-[500px] overflow-y-auto">
        {!hasItems ? (
          <div className="flex flex-col gap-2 items-center justify-center pt-6 pb-10">
            <Image
              src="/empty-cart.png"
              alt="empty cart illustration"
              width={200}
              height={200}
            />
            <Link
              href="/sneakers"
              className="font-semibold hover:underline underline-offset-4 "
            >
              Add items to your cart to checkout
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-border overflow-y-auto py-2">
            {items.map(({ product, size }, index) => (
              <li key={`${product.id}-${size.size}`}>
                <CartItem
                  product={product}
                  size={size}
                  compact
                  index={index}
                  onRemove={() => removeItem(product.id, size)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Total */}
      <div className="flex flex-col gap-4 p-5 bg-primary-100/50">
        <div className="flex items-center justify-between text-lg">
          <h5 className="font-semibold">Subtotal</h5>
          <h5 className="font-semibold">{formatPrice(cartTotal)}</h5>
        </div>
        <div className="flex flex-col gap-2">
          <Button label="Checkout" disabled={!items.length} />
          {hasItems && (
            <Button
              variant="outline"
              label={`View Items (${items.length})`}
              iconAppend="solar:arrow-right-linear"
              onClick={handleViewItems}
              className="hover:underline hover:underline-offset-4"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart
