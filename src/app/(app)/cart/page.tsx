import CartPage from '@/components/cart/CartPage'
import MainContainer from '@/components/MainContainer'
import ProductReel from '@/components/product/ProductReel'
import { getProducts } from '@/services/products'

export default async function Cart() {
  const { products: relatedProducts } = await getProducts({ limit: 6 })

  return (
    <MainContainer className="flex flex-col gap-8 py-6 lg:gap-12 lg:py-8">
      <CartPage />
      {relatedProducts.length > 0 && (
        <ProductReel title="Related Sneakers" products={relatedProducts} />
      )}
    </MainContainer>
  )
}
