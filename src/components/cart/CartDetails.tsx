'use client'

import { useCart } from '@/stores/useCart'
import { useEffect, useState } from 'react'
import Button from '../base/Button'
import CartList from './CartList'
import CartSummary from './CartSummary'
import EmptyCart from './EmptyCart'

const CartDetails = () => {
  const { items, clearCart } = useCart()
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted || items.length === 0) {
    return (
      <div className="flex flex-col w-full gap-4">
        <h2 className="text-xl md:text-2xl font-bold leading-snug">Shopping Cart</h2>
        <EmptyCart />
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row lg:gap-x-10 xl:gap-x-12">
      <div className="flex flex-col lg:w-[55%] xl:w-[65%]">
        <div className="flex gap-y-2 items-center justify-between">
          <div className="w-full sm:w-fit flex flex-col">
            <h2 className="text-xl md:text-2xl font-bold leading-snug">Shopping Cart</h2>
            <h3 className="font-medium text-md text-primary-600">{items.length} item(s)</h3>
          </div>
          <Button
            variant="ghost"
            label="Remove all"
            size="small"
            iconPrepend="solar:trash-bin-trash-outline"
            className="py-3 dark:font-semibold text-primary-600 hover:text-danger active:text-danger"
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
