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

export const parseQueryParams = (param?: string | string[]): string[] | undefined => {
  if (!param) return undefined
  return Array.isArray(param) ? param : [param]
}

export const arraysEqual = <T>(a: T[], b: T[]): boolean => {
  if (a.length !== b.length) return false
  const sortedA = [...a].sort()
  const sortedB = [...b].sort()
  return sortedA.every((value, index) => value === sortedB[index])
}

// FIXME: Deprecate this function
export const capitalizeFirstLetter = (input: string) => {
  if (!input) return ''
  return input.charAt(0).toUpperCase() + input.slice(1)
}

// TODO: Move this function to where its needed
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