import MainContainer from '@/components/MainContainer'
import ProductPage from '@/components/product/ProductPage'
import ProductReel from '@/components/product/ProductReel'
import { getProduct, getProducts } from '@/services/products'
import { Product } from '@/types/payload'
import { notFound } from 'next/navigation'

interface PageProps {
  params: { productId: Product['id'] }
}

export default async function Page({ params }: PageProps) {
  const { productId } = params

  const product = await getProduct(productId)
  if (!product) return notFound()

  // const relatedProducts = await getRelatedProducts(product)
  const { products: relatedProducts } = await getProducts({ limit: 6 })

  return (
    <MainContainer className="flex flex-col gap-8 py-6">
      <ProductPage product={product} />
      {relatedProducts.length > 0 && (
        <ProductReel title="Related Sneakers" products={relatedProducts} />
      )}
    </MainContainer>
  )
}
