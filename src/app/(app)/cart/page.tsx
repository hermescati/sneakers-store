import CartDetails from '@/components/cart/CartDetails'
import MainContainer from '@/components/MainContainer'
import ProductReel from '@/components/product/ProductReel'
import { getRelatedProducts } from '@/services/products'

const Cart = async () => {
  const relatedProducts = await getRelatedProducts([])

  return (
    <MainContainer className="flex flex-col gap-10 py-6 lg:py-8">
      <CartDetails />
      {relatedProducts.length > 0 && (
        <ProductReel title="Related Sneakers" products={relatedProducts} />
      )}
    </MainContainer>
  )
}

export default Cart
