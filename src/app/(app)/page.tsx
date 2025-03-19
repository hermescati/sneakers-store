import CollectionReel from '@/components/collection/CollectionReel'
import DiscoverSection from '@/components/home/DiscoverSection'
import EventSlider from '@/components/home/EventSlider'
import PerksSection from '@/components/home/PerksSection'
import MainContainer from '@/components/MainContainer'
import ProductReel from '@/components/product/ProductReel'
import { getEvents } from '@/services/events'
import { getCollections, getProducts } from '@/services/products'

const Home = async () => {
  const [
    { data: newReleases },
    { data: nikeSneakers },
    { data: jordanSneakers },
    { data: adidasSneakers },
    { data: yeezySneakers },
    { data: newBalanceSneakers },
    { data: latestCollections },
    { events }
  ] = await Promise.all([
    getProducts({ limit: 6, sort: '-release_date' }),
    getProducts({ limit: 6, where: { 'brand.name': { equals: 'Nike' } } }),
    getProducts({ limit: 6, where: { 'brand.name': { equals: 'Jordan' } } }),
    getProducts({ limit: 6, where: { 'brand.name': { equals: 'Adidas' } } }),
    getProducts({ limit: 6, where: { 'brand.name': { equals: 'Yeezy' } } }),
    getProducts({ limit: 6, where: { 'brand.name': { equals: 'New Balance' } } }),
    getCollections({ limit: 2, sort: '-createdAt' }),
    getEvents()
  ])

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
