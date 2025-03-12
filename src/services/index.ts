'use server'

import { payloadClient } from "@/lib/payload"
import { NavItem, NavLink, PaginatedResponse, QueryParams } from "@/types"
import { generateNavLinkHref } from "@/utils"
import { CollectionSlug, DataFromCollectionSlug } from "payload"
import { getBrands, getCollections, getModels } from "./products"

export async function getPaginatedResponse<T extends DataFromCollectionSlug<CollectionSlug>>(
    slug: CollectionSlug,
    params?: QueryParams
): Promise<PaginatedResponse<T>> {
    try {
        const {
            docs,
            totalDocs,
            hasPrevPage,
            prevPage,
            hasNextPage,
            nextPage,
            page,
            totalPages,
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

        const message = error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again!'
        return { code: 500, message, data: [] }
    }
}

export async function getNavLinks(): Promise<NavItem[]> {
    const staticLinks: NavItem[] = [
        { name: 'New Releases', href: '/sneakers?sort=release_date&dir=desc' },
        { name: 'Womens', href: '/sneakers?size=womens' },
        { name: 'Kids', href: '/sneakers?size=kids' },
        { name: 'Below Retail', href: '/sneakers?filter=belowRetail' },
        { name: 'On Sale', href: '/sneakers?filter=onSale' }
    ]

    const navItems: NavItem[] = [staticLinks[0]]

    const { data: brands } = await getBrands({ sort: 'createdAt' })
    const otherBrands = brands.length > 5 ? brands.splice(5) : []

    const featuredNavLinks = await Promise.all(
        brands.map(async (b) => {
            const [
                { data: models },
                { data: collections }
            ] = await Promise.all([
                getModels({
                    where: { brand: { equals: b.id } },
                    limit: 20,
                    sort: 'createdAt'
                }),
                getCollections({
                    where: { brand: { equals: b.id } },
                    limit: 5,
                    sort: 'createdAt'
                })
            ])

            if (!models.length && !collections.length) {
                return { name: b.name, href: `/sneakers?brand=${b.slug}` }
            }

            const modelLinks: NavLink[] = models.map((m) => ({
                name: m.name,
                href: generateNavLinkHref('model', b.slug!, m.slug!),
                ...(m.featured && {
                    imageSrc: (typeof m.image === 'string'
                        ? m.image
                        : m.image?.url
                    ) as string
                })
            }))

            const collectionLinks: NavLink[] = collections.map((c) => ({
                name: c.name,
                href: generateNavLinkHref('collection', b.slug!, c.slug!)
            }))

            const items: NavLink[] = [
                ...modelLinks,
                ...collectionLinks,
                { name: 'View All', href: `/sneakers?brand=${b.slug}` }
            ]

            return {
                name: b.name,
                items,
                featured: [...modelLinks].filter((link) => link.imageSrc)
            }
        })
    )

    navItems.push(...featuredNavLinks)

    if (otherBrands.length) {
        navItems.push({
            name: 'Others',
            items: otherBrands.map((b) => ({
                name: b.name,
                href: `/sneakers?brand=${b.slug}`
            }))
        })
    }

    navItems.push(...staticLinks.slice(1))
    return navItems
}