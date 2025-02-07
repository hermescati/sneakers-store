'use client'

import { useCart } from '@/hooks/use-cart'
import { cn } from '@/utils'
import { useEffect, useState } from 'react'
import Button from '../base/Button'
import CartList from './CartList'
import CartSummary from './CartSummary'
import EmptyCart from './EmptyCart'

const CartPage = () => {
  const { items, clearCart } = useCart()
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const hasItems = isMounted && !!items.length

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:gap-x-10 xl:gap-x-12">
        <div
          className={cn(
            "flex flex-col",
            hasItems ? 'lg:w-[55%] xl:w-[65%]' : 'w-full gap-4'
          )}
        >
          <div className="flex gap-y-2 items-center justify-between">
            <div className="w-full sm:w-fit flex flex-col">
              <h2 className="text-xl md:text-2xl font-bold leading-snug">Shopping Cart</h2>
              {hasItems && (
                <h3 className="font-medium text-md text-primary-600">
                  {items.length} item(s)
                </h3>
              )}
            </div>
            {hasItems && (
              <Button
                variant="ghost"
                label="Remove all"
                size="small"
                iconPrepend="solar:trash-bin-trash-outline"
                className="py-3 dark:font-semibold text-primary-600 hover:text-danger active:text-danger"
                onClick={() => clearCart()}
              />
            )}
          </div>

          {!hasItems ? <EmptyCart /> : <CartList />}
        </div>

        {hasItems &&
          <section className="lg:w-[45%] xl:w-[35%]">
            <CartSummary />
          </section>}
      </div>
    </>
  )
}

export default CartPage
