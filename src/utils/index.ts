import { Event } from '@/types/payload'
import { ClassValue, clsx } from 'clsx'
import Stripe from 'stripe'
import { twMerge } from 'tailwind-merge'

// TODO: Organize util functions
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const formatPrice = (
  price: number | string,
  options: {
    currency?: 'USD' | 'EUR' | 'GBP'
    notation?: Intl.NumberFormatOptions['notation']
    credit?: boolean,
    fractionDigits?: number
  } = {}
) => {
  const { currency = 'USD', notation = 'standard', credit = false, fractionDigits = 2 } = options
  let numericPrice = typeof price === 'string' ? parseFloat(price) : price

  if (credit && numericPrice > 0) {
    numericPrice = -numericPrice
  }

  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: fractionDigits
  }).format(numericPrice)
}

export const capitalizeFirstLetter = (input: string) => {
  if (!input) return ''
  return input.charAt(0).toUpperCase() + input.slice(1)
}

export const generateNavLinkHref = (
  type: 'model' | 'collection',
  brandSlug: string,
  itemSlug: string
) =>
  `/sneakers?brand=${brandSlug}&${type}=${itemSlug}`

export const constructCouponMetadata = (event: Event) => {
  const metadata: Stripe.MetadataParam = {}

  if (event.appliedToAll) {
    metadata['targetAll'] = "true"
    return metadata
  }

  if (Array.isArray(event.appliedTo) && event.appliedTo.length > 0) {
    event.appliedTo.forEach(({ relationTo, value }) => {
      const key = `target_${relationTo}`
      metadata[key] = value as string
    })
  }

  return metadata
}