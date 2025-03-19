'use client'

import { createStripeSession } from '@/services/checkout'
import { useCartStore } from '@/stores/cartStore'
import { OrderItem } from '@/types'
import { formatPrice } from '@/utils'
import { calculateCartSummary } from '@/utils/cart'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import Button from '../base/button/Button'
import IconButton from '../base/button/IconButton'
import DiscountCode from './base/DiscountCode'
import ShippingOptions from './base/ShippingOptions'

const CartSummary = () => {
  const router = useRouter()

  const {
    items,
    discount,
    shipping,
    clearDiscount,
    clearCart
  } = useCartStore()

  const {
    subtotal,
    discountValue,
    shippingCost,
    total
  } = useMemo(() =>
    calculateCartSummary(items, discount, shipping),
    [items, discount, shipping]
  )

  const handleCheckout = async () => {
    const selectedProducts: OrderItem[] = items.map(({ product, size }) => {
      return { productId: product.id, size: size?.size as number, price: size?.price as number }
    })

    const response = await createStripeSession(
      selectedProducts,
      shipping || undefined,
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
          <ShippingOptions />
          <DiscountCode />
        </div>

        <span className="flex w-full h-px bg-border" />

        <div className="flex flex-col gap-2">
          <p className="flex items-center justify-between font-semibold text-primary-800">
            Cart Total <span>{formatPrice(subtotal)}</span>
          </p>

          <div className="flex flex-col gap-0.5 font-medium text-primary-700">
            <p className="flex items-baseline justify-between gap-x-4">
              Discount <span>{formatPrice(discountValue, { credit: true })}</span>
            </p>

            {!!discount && (
              <div className="flex items-center gap-x-1.5">
                <span className="flex items-center py-0.5 px-2.5 border-2 border-secondary-400 bg-secondary-100/10 text-secondary-400 rounded-lg font-semibold text-md uppercase">
                  {discount.code}
                </span>
                <IconButton icon="tabler-x" onClick={clearDiscount} className="p-1.5 text-lg" />
              </div>
            )}
          </div>

          <p className="flex item-center justify-between font-medium text-primary-700">
            Delivery <span>{formatPrice(shippingCost)}</span>
          </p>
        </div>

        <span className="flex w-full h-px bg-border" />

        <div className="flex items-center justify-between font-bold text-xl">
          <p className="flex items-baseline gap-1">
            Total
            <span className="font-semibold text-md text-primary-500">
              (ex. Tax)
            </span>
          </p>
          <div>{formatPrice(total)}</div>
        </div>

        <Button
          disabled={!items.length}
          label="Checkout"
          className="mt-2"
          onClick={handleCheckout} />
      </div>

      <p className="py-5 font-medium leading-relaxed">
        <Icon icon="solar:chat-line-outline" className="text-2xl text-primary-700 inline align-middle" />
        <span className="ml-2 text-primary-800">
          Need help with your order?{" "}
          <Link
            href="/cart"
            className="text-secondary underline underline-offset-4"
          >
            We&apos;re here to help
          </Link>
        </span>
      </p>

    </div>
  )
}

export default CartSummary
