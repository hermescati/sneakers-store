'use server'

import { payloadClient } from '@/lib/payload'
import { BaseResponse, WishlistStatus } from '@/types'
import { Product, User, Wishlist } from '@/types/payload'

async function getUserWishlist(userId: User['id'], depth = 0): Promise<Wishlist | null> {
  const { docs } = await payloadClient.find({
    collection: 'wishlist',
    where: { user: { equals: userId } },
    limit: 1,
    depth
  })
  return docs[0] ?? null
}

export async function isWishlisted(userId: User['id'], productId: Product['id']): Promise<boolean> {
  const wishlist = await getUserWishlist(userId)
  return wishlist?.products?.includes(productId) ?? false
}

export async function getWishlistItems(userId: User['id']): Promise<BaseResponse<Product[]>> {
  try {
    const wishlist = await getUserWishlist(userId, 2)
    return {
      code: 200,
      message: 'OK',
      data: (wishlist?.products as Product[]) ?? []
    }
  } catch (error) {
    console.error(error)
    return {
      code: 500,
      message: error instanceof Error ? error.message : 'Something went wrong. Please try again!',
      data: []
    }
  }
}

export async function addToWishlist(
  userId: User['id'],
  productId: Product['id']
): Promise<BaseResponse<WishlistStatus>> {
  const wishlist = await getUserWishlist(userId)

  if (!wishlist) {
    await payloadClient.create({
      collection: 'wishlist',
      data: {
        user: userId,
        products: [productId]
      }
    })
  } else if (wishlist.products && !wishlist.products?.includes(productId)) {
    await payloadClient.update({
      collection: 'wishlist',
      id: wishlist.id,
      data: { products: [...wishlist.products, productId] }
    })
  }

  return {
    code: 200,
    message: 'Product added to your wishlist',
    data: 'added'
  }
}

export async function removeFromWishlist(
  userId: User['id'],
  productId: Product['id']
): Promise<BaseResponse<WishlistStatus>> {
  const wishlist = await getUserWishlist(userId)

  if (!wishlist?.products?.includes(productId)) {
    return {
      code: 200,
      message: 'Product not in wishlist',
      data: 'removed'
    }
  }

  await payloadClient.update({
    collection: 'wishlist',
    id: wishlist.id,
    data: { products: wishlist.products.filter(id => id !== productId) }
  })

  return {
    code: 200,
    message: 'Product removed from your wishlist',
    data: 'removed'
  }
}

export async function toggleWishlist(
  userId: User['id'],
  productId: Product['id']
): Promise<BaseResponse<WishlistStatus>> {
  const isInWishlist = await isWishlisted(userId, productId)
  return isInWishlist
    ? await removeFromWishlist(userId, productId)
    : await addToWishlist(userId, productId)
}

export async function clearWishlist(userId: User['id']): Promise<BaseResponse<null>> {
  const wishlist = await getUserWishlist(userId)

  if (!wishlist) {
    return {
      code: 404,
      message: 'Wishlist not found',
      data: null
    }
  }

  if (!wishlist.products || wishlist.products.length === 0) {
    return {
      code: 200,
      message: 'Wishlist is already empty',
      data: null
    }
  }

  try {
    await payloadClient.update({
      collection: 'wishlist',
      id: wishlist.id,
      data: { products: [] }
    })

    return {
      code: 200,
      message: 'All products removed from wishlist',
      data: null
    }
  } catch (error) {
    console.error(error)
    return {
      code: 500,
      message: error instanceof Error ? error.message : 'Something went wrong. Please try again!',
      data: null
    }
  }
}
