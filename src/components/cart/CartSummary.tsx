'use client'

import { useCart } from '@/hooks/use-cart'
import { createStripeSession } from '@/services/checkout'
import { OrderItem } from '@/types'
import { calculateCartTotal, formatPrice } from '@/utils'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '../base/Button'
import DeliveryMethods from './base/DeliveryMethods'
import DiscountCode from './base/DiscountCode'

const CartSummary = () => {
  const router = useRouter()

  const {
    items,
    discount: appliedDiscount,
    shippingMethod,
    clearDiscount,
    clearCart
  } = useCart()
  const cartTotal = calculateCartTotal(items)

  const calculateTotal = () => {
    let total = cartTotal

    if (appliedDiscount?.percent_off) {
      const discountAmount = cartTotal * (appliedDiscount.percent_off / 100)
      total -= discountAmount
    }

    if (shippingMethod?.fixed_amount) {
      total += shippingMethod.fixed_amount.amount
    }

    return total
  }

  const handleCheckout = async () => {
    const selectedProducts: OrderItem[] = items.map(({ product, size }) => {
      return { productId: product.id, size: size.size, price: size.price }
    })

    const response = await createStripeSession(
      selectedProducts,
      shippingMethod || undefined,
      appliedDiscount || undefined
    )

    if (response?.code === 409) router.push(`/login?origin=cart`)

    if (!response || !response.url) return

    clearCart()
    router.replace(response.url)
  }

  return (
    <section className="lg:w-[40%] xl:w-[35%]">
      <div className="sticky top-[11.5rem] self-start 3xl:max-h-screen overflow-y-auto">
        <div className="flex flex-col gap-4 p-5 lg:p-6 rounded-2xl border border-primary-300">
          <h2 className="font-bold text-2xl">Your Order</h2>

          <span className="bg-primary-300 h-px w-full rounded-full" />

          <DeliveryMethods />

          <span className="bg-primary-300 h-px w-full rounded-full" />

          <DiscountCode />

          <span className="bg-primary-300 h-px w-full rounded-full" />

          <div className="flex flex-col gap-3">
            {/* Subtotal */}
            <div className="flex items-center justify-between font-bold text-gray-800">
              <span>Cart Total</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>

            {/* Discount*/}
            <div className="flex flex-col gap-0.5 font-medium text-gray-500">
              <div className="flex items-baseline justify-between gap-x-4">
                <span>Discount</span>
                <span>
                  <span>{!!appliedDiscount && '- '}</span>
                  {formatPrice(
                    !!appliedDiscount
                      ? cartTotal * (appliedDiscount.percent_off! / 100)
                      : 0
                  )}
                </span>
              </div>
              {!!appliedDiscount && (
                <div className="flex items-center gap-x-1">
                  <span className="flex items-center py-1 px-3 bg-secondary/10 border border-secondary text-secondary rounded-lg font-semibold text-md uppercase">
                    {appliedDiscount.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    icon="tabler:x"
                    className="text-primary-500"
                    onClick={clearDiscount}
                  />
                </div>
              )}
            </div>

            {/* Delivery */}
            <div className="flex items-baseline justify-between font-medium text-gray-500">
              <span>Delivery</span>
              <span className="transition-all ease-in-out duration-300">
                {formatPrice(
                  !!shippingMethod ? shippingMethod.fixed_amount!.amount : 0
                )}
              </span>
            </div>
          </div>

          {/* Total */}
          <span className="bg-primary-300 h-px w-full rounded-full" />
          <div className="flex items-center justify-between font-bold text-xl">
            <div className="flex items-baseline gap-1">
              <p>Total</p>
              <span className="font-normal text-md text-primary-600">
                (ex. Tax)
              </span>
            </div>
            <div>{formatPrice(calculateTotal())}</div>
          </div>

          <Button
            disabled={!items.length}
            label="Checkout"
            className="mt-2"
            onClick={handleCheckout}
          />
        </div>

        {/* Support */}
        <div className="flex items-center gap-2 py-6">
          <Icon
            icon="solar:chat-line-outline"
            className="text-2xl text-primary-700"
          />
          <span className="font-medium text-primary-800">
            Need help with your order?
          </span>

          <Link
            href="/cart"
            className="font-medium text-secondary underline underline-offset-4"
          >
            We&apos;re here to help
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CartSummary
