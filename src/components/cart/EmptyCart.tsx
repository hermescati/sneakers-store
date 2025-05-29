'use client'

import routes from '@/lib/routes'
import Image from 'next/image'
import Link from '../base/Link'
import Button from '../base/button/Button'

interface EmptyCartProps {
  compact?: boolean
}

const EmptyCartCompact = () => (
  <div className="flex flex-col items-center justify-center gap-2 pb-10 pt-6">
    <Image src="/empty-cart.png" alt="empty cart illustration" width={200} height={200} />
    <Link href={routes.products.home} className="font-semibold underline-offset-4 hover:underline">
      Add items to your cart to checkout
    </Link>
  </div>
)

const EmptyCartFull = () => (
  <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-border p-8 md:rounded-2xl">
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative h-48 w-48">
        <Image src="/empty-cart.png" alt="empty shopping cart" fill loading="eager" />
      </div>
      <div className="mb-4 flex flex-col items-center">
        <h3 className="text-xl font-semibold">Your cart is empty</h3>
        <span className="mb-6 text-center text-md font-medium text-primary-600 lg:text-base">
          Whoops! Nothing to show here yet.
        </span>
        <Button label="Shop now" href={routes.products.home} />
      </div>
    </div>
  </div>
)

const EmptyCart = ({ compact = false }: EmptyCartProps) => {
  return compact ? <EmptyCartCompact /> : <EmptyCartFull />
}

export default EmptyCart
