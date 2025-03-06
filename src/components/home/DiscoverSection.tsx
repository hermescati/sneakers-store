import { getBrands } from '@/services/products'
import CategoryCard, { CategoryCardItem } from './base/CategoryCard'
import DiscoverCard, { DiscoverCardItem } from './base/DiscoverCard'
import DiscoverySkeleton from './skeletons/DiscoverySkeleton'

const DiscoverSection = async () => {
  const { data: brands } = await getBrands({ limit: 5, sort: 'createdAt' })

  const discoverItems: DiscoverCardItem[] = [
    {
      name: 'On Sale',
      icon: 'solar:sale-bold',
      href: '/sneakers?filter=onSale'
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
    <section className="flex flex-col gap-4">
      <h2 className="font-bold text-xl">Discover More</h2>

      <ul className="grid md:grid-cols-2 gap-4">
        {categoryItems.map((item, index) => (
          <li key={index}>
            <CategoryCard {...item} />
          </li>
        ))}
      </ul>

      {brands.length > 0 ? <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {discoverItems.map((item, index) => (
          <li key={index}>
            <DiscoverCard {...item} />
          </li>
        ))}
      </ul> : <DiscoverySkeleton />}
    </section>
  )
}

export default DiscoverSection
