import CollectionReel from '@/components/collection/CollectionReel'
import DiscoverSection from '@/components/home/DiscoverSection'
import PerksSection from '@/components/home/PerksSection'
import MainContainer from '@/components/MainContainer'
import ProductReel from '@/components/product/ProductReel'
import EventSlider from '@/components/slider/EventSlider'
import { getEvents } from '@/services/events'
import { getCollections, getProducts } from '@/services/products'

const Home = async () => {
  const { events } = await getEvents()

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
    <MainContainer className="flex flex-col gap-10 py-6 md:py-8 md:pb-12">
      <EventSlider events={events} />

      <ProductReel
        title="New Releases"
        href="/sneakers?sort=release_date"
        products={newReleases}
      />

      <CollectionReel collections={latestCollections} />

      <ProductReel
        title="Jordan"
        href="/sneakers?sort=release_date"
        products={jordanSneakers}
      />

      <ProductReel
        title="Nike"
        href="/sneakers?sort=release_date"
        products={nikeSneakers}
      />

      <ProductReel
        title="Adidas"
        href="/sneakers?sort=release_date"
        products={adidasSneakers}
      />

      <ProductReel
        title="Yeezy"
        href="/sneakers?sort=release_date"
        products={yeezySneakers}
      />

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

export default Home
