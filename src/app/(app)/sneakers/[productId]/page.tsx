import MainContainer from '@/components/MainContainer'
import ProductPage from '@/components/product/ProductPage'
import ProductReel from '@/components/product/ProductReel'
import { getProduct, getRelatedProducts } from '@/services/products'
import { notFound } from 'next/navigation'

const Product = async (
  { params }: {
    params: Promise<
      { [key: string]: string | string[] | undefined }
    >
  }) => {
  const productId = (await params).productId as string

  const product = await getProduct(productId)
  if (!product) return notFound()

  const relatedProducts = await getRelatedProducts(product)

  return (
    <MainContainer className="flex flex-col gap-8 py-6">
      <ProductPage product={product} />
      {relatedProducts.length > 0 && (
        <ProductReel title="Related Sneakers" products={relatedProducts} />
      )}
    </MainContainer>
  )
}

export default Product
