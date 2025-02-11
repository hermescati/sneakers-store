import Image from 'next/image'
import Button from '../base/Button'
import Link from '../base/Link'

interface EmptyCartProps {
  compact?: boolean
}

const EmptyCartCompact = () => (
  <div className="flex flex-col gap-2 items-center justify-center pt-6 pb-10">
    <Image
      src="/empty-cart.png"
      alt="empty cart illustration"
      width={200}
      height={200}
    />
    <Link
      href="/sneakers"
      className="font-semibold hover:underline underline-offset-4"
    >
      Add items to your cart to checkout
    </Link>
  </div>
)

const EmptyCartFull = () => (
  <div className="flex items-center justify-center p-8 rounded-xl md:rounded-2xl border-2 border-dashed border-border">
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative w-48 h-48">
        <Image
          src="/empty-cart.png"
          alt="empty shopping cart"
          fill
          loading="eager"
        />
      </div>
      <div className="flex flex-col items-center mb-4">
        <h3 className="font-semibold text-xl">Your cart is empty</h3>
        <span className="font-medium text-md lg:text-base text-center text-primary-600 mb-6">
          Whoops! Nothing to show here yet.
        </span>
        <Button label="Shop now" href="/sneakers" />
      </div>
    </div>
  </div>
)

const EmptyCart = ({ compact = false }: EmptyCartProps) => {
  return compact ? <EmptyCartCompact /> : <EmptyCartFull />
}

export default EmptyCart
