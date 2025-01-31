'use server'

import { NavItem, NavLink } from '@/types'
import { generateNavLink } from '@/utils'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function getNavbarItems(): Promise<NavItem[]> {
  const staticRoutes: NavItem[] = [
    { name: 'New Releases', href: '/sneakers' },
    { name: 'Womens', href: '/sneakers' },
    { name: 'Kids', href: '/sneakers' },
    { name: 'Below Retail', href: '/sneakers' },
    { name: 'On Sale', href: '/sneakers' }
  ]
  const navItems: NavItem[] = [staticRoutes[0]]

  const payload = await getPayload({ config: configPromise })
  const { docs: brands } = await payload.find({
    collection: 'brands',
    sort: 'createdAt'
  })

  const featuredBrands = brands.slice(0, 5)
  const brandNavItems = await Promise.all(featuredBrands.map(async (brand) => {
    const { docs: models } = await payload.find({
      collection: 'models',
      where: { brand: { equals: brand.id } },
      depth: 1,
      limit: 20,
      sort: 'createdAt'
    })

    if (!models.length) {
      return { name: brand.name, href: `/sneakers?brand=${brand.id}` }
    }

    const brandModels: NavLink[] = models.map((model) => ({
      name: model.name,
      href: generateNavLink('model', brand.id, model.id),
      ...(model.featured && {
        imageSrc: (typeof model.image === 'string'
          ? model.image
          : model.image?.url) as string
      })
    }))

    return {
      name: brand.name,
      items: [...brandModels, { name: 'View All', href: `/sneakers?brand=${brand.id}` }],
      featured: brandModels.filter((m) => m.imageSrc)
    }
  }))

  navItems.push(...brandNavItems)

  if (brands.length > 5) {
    navItems.push({
      name: 'Other Brands',
      items: brands.slice(5).map((brand) => ({
        name: brand.name,
        href: `/sneakers?brand=${brand.id}`
      }))
    })
  }

  navItems.push(...staticRoutes.slice(1))
  return navItems

  // const featuredModels: NavFeaturedLink[] = models
  //   .filter((model) => model.featured)
  //   .map((model) => ({
  //     name: model.name,
  //     imageSrc: (typeof model.image === 'string'
  //       ? model.image
  //       : model.image?.url) as string,
  //     href: generateNavLink('model', brand.id, model.id)
  //   }))

  // const { docs: collections } = await payload.find({
  //   collection: 'collections'
  // })

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
}
