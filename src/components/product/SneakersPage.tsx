import FilterPanel from "@/components/filters/FilterPanel"
import MainContainer from "@/components/MainContainer"
import ProductCard from "@/components/product/ProductCard"
import { getBrands, getCollections, getModels } from "@/services/products"
import { PaginatedResponse, ProductFilters, SortOrder } from "@/types"
import { Product } from "@/types/payload"
import { parseQueryParams } from "@/utils"

interface SneakersLayoutProps {
    searchParams: Record<string, string | undefined>
    fetchCallback: (filters: ProductFilters) => Promise<PaginatedResponse<Product>>
}

export default async function SneakersPage({ searchParams, fetchCallback }: SneakersLayoutProps) {
    const appliedFilters: ProductFilters = {
        brand: parseQueryParams(searchParams.brand),
        model: parseQueryParams(searchParams.model),
        collection: parseQueryParams(searchParams.collection),
        category: searchParams.category as Product['size_category'],
        size: parseQueryParams(searchParams.size)?.map(Number),
        price: searchParams.price,
        sort: searchParams.sort,
        order: searchParams.order as SortOrder,
        query: searchParams.query
    }

    const [
        { data: products, metadata },
        { data: brands },
        { data: models },
        { data: collections }
    ] = await Promise.all([
        await fetchCallback(appliedFilters),
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
        <MainContainer className="relative">
            <FilterPanel
                initialFilters={appliedFilters}
                brandOptions={brands.map((b) => ({ value: b.slug!, label: b.name }))}
                modelOptions={models.map((m) => ({ value: m.slug!, label: m.name }))}
                collectionOptions={collections.map((c) => ({ value: c.slug!, label: c.name }))}
                priceBins={bins}
                total={metadata?.total} />

            {!products?.length
                ? <p>Nothing here</p>
                : <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 py-6">
                    {products.flatMap((product, index) =>
                        <li key={product.id}>
                            <ProductCard product={product} index={index} />
                        </li>
                    )}
                </ul>
            }
        </MainContainer>
    )
}