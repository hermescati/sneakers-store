'use client'

import { useCart } from '@/hooks/use-cart'
import { createStripeSession } from '@/services/checkout'
import { OrderItem } from '@/types'
import { formatPrice } from '@/utils'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '../base/Button'
import IconButton from '../base/IconButton'
import DeliveryMethods from './base/DeliveryMethods'
import DiscountCode from './base/DiscountCode'

const CartSummary = () => {
  const router = useRouter()

  const {
    items,
    total: subtotal,
    discount,
    shippingMethod,
    clearDiscount,
    clearCart
  } = useCart()

  const calculateDiscount = () => {
    if (!discount) return 0

    let discountValue = 0
    const { amount_off, percent_off } = discount.coupon
    if (amount_off) {
      discountValue = amount_off
    } else if (percent_off) {
      discountValue = subtotal * (percent_off / 100)
    }

    return discountValue
  }

  const calculateShipping = () =>
    shippingMethod?.fixed_amount?.amount || 0

  const calculateTotal = () => {
    const discountValue = calculateDiscount()
    const shippingCost = calculateShipping()

    return Math.max(0, subtotal - discountValue + shippingCost)
  }

  const handleCheckout = async () => {
    const selectedProducts: OrderItem[] = items.map(({ product, size }) => {
      return { productId: product.id, size: size.size, price: size.price }
    })

    const response = await createStripeSession(
      selectedProducts,
      shippingMethod || undefined,
      discount || undefined
    )

    if (response?.code === 409) router.push(`/login?origin=cart`)
    if (!response || !response.url) return

    clearCart()
    router.replace(response.url)
  }

  return (
    <div className="lg:sticky lg:top-40 3xl:max-h-screen overflow-y-auto">
      <div className="flex flex-col gap-4 p-6 rounded-xl border border-border">

        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-2xl">Order Summary</h2>
          <DeliveryMethods />
          <DiscountCode />
        </div>

        <span className="flex w-full h-px bg-border" />

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between font-semibold text-primary-800">
            <span>Cart Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="flex flex-col gap-0.5 font-medium text-primary-700">
            <div className="flex items-baseline justify-between gap-x-4">
              <span>Discount</span>
              <span>{formatPrice(calculateDiscount(), { credit: true })}</span>
            </div>

            {!!discount && (
              <div className="flex items-center gap-x-1.5">
                <span className="flex items-center py-0.5 px-2.5 border-2 border-secondary-400 bg-secondary-100/10 text-secondary-400 rounded-lg font-semibold text-md uppercase">
                  {discount.code}
                </span>
                <IconButton icon="tabler-x" onClick={clearDiscount} className="p-1.5 text-lg" />
              </div>
            )}
          </div>

          <div className="flex item-center justify-between font-medium text-primary-700">
            <span>Delivery</span>
            <span>{formatPrice(calculateShipping())}</span>
          </div>
        </div>

        <span className="flex w-full h-px bg-border" />

        <div className="flex items-center justify-between font-bold text-xl">
          <p className="flex items-baseline gap-1">
            <span>Total</span>
            <span className="font-semibold text-md text-primary-500">
              (ex. Tax)
            </span>
          </p>
          <div>{formatPrice(calculateTotal())}</div>
        </div>

        <Button
          disabled={!items.length}
          label="Checkout"
          className="mt-2"
          onClick={handleCheckout} />
      </div>

      <div className="flex items-center gap-2 py-5 font-medium">
        <Icon icon="solar:chat-line-outline" className="text-2xl text-primary-700" />
        <span className="text-primary-800"> Need help with your order?</span>
        <Link
          href="/cart"
          className="text-secondary underline underline-offset-4"
        >
          We&apos;re here to help
        </Link>
      </div>
    </div>
  )
}

export default CartSummary
