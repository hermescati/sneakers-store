import routes from '@/lib/routes'
import { useCartStore } from '@/stores/cartStore'
import { formatPrice } from '@/utils'
import { calculateCartSummary } from '@/utils/cart'
import { useRouter } from 'next/navigation'
import Button from '../base/button/Button'
import IconButton from '../base/button/IconButton'
import CartList from './CartList'
import EmptyCart from './EmptyCart'

const ShoppingCart = () => {
  const router = useRouter()

  const { items, close } = useCartStore()
  const { subtotal } = calculateCartSummary(items)
  const isEmpty = items.length === 0

  return (
    <div className="fixed right-[1rem] top-[5rem] z-20 hidden max-h-[calc(100vh-6.5rem)] flex-col divide-y divide-border overflow-clip rounded-2xl border border-border bg-background shadow-lg lg:flex">
      <div className="flex items-center justify-between gap-8 px-4 py-3">
        <h3 className="text-xl font-semibold">
          {isEmpty ? 'Your cart is empty' : 'Added to cart'}
        </h3>
        <IconButton icon="tabler-x" iconClass="text-lg" onClick={close} />
      </div>

      <div className="w-[500px] flex-1 overflow-y-auto">
        {isEmpty ? <EmptyCart compact /> : <CartList compact />}
      </div>

      <div className="flex flex-col gap-4 bg-primary-100/50 p-5">
        <div className="flex items-center justify-between text-lg font-semibold">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex flex-col gap-2.5">
          <Button label="Checkout" disabled={!items.length} />
          {!isEmpty && (
            <Button
              variant="outline"
              label={`View Items (${items.length})`}
              iconAppend="solar:arrow-right-linear"
              className="hover:underline hover:underline-offset-4 dark:border-primary-600 dark:text-primary-700 dark:hover:bg-primary-100"
              onClick={() => {
                close()
                router.push(routes.cart)
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart
