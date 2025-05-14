'use client'

import { useCartStore } from '@/stores/cartStore'
import { getShippingRates } from '@/services/checkout'
import { cn, formatPrice } from '@/utils'
import { useEffect, useState } from 'react'
import Stripe from 'stripe'
import ShippingOptionsSkeleton from '../skeletons/ShippingOptionsSkeleton'

const ShippingOptions = () => {
  const { shipping, setShipping } = useCartStore()
  const [options, setOptions] = useState<Stripe.ShippingRate[]>([])

  useEffect(() => {
    const getShippingOptions = async () => {
      const options = await getShippingRates()
      if (!options.length) return
      setOptions(options)
    }
    getShippingOptions()
  }, [])

  if (!options.length) return <ShippingOptionsSkeleton length={2} />

  const getDeliveryEstimate = (method: Stripe.ShippingRate) => {
    const min = method.delivery_estimate?.minimum?.value
    const max = method.delivery_estimate?.maximum?.value
    let unit = ''

    if (method.delivery_estimate?.minimum?.unit === 'business_day') unit = 'business days'

    return { min, max, unit }
  }

  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-semibold text-primary-700">Delivery</h4>

      <ul className="grid sm:grid-cols-2 items-center gap-2">
        {options.map(option => {
          const { min, max, unit } = getDeliveryEstimate(option)

          return (
            <li key={option.id}>
              <button
                onClick={() => setShipping(option)}
                className={cn(
                  'w-full flex sm:flex-col sm:gap-y-2 items-start justify-between py-3 px-3 rounded-xl border-2 border-primary-300 cursor-pointer transition-all ease-in-out duration-300',
                  {
                    'border-secondary bg-secondary-100/10 dark:bg-secondary-100/5':
                      shipping?.id === option.id
                  }
                )}
              >
                <div>
                  <h4 className="font-semibold">{option.display_name}</h4>
                  <p className="flex item-center font-medium text-md text-primary-600 dark:text-primary-700">
                    {min}-{max} {unit}
                  </p>
                </div>

                <h4 className="font-semibold">
                  {formatPrice(option.fixed_amount ? option.fixed_amount?.amount : 0)}
                </h4>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ShippingOptions
