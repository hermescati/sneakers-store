'use client'

import { SIZING_CATEGORY_OPTIONS, SORT_OPTIONS } from "@/lib/options"
import { ProductFilters, SelectOption, SortOrder } from "@/types"
import { Product } from "@/types/payload"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react"
import { useDebounceCallback } from "usehooks-ts"
import Select from "../base/input/Select"
import FilterTags from "./FilterTags"
import PriceRange from "./PriceRange"
import { HistogramBin } from "./RangeSlider"
import SizeFilter from "./SizeFilter"

interface FilterPanelProps {
    initialFilters: ProductFilters
    brandOptions: SelectOption[]
    modelOptions: SelectOption[]
    collectionOptions: SelectOption[]
    priceBins: HistogramBin[]
    total?: number,
}

// TODO: Filter the model and collection based on the selected brand, if no selected brand, then show them all
// To be completed once a mechanism to have a centralized config is done so it takes the values from there and
// and constructs the SelectOption array in this component.
const FilterPanel = ({
    initialFilters,
    brandOptions,
    modelOptions,
    collectionOptions,
    priceBins,
    total
}: FilterPanelProps) => {
    const [filters, setFilters] = useState<ProductFilters>(initialFilters)

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        const updatedFilters: ProductFilters = {
            brand: searchParams.getAll('brand') || undefined,
            model: searchParams.getAll('model') || undefined,
            collection: searchParams.getAll('collection') || undefined,
            category: searchParams.get('category') as Product['size_category'] || undefined,
            size: searchParams.getAll('size').map(Number) || undefined,
            price: searchParams.get('price') || undefined,
            sort: searchParams.get('sort') || undefined,
            order: searchParams.get('order') as SortOrder | undefined
        }
        setFilters(updatedFilters)
    }, [searchParams])

    const updateFilters = (newFilters: Partial<ProductFilters>) => {
        const queryParams = new URLSearchParams()
        const mergedFilters = { ...filters, ...newFilters }
        setFilters(mergedFilters)

        Object.entries(mergedFilters).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                queryParams.delete(key)
                value.forEach(v => queryParams.append(key, String(v)))
            } else if (value) {
                queryParams.set(key, String(value))
            } else {
                queryParams.delete(key)
            }
        })

        router.replace(`${pathname}?${queryParams.toString()}`)
    }
    const debounceUpdateFilters = useDebounceCallback(updateFilters, 500)

    const selectedBrandLabels = filters.brand?.length
        ? filters.brand.reduce<string[]>((acc, b) => {
            const label = brandOptions.find((o) => o.value === b)?.label
            if (label) acc.push(label)
            return acc
        }, [])
        : ['Sneakers']

    return (
        <div className="flex flex-col gap-3">
            <div className='grid grid-cols-6 gap-x-6 items-stretch justify-between'>
                <div className="text-3xl leading-tight">
                    <p className="font-medium text-primary-500">{filters.brand?.length ? 'Brand' : 'All'}</p>
                    <span className="inline-flex items-baseline gap-2">
                        <p className="font-bold">{selectedBrandLabels[0]}</p>
                        {selectedBrandLabels.length > 1 && <p className="text-xl">& others</p>}
                    </span>
                </div>

                <div className='flex flex-col justify-between h-full col-span-5'>
                    <p className='font-semibold text-md text-primary-700 w-fit'>{total} results</p>

                    <div className='flex items-center gap-3'>
                        <div className="flex-1">
                            <Select
                                id='brands-select'
                                placeholder='Brand'
                                options={brandOptions}
                                selected={filters.brand?.filter((v): v is string => v != null) || []}
                                multiple
                                showClear
                                onChange={(selected) => debounceUpdateFilters({ brand: selected })}
                                onClear={() => debounceUpdateFilters({ brand: undefined })} />
                        </div>
                        <div className="flex-1">
                            <Select
                                id='models-select'
                                placeholder='Models'
                                options={modelOptions}
                                selected={filters.model?.filter((v): v is string => v != null) || []}
                                multiple
                                showClear
                                onChange={(selected) => debounceUpdateFilters({ model: selected })}
                                onClear={() => debounceUpdateFilters({ model: undefined })} />
                        </div>
                        <div className="flex-1">
                            <Select
                                id='collections-select'
                                placeholder='Collections'
                                options={collectionOptions}
                                selected={filters.collection?.filter((v): v is string => v != null) || []}
                                multiple
                                showClear
                                onChange={(selected) => debounceUpdateFilters({ collection: selected })}
                                onClear={() => debounceUpdateFilters({ collection: undefined })} />
                        </div>
                        <div className="flex-1">
                            <PriceRange
                                id='price-range'
                                placeholder='Price'
                                min={0}
                                max={600}
                                selected={filters.price}
                                bins={priceBins}
                                onChange={(priceRange) => debounceUpdateFilters({ price: `${priceRange[0]}-${priceRange[1]}` })}
                                onClear={() => debounceUpdateFilters({ price: undefined })} />
                        </div>
                        <div className="flex-1">
                            <SizeFilter
                                id='size-filter'
                                placeholder='Sizes'
                                categories={SIZING_CATEGORY_OPTIONS}
                                selected={{ category: filters.category || 'mens', sizes: filters.size || [] }}
                                onChange={(category, sizes) => debounceUpdateFilters({ category, size: sizes })}
                                onClear={() => debounceUpdateFilters({ category: undefined, size: undefined })} />
                        </div>
                        <span className="h-6 border-l border-border mx-1" />
                        <div className="flex-1">
                            <Select
                                id='sort-select'
                                placeholder='Sort By'
                                options={SORT_OPTIONS}
                                selected={filters.sort
                                    ? filters.order
                                        ? [`${filters.sort}|${filters.order}`]
                                        : [filters.sort]
                                    : []}
                                showClear
                                position='bottom-right'
                                onChange={([selected]) => {
                                    const [field, order] = selected.split('|')
                                    debounceUpdateFilters({ sort: field, order: order as SortOrder })
                                }}
                                onClear={() => debounceUpdateFilters({ sort: undefined, order: undefined })} />
                        </div>
                    </div>
                </div>
            </div>

            <FilterTags
                filters={filters}
                brandOptions={brandOptions}
                modelOptions={modelOptions}
                collectionOptions={collectionOptions}
                categoryOptions={SIZING_CATEGORY_OPTIONS}
                updateFilters={updateFilters} />
        </div>
    )
}

export default FilterPanel
