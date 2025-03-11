import FilterPanel from '@/components/filters/FilterPanel'
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
  const { data: products, metadata } = await filterProducts(filters)

  return (
    <MainContainer className="flex flex-col gap-4 py-6 lg:mt-4">
      <FilterPanel appliedFilters={filters} total={metadata?.total} />

      {!products?.length
        ? <p>Nothing here</p>
        : <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {products.flatMap((product, index) =>
            Array.from({ length: 24 }).map((_, i) => (
              <li key={`${product.id}-${i}`}>
                <ProductCard product={product} index={index} />
              </li>
            ))
          )}
        </ul>
      }

    </MainContainer>
  )
}
