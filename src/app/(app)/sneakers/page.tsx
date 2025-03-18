import FilterPanel from '@/components/filters/FilterPanel'
import MainContainer from '@/components/MainContainer'
import ProductCard from '@/components/product/ProductCard'
import { filterProducts, getBrands, getCollections, getModels } from '@/services/products'
import { ProductFilters, SortOrder } from '@/types'
import { Product } from '@/types/payload'
import { parseQueryParams } from '@/utils'

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>
}

export default async function Page({ searchParams }: PageProps) {
  const queryParams = await searchParams

  const appliedFilters: ProductFilters = {
    brand: parseQueryParams(queryParams.brand),
    model: parseQueryParams(queryParams.model),
    collection: parseQueryParams(queryParams.collection),
    category: queryParams.size as Product['size_category'],
    size: parseQueryParams(queryParams.size)?.map(Number),
    price: queryParams.price,
    sort: queryParams.sort,
    order: queryParams.order as SortOrder
  }

  const [
    { data: products, metadata },
    { data: brands },
    { data: models },
    { data: collections }
  ] = await Promise.all([
    await filterProducts(appliedFilters),
    await getBrands(),
    await getModels(),
    await getCollections(),
  ])

  const bins = [
    { minRange: 100, maxRange: 120, count: 5 },
    { minRange: 120, maxRange: 140, count: 3 },
    { minRange: 140, maxRange: 160, count: 6 },
    { minRange: 160, maxRange: 180, count: 4 },
    { minRange: 180, maxRange: 200, count: 7 },
    { minRange: 200, maxRange: 220, count: 8 },
    { minRange: 220, maxRange: 240, count: 5 },
    { minRange: 240, maxRange: 260, count: 9 },
    { minRange: 260, maxRange: 280, count: 6 },
    { minRange: 280, maxRange: 300, count: 10 },
    { minRange: 300, maxRange: 320, count: 12 },
    { minRange: 320, maxRange: 340, count: 15 },
    { minRange: 340, maxRange: 360, count: 11 },
    { minRange: 360, maxRange: 380, count: 9 },
    { minRange: 380, maxRange: 400, count: 13 },
    { minRange: 400, maxRange: 420, count: 7 },
    { minRange: 420, maxRange: 440, count: 10 },
    { minRange: 440, maxRange: 460, count: 8 },
    { minRange: 460, maxRange: 480, count: 6 },
    { minRange: 480, maxRange: 500, count: 4 },
    { minRange: 500, maxRange: 520, count: 10 },
    { minRange: 520, maxRange: 540, count: 12 },
    { minRange: 540, maxRange: 560, count: 11 },
    { minRange: 560, maxRange: 580, count: 9 },
    { minRange: 580, maxRange: 600, count: 10 },
  ]

  return (
    <MainContainer className="relative flex flex-col gap-6 py-6 lg:mt-4">
      <FilterPanel
        initialFilters={appliedFilters}
        brandOptions={brands.map((b) => ({ value: b.slug!, label: b.name }))}
        modelOptions={models.map((m) => ({ value: m.slug!, label: m.name }))}
        collectionOptions={collections.map((c) => ({ value: c.slug!, label: c.name }))}
        priceBins={bins}
        total={metadata?.total} />

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
