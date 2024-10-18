import DiscoverSection from '@/components/home/DiscoverSection'
import PerksSection from '@/components/home/PerksSection'
import MainContainer from '@/components/MainContainer'
import ProductCollection from '@/components/product/ProductCollection'
import ProductReel from '@/components/product/ProductReel'
import { getCollections, getProducts } from '@/services/products'

export default async function Home() {
  const { products: newReleases } = await getProducts({
    limit: 6,
    sort: '-release_date'
  })

  const { products: jordanSneakers } = await getProducts({
    limit: 6,
    query: { 'brand.name': { equals: 'Jordan' } }
  })

  const { products: nikeSneakers } = await getProducts({
    limit: 6,
    query: { 'brand.name': { equals: 'Nike' } }
  })

  const { products: adidasSneakers } = await getProducts({
    limit: 6,
    query: { 'brand.name': { equals: 'Adidas' } }
  })

  const { products: yeezySneakers } = await getProducts({
    limit: 6,
    query: { 'brand.name': { equals: 'Yeezy' } }
  })

  const { products: newBalanceSneakers } = await getProducts({
    limit: 6,
    query: { 'brand.name': { equals: 'New Balance' } }
  })

  const { collections: latestCollections } = await getCollections({
    limit: 2,
    sort: '-createdAt'
  })

  // TODO: Add width and height to the icons so the layout wont shift
  return (
    <MainContainer className="flex flex-col gap-10 py-8 md:pb-12">
      {/* Banner Carousel */}
      <div className="aspect-video xl:aspect-[16/5] rounded-2xl bg-primary-200"></div>

      {/* Latest Releases */}
      <ProductReel
        title="New Releases"
        href="/sneakers?sort=release_date"
        products={newReleases}
      />

      {/* Collections */}
      <ul className="flex flex-col gap-12">
        {latestCollections.map((collection, index) => (
          <li key={collection.id}>
            <ProductCollection
              collection={collection}
              layout={index % 2 === 0 ? 'normal' : 'alternate'}
            />
          </li>
        ))}
      </ul>

      {/* Jordan */}
      <ProductReel
        title="Jordan"
        href="/sneakers?sort=release_date"
        products={jordanSneakers}
      />

      {/* Nike */}
      <ProductReel
        title="Nike"
        href="/sneakers?sort=release_date"
        products={nikeSneakers}
      />

      {/* Adidas */}
      <ProductReel
        title="Adidas"
        href="/sneakers?sort=release_date"
        products={adidasSneakers}
      />

      {/* Yeezy */}
      <ProductReel
        title="Yeezy"
        href="/sneakers?sort=release_date"
        products={yeezySneakers}
      />

      {/* New Balance */}
      <ProductReel
        title="New Balance"
        href="/sneakers?sort=release_date"
        products={newBalanceSneakers}
      />
      <PerksSection />

      <DiscoverSection />
    </MainContainer>
  )
}
