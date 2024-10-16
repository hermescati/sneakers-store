'use server'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { NavFeaturedLink, NavItem, NavLink } from '@/types'
import { generateNavLink } from '@/utils'

export async function getNavbarItems(): Promise<NavItem[]> {
  const payload = await getPayloadHMR({ config: configPromise })

  const navItems: NavItem[] = []

  const { docs: brands } = await payload.find({
    collection: 'brands',
    sort: 'createdAt'
  })

  // const { docs: collections } = await payload.find({
  //   collection: 'collections'
  // })

  navItems.push({
    name: 'New Releases',
    href: '/sneakers'
  })

  for (const brand of brands) {
    const brandModels: NavLink[] = []

    const { docs: models } = await payload.find({
      collection: 'models',
      where: { brand: { equals: brand.id } },
      depth: 1,
      limit: 20,
      sort: 'createdAt'
    })

    brandModels.push({
      name: 'View all',
      href: `/sneakers?brand=${brand.name}`
    })

    models.map((model) => {
      brandModels.push({
        name: model.name,
        href: generateNavLink('model', brand.id, model.id)
      })
    })

    const featuredModels: NavFeaturedLink[] = models
      .filter((model) => model.featured)
      .map((model) => ({
        name: model.name,
        imageSrc: (typeof model.image === 'string'
          ? model.image
          : model.image?.url) as string,
        href: generateNavLink('model', brand.id, model.id)
      }))

    navItems.push({
      name: brand.name,
      items: brandModels,
      featured: featuredModels
    })
  }

  navItems.push(
    {
      name: 'Womens',
      href: '/sneakers'
    },
    {
      name: 'Kids',
      href: '/sneakers'
    },
    {
      name: 'Below Retail',
      href: '/sneakers'
    },
    {
      name: 'On Sale',
      href: '/sneakers'
    }
  )

  // brands.forEach(async (brand) => {})

  // return brands.forEach(async (brand) => {
  //   // Models
  //   const modelLinks: NavLink[] = brandModels.map((model) => ({
  //     name: model.name,
  //     href: generateNavLink('model', brand.name, model.name)
  //   }))
  //   const featuredModels: NavFeaturedLink[] = brandModels
  //     .filter((model) => model.featured)
  //     .map((model) => ({
  //       name: model.name,
  //       imageSrc: model.image || '',
  //       href: generateNavLink('model', brand.name, model.name)
  //     }))

  //   // Collections
  //   const brandCollections = collections.filter(
  //     (collection) => collection.brand === brand.id
  //   )
  //   const collectionLinks: NavLink[] = brandCollections.map((collection) => ({
  //     name: collection.name,
  //     href: generateNavLink('collection', brand.name, collection.name)
  //   }))
  //   const featuredCollections: NavFeaturedLink[] = brandCollections
  //     .filter((collection) => collection.featured)
  //     .map((collection) => ({
  //       name: collection.name,
  //       imageSrc: collection.image || '',
  //       href: generateNavLink('collection', brand.name, collection.name)
  //     }))

  //   // Combine models and collections
  //   const items = [...modelLinks, ...collectionLinks]
  //   const featured = [...featuredModels, ...featuredCollections]

  //   return {
  //     name: brand.name,
  //     items,
  //     featured
  //   }
  // })

  return navItems
}
