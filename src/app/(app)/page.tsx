
import DiscoverSection from '@/components/home/DiscoverSection'
import EventSlider from '@/components/home/EventSlider'
import PerksSection from '@/components/home/PerksSection'
import MainContainer from '@/components/MainContainer'
import CollabReel from '@/components/product/collab/CollabReel'
import ProductReel from '@/components/product/ProductReel'
import routes from '@/lib/routes'
import { getEvents } from '@/services/events'
import { getCollabs, getProducts } from '@/services/products'

const Home = async () => {
  const [
    { data: newReleases },
    { data: nikeSneakers },
    { data: jordanSneakers },
    { data: adidasSneakers },
    { data: yeezySneakers },
    { data: newBalanceSneakers },
    { data: latestCollabs },
    { events }
  ] = await Promise.all([
    getProducts({ limit: 6, sort: '-release_date' }),
    getProducts({ limit: 6, where: { 'brand.name': { equals: 'Nike' } } }),
    getProducts({ limit: 6, where: { 'brand.name': { equals: 'Jordan' } } }),
    getProducts({ limit: 6, where: { 'brand.name': { equals: 'Adidas' } } }),
    getProducts({ limit: 6, where: { 'brand.name': { equals: 'Yeezy' } } }),
    getProducts({ limit: 6, where: { 'brand.name': { equals: 'New Balance' } } }),
    getCollabs({ limit: 2, sort: '-createdAt' }),
    getEvents()
  ])

  // FIXME: Add the corresponding brand slugs to the href
  return (
    <MainContainer className="flex flex-col gap-10 py-6 md:py-8 md:pb-12">
      <EventSlider events={events} />

      <ProductReel
        title="New Releases"
        href={routes.products.newReleases}
        products={newReleases} />

      <CollabReel collaborations={latestCollabs} />

      <ProductReel
        title="Jordan"
        href="/sneakers/"
        products={jordanSneakers}
      />

      <ProductReel
        title="Nike"
        href="/sneakers/"
        products={nikeSneakers}
      />

      <ProductReel
        title="Adidas"
        href="/sneakers/"
        products={adidasSneakers}
      />

      <ProductReel
        title="Yeezy"
        href="/sneakers/"
        products={yeezySneakers}
      />

      <ProductReel
        title="New Balance"
        href="/sneakers/"
        products={newBalanceSneakers}
      />

      <PerksSection />
      <DiscoverSection />
    </MainContainer>
  )
}

export default Home
