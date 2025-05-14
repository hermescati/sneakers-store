import DiscoverSection from '@/components/home/DiscoverSection'
import EventSlider from '@/components/home/EventSlider'
import PerksSection from '@/components/home/PerksSection'
import MainContainer from '@/components/MainContainer'
import CollabReel from '@/components/product/collab/CollabReel'
import ProductReel from '@/components/product/ProductReel'
import routes from '@/lib/routes'
import { getNavItems } from '@/services'
import { getEvents } from '@/services/events'
import { getCollabs, getProducts } from '@/services/products'

const Home = async () => {
  const { brands } = await getNavItems()

  const productReelsPromise = brands.slice(0, 5).map(brand => {
    const slug = brand.href?.split('brand=')[1]
    return getProducts({
      limit: 6,
      where: { 'brand.slug': { equals: slug } }
    }).then(res => ({ brand, products: res.data }))
  })

  const [products, { data: newReleases }, { data: latestCollabs }, { events }] = await Promise.all([
    Promise.all(productReelsPromise),
    getProducts({ limit: 6, sort: '-release_date' }),
    getCollabs({ limit: 2, sort: '-createdAt' }),
    getEvents()
  ])

  return (
    <MainContainer className="flex flex-col gap-10 py-6 md:py-8 md:pb-12">
      <EventSlider events={events} />
      <ProductReel title="New Releases" href={routes.products.newReleases} products={newReleases} />
      <CollabReel collaborations={latestCollabs} />
      {products.map(({ brand, products }) => (
        <ProductReel key={brand.name} title={brand.name} href={brand.href} products={products} />
      ))}
      <PerksSection />
      <DiscoverSection />
    </MainContainer>
  )
}

export default Home
