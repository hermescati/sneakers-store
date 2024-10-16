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
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-x-12 xl:gap-x-16">
        <div
          className={cn(
            'flex flex-col gap-4',
            hasItems ? 'lg:w-[60%] xl:w-[65%]' : 'w-full'
          )}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row gap-y-2 items-center justify-between">
            <div className="w-full sm:w-fit flex flex-col">
              <h2 className="text-xl md:text-2xl font-bold">Shopping Cart</h2>
              {hasItems && (
                <h3 className="font-semibold text-primary-500">
                  {items.length} item(s)
                </h3>
              )}
            </div>
            {hasItems && (
              <Button
                variant="ghost"
                label="Remove all"
                iconPrepend="tabler:trash"
                className="w-full sm:w-fit text-primary-600 underline underline-offset-4 hover:text-danger"
                onClick={() => clearCart()}
              />
            )}
          </div>

          {/* Products List */}
          {hasItems && <CartList />}

          {/* Empty State */}
          {!hasItems && <EmptyCart />}
        </div>

        {/* Checkout Section*/}
        {hasItems && <CartSummary />}
      </div>
    </>
  )
}

export default CartPage
