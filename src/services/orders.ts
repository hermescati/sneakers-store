'use server'

import { OrderItem } from '@/types'
import { Order, User } from '@/types/payload'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

export async function createOrder(user: User, selectedProducts: OrderItem[]) {
  if (!user) return
  const payload = await getPayloadHMR({ config: configPromise })

  const products: Order['products'] = selectedProducts.map((p) => ({
    product: p.productId,
    price: p.price,
    size: p.size
  }))

  const order = await payload.create({
    collection: 'orders',
    data: {
      user: user.id,
      status: 'pending',
      products,
      history: [
        {
          status: 'pending',
          timestamp: new Date().toISOString()
        }
      ]
    }
  })

  return order
}

export async function getOrder(orderId: Order['id'], depth?: number) {
  if (!orderId) return
  const payload = await getPayloadHMR({ config: configPromise })

  const order = await payload.findByID({
    collection: 'orders',
    id: orderId,
    depth
  })

  return order
}

export async function getOrderStatus(orderId: Order['id']) {
  if (!orderId) return
  const order = await getOrder(orderId)

  return { status: order?.status }
}
