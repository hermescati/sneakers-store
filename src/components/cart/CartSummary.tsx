'use client'

import routes from '@/lib/routes'
import { createStripeSession } from '@/services/checkout'
import { useCartStore } from '@/stores/cartStore'
import { OrderItem } from '@/types'
import { formatPrice } from '@/utils'
import { calculateCartSummary } from '@/utils/cart'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import Button from '../base/button/Button'
import IconButton from '../base/button/IconButton'
import DiscountCode from './base/DiscountCode'
import ShippingOptions from './base/ShippingOptions'
import Icon from '../base/Icon'

const CartSummary = () => {
  const router = useRouter()

  const { items, discount, shipping, clearDiscount, clearCart } = useCartStore()

  const { subtotal, discountValue, shippingCost, total } = useMemo(
    () => calculateCartSummary(items, discount, shipping),
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

    if (response?.code === 409) router.push(`${routes.auth.login}?origin=cart`)
    if (!response || !response.url) return

    clearCart()
    router.replace(response.url)
  }

  return (
    <div className="overflow-y-auto lg:sticky lg:top-40 3xl:max-h-screen">
      <div className="flex flex-col gap-4 rounded-xl border border-border p-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Order Summary</h2>
          <ShippingOptions />
          <DiscountCode />
        </div>

        <span className="flex h-px w-full bg-border" />

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
                <span className="flex items-center rounded-lg border-2 border-secondary-400 bg-secondary-100/10 px-2.5 py-0.5 text-md font-semibold uppercase text-secondary-400">
                  {discount.code}
                </span>
                <IconButton icon="tabler-x" className="p-1.5 text-lg" onClick={clearDiscount} />
              </div>
            )}
          </div>

          <p className="item-center flex justify-between font-medium text-primary-700">
            Delivery <span>{formatPrice(shippingCost)}</span>
          </p>
        </div>

        <span className="flex h-px w-full bg-border" />

        <div className="flex items-center justify-between text-xl font-bold">
          <p className="flex items-baseline gap-1">
            Total
            <span className="text-md font-semibold text-primary-500">(ex. Tax)</span>
          </p>
          <div>{formatPrice(total)}</div>
        </div>

        <Button
          disabled={!items.length}
          label="Checkout"
          className="mt-2"
          onClick={handleCheckout}
        />
      </div>

      <p className="py-5 font-medium leading-relaxed">
        <Icon
          icon="solar:chat-line-outline"
          className="inline align-middle text-2xl text-primary-700"
        />
        <span className="ml-2 text-primary-800">
          Need help with your order?{' '}
          <Link href={routes.cart} className="text-secondary underline underline-offset-4">
            We&apos;re here to help
          </Link>
        </span>
      </p>
    </div>
  )
}

export default CartSummary
