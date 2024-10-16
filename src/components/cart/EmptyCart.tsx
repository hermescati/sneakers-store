import Image from 'next/image'
import Button from '../base/Button'

const EmptyCart = () => {
  return (
    <div className="flex items-center justify-center p-8 rounded-2xl border-2 border-dashed border-primary-300">
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
          <span className="font-medium text-center text-primary-600 mb-6">
            Whoops! Nothing to show here yet.
          </span>
          <Button label="Shop now" href="/sneakers" />
        </div>
      </div>
    </div>
  )
}

export default EmptyCart
