import MainContainer from '@/components/MainContainer'
import ProductPage from '@/components/product/ProductPage'
import ProductReel from '@/components/product/ProductReel'
import { getProduct, getRelatedProducts } from '@/services/products'
import { notFound } from 'next/navigation'

interface PageProps {
  params: { slug: string }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const { code, data: product } = await getProduct(slug)
  if (code !== 200 || !product) return notFound()

  const relatedProducts = await getRelatedProducts([product])

  return (
    <MainContainer className="flex flex-col gap-12 py-6">
      <ProductPage product={product} />

      {relatedProducts.length > 0 && (
        <ProductReel title="Related Sneakers" products={relatedProducts} />
      )}
    </MainContainer>
  )
}
