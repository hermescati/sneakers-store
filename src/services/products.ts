'use server'

import { Product } from '@/types/payload'
import { shuffleArray } from '@/utils'
import configPromise from '@payload-config'
import { Where, getPayload } from 'payload'

type QueryParams = {
  query?: Where
  limit?: number
  sort?: string
}

export async function getProducts({ query, limit, sort }: QueryParams) {
  const payload = await getPayload({ config: configPromise })

  const {
    docs: products,
    hasNextPage,
    nextPage
  } = await payload.find({
    collection: 'products',
    where: query,
    limit,
    sort,
    depth: 1
  })

  return {
    products,
    nextPage: hasNextPage && nextPage
  }
}

export async function searchProducts(query: string, category: string):Promise<Partial<Product>[]> {
  console.log({query, category})
  return [
    { 
      id: "result_1",
      brand: "Nike",
      model: "Air Force 1",
      nickname: "Travis Scott - Cactus Jack",
      size_category: "mens",
      images: [{ image: "/mens-shoes-collection.jpg" }] 
    },
    { 
      id: "result_2",
      brand: "Nike",
      model: "Air Force 1",
      nickname: "Travis Scott - Cactus Jack",
      size_category: "mens",
      images: [{ image: "/mens-shoes-collection.jpg" }] 
    }
  ]
}

export async function getProduct(productId: Product['id']) {
  const payload = await getPayload({ config: configPromise })

  const product = await payload.findByID({
    collection: 'products',
    id: productId,
    depth: 2
  })

  return product
}

export async function getRelatedProducts(product: Product, limit = 6) {
  let products: Product[] = []

  // First prioritize collection
  const collectionQuery: Where = {
    and: [
      { id: { not_in: [product.id] } },
      { collection: { equals: product.collection } }
    ]
  }

  const { products: collectionProducts } = await getProducts({
    query: collectionQuery
  })

  // If not enough, use the product name or the brand
  if (collectionProducts.length < limit!) {
    const remainder = limit! - collectionProducts.length

    const relatedQuery: Where = {
      and: [
        {
          id: { not_in: [product.id, ...collectionProducts.map((p) => p.id)] }
        },
        { size_category: { equals: product.size_category } },
        {
          or: [
            { name: { like: product.name } },
            { 'brand.name': { equals: product.brand } }
          ]
        }
      ]
    }

    const { products: relatedProducts } = await getProducts({
      limit: remainder,
      query: relatedQuery
    })

    products = [...collectionProducts, ...relatedProducts]
  } else {
    products = collectionProducts
  }

  // Randomly shuffle the array of products
  return shuffleArray(products).slice(0, limit)
}

export async function getBrands({ query, limit, sort }: QueryParams) {
  const payload = await getPayload({ config: configPromise })

  const { docs: brands } = await payload.find({
    collection: 'brands',
    where: query,
    limit,
    sort,
    depth: 0
  })

  return brands
}

export async function getCollections({ query, limit, sort }: QueryParams) {
  const payload = await getPayload({ config: configPromise })

  const {
    docs: collections,
    hasNextPage,
    nextPage
  } = await payload.find({
    collection: 'collections',
    where: query,
    limit,
    sort,
    depth: 1
  })

  return {
    collections,
    nextPage: hasNextPage && nextPage
  }
}
