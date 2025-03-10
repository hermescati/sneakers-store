import MainContainer from '@/components/MainContainer'
import ProductCard from '@/components/product/ProductCard'
import { filterProducts } from '@/services/products'
import { PriceFilters, ProductFilters, SortDirection } from '@/types'
import { Product } from '@/types/payload'

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>
}

export default async function Page({ searchParams }: PageProps) {
  const filterParams = await searchParams

  const filters: ProductFilters = {
    brand: filterParams.brand,
    model: filterParams.model,
    collection: filterParams.collection,
    size: filterParams.size as Product['size_category'],
    filter: filterParams.filter as PriceFilters,
    sort: filterParams.sort as keyof Product,
    dir: filterParams.dir as SortDirection
  }
  const { data: products } = await filterProducts(filters)

  return (
    <MainContainer className="grid grid-cols-12 gap-x-12 py-6">
      <div className="flex col-span-3">Filters Panel</div>
      {!products?.length
        ? <>Nothing here</>
        : <ul className="grid grid-cols-5 col-span-9 gap-2">
          {products.map((product, index) => (
            <li key={product.id}>
              <ProductCard product={product} index={index} />
            </li>
          ))}
        </ul>}
    </MainContainer>
  )
}
