import { CartItem } from '@/hooks/use-cart'
import { ProductSize } from '@/types'
import { Event, Product } from '@/types/payload'
import { ClassValue, clsx } from 'clsx'
import Stripe from 'stripe'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const formatPrice = (
  price: number | string,
  options: {
    currency?: 'USD' | 'EUR' | 'GBP'
    notation?: Intl.NumberFormatOptions['notation']
  } = {}
) => {
  const { currency = 'USD', notation = 'standard' } = options
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price

  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2
  }).format(numericPrice)
}

export const shuffleArray = <T>(array: T[]) =>
  array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item)

export const capitalizeFirstLetter = (input: string) => {
  if (!input) return ''
  return input.charAt(0).toUpperCase() + input.slice(1)
}

export const getProductInfo = (product: Product) => {
  const brand =
    typeof product.brand === 'string' ? product.brand : product.brand.name
  const model =
    typeof product.model === 'string' ? product.model : product.model.name
  const collection =
    typeof product.collection === 'string'
      ? product.collection
      : product.collection?.name

  return { brand, model, collection }
}

export const calculatePrice = (size: ProductSize) => {
  return size.discount ? size.price * (1 - size.discount) : size.price
}

export const calculateMinPrices = (product: Product) => {
  const priceSummary = product.sizes.reduce(
    (min, size) => {
      const basePrice = size.price ?? Infinity
      const discountedPrice = size.discount
        ? basePrice * (1 - size.discount)
        : basePrice

      if (discountedPrice < min.discountedPrice) {
        return { basePrice, discountedPrice }
      }

      return min
    },
    { basePrice: Infinity, discountedPrice: Infinity }
  )

  return {
    basePrice: priceSummary.basePrice,
    discountedPrice:
      priceSummary.discountedPrice !== priceSummary.basePrice
        ? priceSummary.discountedPrice
        : null
  }
}

export const calculateCartTotal = (items: CartItem[]) => {
  return items.reduce((total, { size }) => {
    if (!size.stock) return total

    const price = calculatePrice(size)
    return price + total
  }, 0)
}

export const getThumbnailImage = (product: Product) => {
  const image = product.images[0].image
  return typeof image === 'string'
    ? image
    : (image.sizes?.thumbnail?.url as string)
}

export const generateNavLink = (
  type: 'model' | 'collection',
  brandName: string,
  itemName: string
) =>
  `/sneakers?brand=${encodeURIComponent(brandName)}&${type}=${encodeURIComponent(itemName)}`

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