'use server'

import { payloadClient } from '@/lib/payload'
import { BaseResponse, PaginatedResponse, ProductFilters, QueryParams } from '@/types'
import { Brand, Collection, Model, Product } from '@/types/payload'
import { Where } from 'payload'
import { getPaginatedResponse } from '.'

export async function getProduct(productId: Product['id']): Promise<BaseResponse<Product>> {
  try {
    const product = await payloadClient.findByID({
      collection: 'products',
      id: productId,
      depth: 2
    })

    return { code: 200, message: "Product found", data: product }
  } catch (error) {
    console.error(error)
    return { code: 500, message: 'Something went wrong. Please try again!' }
  }
}

export async function getProducts(params?: QueryParams): Promise<PaginatedResponse<Product>> {
  try {
    return await getPaginatedResponse<Product>('products', params)
  } catch (error: any) {
    console.error(error)
    return { code: 500, message: error.message, data: [] }
  }
}

export async function findProducts(query: string, category?: string): Promise<BaseResponse<Product[]>> {
  const queryClause: Where = {
    and: [
      ...(category ? [{ "size_category": { equals: category } }] : []),
      {
        or: [
          { "brand.name": { like: query } },
          { "model.name": { like: query } },
          { name: { like: query } },
          { nickname: { like: query } }
        ]
      }
    ]
  }

  try {
    return await getProducts({ where: queryClause, limit: 6 })
  } catch (error: any) {
    console.error(error)
    return { code: 500, message: error.message }
  }
}

export async function filterProducts(filters: ProductFilters): Promise<BaseResponse<Product[]>> {
  const conditions: Where[] = []

  if (filters.brand) conditions.push({ 'brand.id': { equals: filters.brand } })
  if (filters.model) conditions.push({ 'model.id': { equals: filters.model } })
  if (filters.collection) conditions.push({ 'collection.id': { equals: filters.collection } })
  if (filters.size) conditions.push({ size_category: { equals: filters.size } })

  // TODO: Add cases for belowRetail and onSale
  // if (filters.filter === 'belowRetail') {
  //   conditions.push({
  //     sizes: {
  //       some: {
  //         price: {
  //           greater_than: 100, // This allows dynamic comparison
  //         },
  //       },
  //     },
  //   })
  // }

  if (filters.filter === 'onSale') {
    conditions.push({ 'sizes.discount': { greater_than: 0 } })
  }

  if (filters.filter === 'onSale') {
    conditions.push({
      sizes: {
        contains: { discount: { greater_than: 0 } }
      },
    });
  }

  try {
    return await getProducts({
      ...(conditions.length && { where: { and: conditions } }),
      ...(filters.sort && { sort: `${filters.dir === 'desc' ? '-' : ''}${filters.sort}` })
    })
  } catch (error: any) {
    console.log(error)
    return { code: 500, message: error.message }
  }
}

const extractId = (value: string | Collection | Brand | Model | null | undefined) => typeof value === 'string' ? value : value?.id

export async function getRelatedProducts(products: Product[], limit = 6) {
  let relatedProducts: Product[] = []
  const excludedIds = products.map((p) => p.id)

  const collectionIds = products.map((p) => extractId(p.collection)?.toString()).filter(Boolean)

  if (collectionIds.length) {
    const { data: similarCollection } = await getProducts({
      limit,
      where: {
        and: [
          { id: { not_in: excludedIds } },
          { collection: { in: collectionIds } }
        ]
      }
    })
    relatedProducts.push(...similarCollection)
  }

  if (relatedProducts.length < limit) {
    const remainder = limit - relatedProducts.length
    const brandIds = products.map((p) => extractId(p.brand)?.toString()).filter(Boolean)
    const modelIds = products.map((p) => extractId(p.model)?.toString()).filter(Boolean)

    const { data: similarBrandModel } = await getProducts({
      limit: remainder,
      where: {
        and: [
          { id: { not_in: [...excludedIds, ...relatedProducts.map((p) => p.id)] } },
          {
            or: [
              { brand: { in: brandIds } },
              { model: { in: modelIds } }
            ]
          }
        ]
      }
    })
    relatedProducts.push(...similarBrandModel)
  }

  if (relatedProducts.length < limit) {
    const remainder = limit - relatedProducts.length
    const { data: randomProducts } = await getProducts({
      limit: remainder,
      where: { id: { not_in: [...excludedIds, ...relatedProducts.map((p) => p.id)] } }
    })
    relatedProducts.push(...randomProducts)
  }

  return relatedProducts
}

export async function getBrands(params?: QueryParams): Promise<PaginatedResponse<Brand>> {
  try {
    return await getPaginatedResponse<Brand>('brands', params)
  } catch (error: any) {
    console.error(error)
    return { code: 500, message: error.message, data: [] }
  }
}

export async function getModels(params?: QueryParams): Promise<PaginatedResponse<Model>> {
  try {
    return await getPaginatedResponse<Model>('models', params)
  } catch (error: any) {
    console.error(error)
    return { code: 500, message: error.message, data: [] }
  }
}

export async function getCollections(params?: QueryParams): Promise<PaginatedResponse<Collection>> {
  try {
    return await getPaginatedResponse<Collection>('collections', params)
  } catch (error: any) {
    console.error(error)
    return { code: 500, message: error.message, data: [] }
  }
}
