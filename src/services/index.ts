'use server'

import { payloadClient } from '@/lib/payload'
import {
  NavItem,
  NavItemGroups,
  NavLink,
  PaginatedResponse,
  QueryParams
} from '@/types'
import { CollectionSlug, DataFromCollectionSlug } from 'payload'
import { getBrands, getCollabs, getModels } from './products'
import routes from '@/lib/routes'

export async function getPaginatedResponse<
  T extends DataFromCollectionSlug<CollectionSlug>
>(slug: CollectionSlug, params?: QueryParams): Promise<PaginatedResponse<T>> {
  try {
    const {
      docs,
      totalDocs,
      hasPrevPage,
      prevPage,
      hasNextPage,
      nextPage,
      page,
      totalPages
    } = await payloadClient.find({
      collection: slug,
      ...params
    })

    const data: PaginatedResponse<T> = {
      code: 200,
      message: 'Records returned',
      data: docs as T[],
      metadata: {
        total: totalDocs,
        totalPages,
        currentPage: page || undefined,
        prevPage: hasPrevPage ? prevPage : undefined,
        nextPage: hasNextPage ? nextPage : undefined
      }
    }
    return data
  } catch (error) {
    console.error(error)

    const message =
      error instanceof Error
        ? error.message
        : 'Something went wrong. Please try again!'
    return { code: 500, message, data: [] }
  }
}

export async function getNavItems(): Promise<NavItemGroups> {
  const featuredLinks: NavItem[] = [
    { name: 'New Releases', href: routes.products.newReleases },
    { name: 'Below Retail', href: routes.products.belowRetail },
    { name: 'On Sale', href: routes.products.onSale }
  ]

  const otherLinks: NavItem[] = [
      { name: 'Womens', href: routes.products.womens },
    { name: 'Kids', href: routes.products.kids }
  ]

  const { data: brands } = await getBrands({ sort: 'createdAt' })
  const otherBrands = brands.length > 5 ? brands.splice(5) : []

  const brandLinks: NavItem[] = await Promise.all(
    brands.map(async (b) => {
      const [{ data: models }, { data: collabs }] = await Promise.all([
        getModels({
          where: { brand: { equals: b.id } },
          limit: 20,
          sort: 'createdAt'
        }),
        getCollabs({
          where: { brand: { equals: b.id } },
          limit: 5,
          sort: 'createdAt'
        })
      ])

      if (!models.length && !collabs.length) {
        return { name: b.name, href: `${routes.products.home}?brand=${b.slug}` }
      }

      const modelLinks: NavLink[] = models.map((m) => ({
        name: m.name,
        href: `${routes.products.home}brand=${b.slug}&model=${m.slug}`,
        ...(m.featured && {
          imageSrc: (typeof m.image === 'string'
            ? m.image
            : m.image?.url) as string
        })
      }))

      const collabLinks: NavLink[] = collabs.map((c) => ({
        name: c.name!,
        href: `${routes.products.home}?collaboration=${c.slug}`
      }))

      const items: NavLink[] = [
        ...modelLinks,
        ...collabLinks,
        { name: 'View All', href: `${routes.products.home}?brand=${b.slug}` }
      ]

      return {
        name: b.name,
        href: `${routes.products.home}?brand=${b.slug}`,
        items,
        featured: modelLinks.filter((link) => link.imageSrc)
      }
    })
  )

  if (otherBrands.length) {
    brandLinks.push({
      name: 'Others',
      items: otherBrands.map((b) => ({
        name: b.name,
        href: `/sneakers?brand=${b.slug}`
      }))
    })
  }

  return {
    featured: featuredLinks,
    brands: brandLinks,
    others: otherLinks
  }
}
