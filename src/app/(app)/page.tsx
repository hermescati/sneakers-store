import PerksSection from '@/components/home/PerksSection'
import MainContainer from '@/components/MainContainer'
import ProductReel from '@/components/product/ProductReel'
import { getProducts } from '@/services/products'

export default async function Home() {
  const { products: newReleases } = await getProducts({
    sort: '-release_date'
  })

  // TODO: Add width and height to the icons so the layout wont shift
  return (
    <MainContainer>
      {/* Latest Releases */}
      <ProductReel
        title="New Releases"
        href="/sneakers/2024"
        products={newReleases}
      />
      <PerksSection />
    </MainContainer>
  )
}
