import { getBrands } from '@/services/products'
import { cn } from '@/utils'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from '../base/Link'
import BrandLogo from '../product/base/BrandLogo'
import DiscoverySkeleton from './skeletons/DiscoverySkeleton'

type DiscoverCardItem = {
  name: string
  href: string
  icon?: string
}

type CategoryCardItem = {
  name: string
  href: string
  imageSrc: string
  imageAlt: string
}

const DiscoverCard = ({ name, href, icon }: DiscoverCardItem) => {
  return (
    <Link
      href={href}
      className={cn(
        'aspect-square md:aspect-video xl:aspect-square flex flex-col items-center justify-center rounded-2xl bg-primary-200 hover:bg-primary-400/30 transition-all ease-in-out duration-300',
        { 'text-secondary': name === 'On Sale' }
      )}
    >
      {!icon ? (
        <BrandLogo brand={name} className="text-4xl" />
      ) : (
        <Icon icon={icon} className="text-4xl" />
      )}
      <div className="mt-2 font-semibold">{name}</div>
    </Link>
  )
}

const CategoryCard = ({ name, href, imageSrc, imageAlt }: CategoryCardItem) => {
  return (
    <Link
      href={href}
      underline={false}
      className="group relative aspect-video lg:aspect-square flex p-8 items-center lg:items-end justify-center rounded-2xl overflow-clip"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 33vw"
        className="w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 transition-all duration-300 group-hover:bg-primary-900/20" />

      <div className="z-10 flex py-2 px-6 items-center justify-center rounded-full bg-background font-semibold shadow-2xl">
        {name}
      </div>
    </Link>
  )
}

// TODO: Load the images from the Media collection
const DiscoverSection = async () => {
  const brands = await getBrands({ limit: 5, sort: 'createdAt' })
  if (!brands.length) return <DiscoverySkeleton />

  const discoverItems: DiscoverCardItem[] = [
    {
      name: 'On Sale',
      icon: 'solar:sale-bold',
      href: '/sneakers'
    },
    ...brands.map((brand) => ({
      name: brand.name,
      href: `/sneakers?brand=${brand.id}`
    }))
  ]

  const categoryItems: CategoryCardItem[] = [
    {
      name: "Men's Collection",
      href: '/sneakers?size_category=mens',
      imageSrc: '/mens-shoes-collection.jpg',
      imageAlt: 'mens shoes collection'
    },
    {
      name: "Women's Collection",
      href: '/sneakers?size_category=womens',
      imageSrc: '/womens-shoes-collection.jpg',
      imageAlt: 'womens shoes collection'
    }
  ]

  return (
    <section className="flex flex-col gap-4 lg:gap-x-6">
      <h2 className="font-bold text-xl">Discover More</h2>

      {/* Brands */}
      <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-x-6 gap-y-4">
        {discoverItems.map((item, index) => (
          <li key={index}>
            <DiscoverCard {...item} />
          </li>
        ))}
      </ul>

      {/* Categories */}
      <ul className="grid md:grid-cols-2 gap-x-6 gap-y-4">
        {categoryItems.map((item, index) => (
          <li key={index}>
            <CategoryCard {...item} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default DiscoverSection
