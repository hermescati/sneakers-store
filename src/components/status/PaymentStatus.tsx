'use client'

import { getOrderStatus } from '@/services/orders'
import { Order } from '@/types/payload'
import { useEffect, useState } from 'react'
import StatusBadge from './StatusBadge'
import StatusIcon from './StatusIcon'

const PaymentStatus = ({ order }: { order: Order }) => {
  const [orderStatus, setOrderStatus] = useState<Order['status'] | null>(null)

  useEffect(() => {
    const pollOrderStatus = async () => {
      const response = await getOrderStatus(order.id)
      if (!response) return
      const { status } = response
      if (!status) return
      setOrderStatus(status)

      if (status !== 'pending') {
        clearInterval(pollingInterval)
      }
    }

    pollOrderStatus()
    const pollingInterval = setInterval(pollOrderStatus, 3000)

    return () => clearInterval(pollingInterval)
  }, [order.id])

  return (
    <div className="flex flex-col gap-6 lg:gap-10">
      <StatusIcon status={orderStatus} />

      <div className="flex flex-col gap-3">
        <StatusBadge status={orderStatus} />

        <header>
          <h1 className="text-3xl font-bold">Thank you for your order!</h1>
          {orderStatus === 'completed' ? (
            <p className="text-base text-primary-600">
              Your order is confirmed, and we&apos;re just as excited as you
              are!. We&apos;ve sent your receipt and order details to your email{' '}
              {typeof order.user !== 'string' && (
                <span className="font-semibold text-gray-900">
                  {order.user.email}
                </span>
              )}
              .
            </p>
          ) : (
            <p className="text-base text-primary-600">
              We appreciate your order, and we&apos;re currently processing it.
              So hang tight and we&apos;ll send you the confirmation details
              very soon!
            </p>
          )}
        </header>
      </div>
    </div>
  )
}

export default PaymentStatus
