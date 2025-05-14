'use server'

import { payloadClient } from '@/lib/payload'
import { BaseResponse, PaginatedResponse, ProductFilters, QueryParams } from '@/types'
import { Brand, Collaboration, Model, Product } from '@/types/payload'
import { Sort, Where } from 'payload'
import { getPaginatedResponse } from '.'

const MIN_QUERY_LENGTH = 3

export async function getProduct(slug: Product['slug']): Promise<BaseResponse<Product>> {
  try {
    const { docs: products } = await payloadClient.find({
      collection: 'products',
      where: { slug: { equals: slug } },
      depth: 2
    })

    return { code: 200, message: 'Product found', data: products[0] }
  } catch (error) {
    console.error(error)
    return {
      code: 500,
      message: error instanceof Error ? error.message : 'Something went wrong. Please try again!'
    }
  }
}

export async function getProducts(params?: QueryParams): Promise<PaginatedResponse<Product>> {
  try {
    return await getPaginatedResponse<Product>('products', params)
  } catch (error) {
    console.error(error)
    return {
      code: 500,
      message: error instanceof Error ? error.message : 'Something went wrong. Please try again!',
      data: []
    }
  }
}

export async function getBrands(params?: QueryParams): Promise<PaginatedResponse<Brand>> {
  try {
    return await getPaginatedResponse<Brand>('brands', params)
  } catch (error) {
    console.error(error)
    return {
      code: 500,
      message: error instanceof Error ? error.message : 'Something went wrong. Please try again!',
      data: []
    }
  }
}

export async function getModels(params?: QueryParams): Promise<PaginatedResponse<Model>> {
  try {
    return await getPaginatedResponse<Model>('models', params)
  } catch (error) {
    console.error(error)
    return {
      code: 500,
      message: error instanceof Error ? error.message : 'Something went wrong. Please try again!',
      data: []
    }
  }
}

export async function getCollabs(params?: QueryParams): Promise<PaginatedResponse<Collaboration>> {
  try {
    return await getPaginatedResponse<Collaboration>('collaborations', params)
  } catch (error) {
    console.error(error)
    return {
      code: 500,
      message: error instanceof Error ? error.message : 'Something went wrong. Please try again!',
      data: []
    }
  }
}

export async function discoverProducts(
  query: ProductFilters['query'],
  category?: Product['size_category']
): Promise<PaginatedResponse<Product>> {
  if (!query || query.trim().length < MIN_QUERY_LENGTH) {
    return {
      code: 400,
      message: 'Query too short',
      data: []
    }
  }

  const where = applyFilters({
    query,
    ...(category ? { category } : {})
  })

  try {
    return await getProducts({ where, limit: 6 })
  } catch (error) {
    console.error(error)
    return {
      code: 500,
      message: error instanceof Error ? error.message : 'Something went wrong. Please try again!',
      data: []
    }
  }
}

export async function filterProducts(filters: ProductFilters): Promise<PaginatedResponse<Product>> {
  const where = applyFilters(filters)
  const sort = applySorting(filters)

  try {
    return await getProducts({ where, sort })
  } catch (error) {
    console.error(error)
    return {
      code: 500,
      message: error instanceof Error ? error.message : 'Something went wrong. Please try again!',
      data: []
    }
  }
}

export async function getProductsUnderRetail(
  filters: ProductFilters
): Promise<PaginatedResponse<Product>> {
  const where = applyFilters(filters)
  const sort = applySorting(filters)

  try {
    const { data } = await getProducts({ where, sort })
    const products: Product[] = data.filter(p => {
      if (!p.min_price) return
      p.min_price <= p.retail_price
    })

    return {
      code: 200,
      message: 'Products found',
      data: products,
      metadata: {
        total: products.length,
        totalPages: 1
      }
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

export async function getProductsOnSale(filters: ProductFilters) {
  const where = applyFilters(filters) || { and: [] }
  where.and?.push({ 'discount.value': { greater_than: 0 } })
  const sort = applySorting(filters)

  try {
    return await getProducts({ where, sort })
  } catch (error) {
    console.error(error)
    return {
      code: 500,
      message: error instanceof Error ? error.message : 'Something went wrong. Please try again!',
      data: []
    }
  }
}

export async function getRelatedProducts(products: Product[], limit = 6) {
  const excludedIds = products.map(p => p.id)
  const brandIds = products.map(p => extractId(p.brand)?.toString()).filter(Boolean)
  const modelIds = products.map(p => extractId(p.model)?.toString()).filter(Boolean)
  const collabIds = products.map(p => extractId(p.collaboration)?.toString()).filter(Boolean)

  const queries: Promise<PaginatedResponse<Product>>[] = []

  if (collabIds.length) {
    queries.push(
      getProducts({
        limit,
        where: { and: [{ id: { not_in: excludedIds } }, { collaboration: { in: collabIds } }] }
      })
    )
  }

  if (brandIds.length || modelIds.length) {
    queries.push(
      getProducts({
        limit,
        where: {
          and: [
            { id: { not_in: excludedIds } },
            { or: [{ brand: { in: brandIds } }, { model: { in: modelIds } }] }
          ]
        }
      })
    )
  }

  const results = await Promise.all(queries)
  const relatedProducts = results.flatMap(res => res.data)

  if (relatedProducts.length < limit) {
    const { data: randomProducts } = await getProducts({
      limit: limit - relatedProducts.length,
      where: { id: { not_in: [...excludedIds, ...relatedProducts.map(p => p.id)] } }
    })
    relatedProducts.push(...randomProducts)
  }

  return relatedProducts
}

// Private functions
function applyFilters(filters: Omit<ProductFilters, 'sort' | 'order'>): Where | undefined {
  const conditions: Where[] = []

  if (filters.query && filters.query.trim().length >= MIN_QUERY_LENGTH) {
    conditions.push({
      or: [
        { 'brand.slug': { like: filters.query } },
        { 'model.slug': { like: filters.query } },
        { 'collaboration.slug': { like: filters.query } },
        { slug: { like: filters.query } }
      ]
    })
  }

  if (filters.brand?.length) {
    conditions.push({ 'brand.slug': { in: filters.brand } })
  }
  if (filters.model?.length) {
    conditions.push({ 'model.slug': { in: filters.model } })
  }
  if (filters.collaboration?.length) {
    conditions.push({ 'collaboration.slug': { in: filters.collaboration } })
  }
  if (filters.category) {
    conditions.push({ size_category: { equals: filters.category } })
  }
  if (filters.size?.length) {
    conditions.push({
      and: [{ 'stock.size': { in: filters.size } }, { 'stock.quantity': { greater_than: 0 } }]
    })
  }
  if (filters.price) {
    const [min, max] = filters.price.split('-').map(Number)
    conditions.push({
      and: [{ min_price: { greater_than_equal: min } }, { min_price: { less_than_equal: max } }]
    })
  }

  return conditions.length ? { and: conditions } : undefined
}

function applySorting(filters: Pick<ProductFilters, 'sort' | 'order'>): Sort | undefined {
  if (!filters.sort) return undefined

  // TODO: Implement the logic here
  if (filters.sort === 'best_selling') {
    return undefined
  }

  return `${filters.order === 'desc' ? '-' : ''}${filters.sort}`
}

function extractId(value: string | Collaboration | Brand | Model | null | undefined) {
  return typeof value === 'string' ? value : value?.id
}
