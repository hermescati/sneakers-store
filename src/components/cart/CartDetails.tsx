'use client'

import { useCartStore } from '@/stores/cartStore'
import { useEffect, useState } from 'react'
import Button from '../base/button/Button'
import CartList from './CartList'
import CartSummary from './CartSummary'
import EmptyCart from './EmptyCart'

const CartDetails = () => {
  const { items, clearCart } = useCartStore()
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted || items.length === 0) {
    return (
      <div className="flex w-full flex-col gap-4">
        <h2 className="text-xl font-bold leading-snug md:text-2xl">Shopping Cart</h2>
        <EmptyCart />
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row lg:gap-x-10 xl:gap-x-12">
      <div className="flex flex-col lg:w-[55%] xl:w-[65%]">
        <div className="flex items-center justify-between gap-y-2">
          <div className="flex w-full flex-col sm:w-fit">
            <h2 className="text-xl font-bold leading-snug md:text-2xl">Shopping Cart</h2>
            <h3 className="text-md font-medium text-primary-600">{items.length} item(s)</h3>
          </div>

          <Button
            variant="ghost"
            label="Remove all"
            size="small"
            iconPrepend="solar:trash-bin-trash-outline"
            className="py-3 text-primary-600 hover:text-danger active:text-danger dark:font-semibold"
            onClick={clearCart}
          />
        </div>
        <CartList />
      </div>

      <section className="lg:w-[45%] xl:w-[35%]">
        <CartSummary />
      </section>
    </div>
  )
}

export default CartDetails
