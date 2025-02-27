'use server'

import { stripeClient } from '@/lib/stripe'
import { OrderItem } from '@/types'
import {
  calculatePrice,
  capitalizeFirstLetter,
  getThumbnailImage
} from '@/utils'
import type Stripe from 'stripe'
import { getUser } from './auth'
import { createOrder } from './orders'
import { getProducts } from './products'

// FIXME: Could send the userid as a parameter to avoid the extra call to getUser
export async function createStripeSession(
  selectedProducts: OrderItem[],
  deliveryOption?: Stripe.ShippingRate,
  promoCode?: Stripe.PromotionCode
) {
  const { user } = await getUser()
  if (!user) return { code: 409, message: 'NOT_AUTHORIZED' }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

  if (!selectedProducts.length) return { code: 400, message: 'BAD_REQUEST' }

  const { products } = await getProducts({
    query: {
      id: { in: selectedProducts.map((p) => p.productId) }
    }
  })

  selectedProducts.forEach((selection) => {
    const product = products.find((p) => p.id === selection.productId)

    if (!product) return

    const selectedSize = product.sizes.find((s) => s.size === selection.size)

    if (!selectedSize) return

    const category = capitalizeFirstLetter(product.size_category)
    const productPrice = calculatePrice(selectedSize)
    const productThumbnail = `${process.env.NEXT_PUBLIC_API_URL}${getThumbnailImage(product)}`

    line_items.push({
      price_data: {
        currency: 'USD',
        product_data: {
          name: `${product.name} - ${product.nickname}`,
          description: `(US ${category}): ${selectedSize.size}`,
          images: [productThumbnail],
          tax_code: 'txcd_99999999'
        },
        unit_amount: Math.round(productPrice * 100)
      },
      quantity: 1
    })
  })

  const order = await createOrder(user, selectedProducts)
  if (!order) return

  try {
    const stripeSession = await stripeClient.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_API_URL}/thank-you?orderId=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/cart`,
      payment_method_types: ['card', 'klarna'],
      shipping_options: [{ shipping_rate: deliveryOption?.id }],
      phone_number_collection: { enabled: true },
      shipping_address_collection: {
        allowed_countries: [
          'AL',
          'US',
          'CA',
          'GB',
          'AU',
          'FR',
          'DE',
          'ES',
          'IT',
          'JP',
          'NL',
          'SE'
        ]
      },
      mode: 'payment',
      metadata: {
        userId: user.id,
        orderId: order.id
      },
      line_items,
      ...(promoCode && { discounts: [{ coupon: promoCode.coupon.id }] }),
      automatic_tax: { enabled: true }
    })

    return { url: stripeSession.url }
  } catch (err) {
    console.error(err)
    return { code: 400, message: 'BAD_REQUEST' }
  }
}

export async function getShippingRates() {
  const { data: rates } = await stripeClient.shippingRates.list()

  const activeRates = rates
    .filter((rate) => rate.active)
    .map((rate) => {
      // Stripe has them as whole numbers so they need to be divided by 100 to get the actual rate
      if (rate.fixed_amount) {
        return {
          ...rate,
          fixed_amount: {
            ...rate.fixed_amount,
            amount: rate.fixed_amount.amount / 100
          }
        }
      }
      return rate
    })
    .sort((a, b) => {
      if (a.fixed_amount && b.fixed_amount) {
        return a.fixed_amount.amount - b.fixed_amount.amount
      }
      return 0
    })

  return activeRates
}