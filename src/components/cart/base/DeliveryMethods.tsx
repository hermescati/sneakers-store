'use client'

import { useCart } from '@/hooks/use-cart'
import { getShippingRates } from '@/services/checkout'
import { cn, formatPrice } from '@/utils'
import { useEffect, useState } from 'react'
import Stripe from 'stripe'
import DeliveryMethodsSkeleton from '../skeletons/DeliveryMethodsSkeleton'

const DeliveryMethods = () => {
  const { shippingMethod, setDeliveryMethod } = useCart()
  const [methods, setMethods] = useState<Stripe.ShippingRate[]>([])

  useEffect(() => {
    const getDeliveryMethods = async () => {
      const options = await getShippingRates()

      if (!options.length) return
      setMethods(options)
    }

    getDeliveryMethods()
  }, [])

  if (!methods.length) return <DeliveryMethodsSkeleton />

  const getDeliveryEstimate = (method: Stripe.ShippingRate) => {
    const min = method.delivery_estimate?.minimum?.value
    const max = method.delivery_estimate?.maximum?.value
    let unit = ''

    if (method.delivery_estimate?.minimum?.unit === 'business_day')
      unit = 'business days'

    return { min, max, unit }
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-bold">Delivery</h3>

      <ul className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 items-center gap-3">
        {methods.map((method) => {
          const { min, max, unit } = getDeliveryEstimate(method)

          return (
            <li key={method.id}>
              <button
                className={cn(
                  'w-full flex flex-col items-start justify-between p-3 rounded-xl border-2 border-primary-300 cursor-pointer transition-all ease-in-out duration-300',
                  {
                    'border-secondary bg-secondary/5':
                      shippingMethod?.id === method.id
                  }
                )}
                onClick={() => setDeliveryMethod(method)}
              >
                <h4 className="font-semibold text-primary-700">
                  {method.display_name}
                </h4>

                <div className="text-md text-primary-500">
                  <span>{min}</span>-<span>{max}</span> <span>{unit}.</span>
                </div>

                <span className="mt-2 font-semibold">
                  {formatPrice(
                    method.fixed_amount ? method.fixed_amount?.amount : 0
                  )}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default DeliveryMethods
