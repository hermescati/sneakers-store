'use client'

import { SIZING_CATEGORY_OPTIONS, SORT_OPTIONS } from "@/lib/options"
import { ProductFilters, SelectOption, SortOrder } from "@/types"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import MultiSelect from "../base/input/MultiSelect"
import Select from "../base/input/Select"
import PriceRange from "./PriceRange"
import { HistogramBin } from "./RangeSlider"
import SizeFilter from "./SizeFilter"

interface FilterPanelProps {
    appliedFilters: ProductFilters
    brandOptions: SelectOption[]
    modelOptions: SelectOption[]
    collectionOptions: SelectOption[]
    priceBins: HistogramBin[]
    total?: number,
}

// TODO: Filter the model and collection based on the selected brand, if no selected brand, then show them all
// FIXME: onClear doesnt work at all
// TODO: Fix the idea of the updateFilters to have a function to clear them
const FilterPanel = ({
    appliedFilters,
    brandOptions,
    modelOptions,
    collectionOptions,
    priceBins,
    total
}: FilterPanelProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const updateFilters = (newFilters: Partial<ProductFilters>) => {
        const mergedFilters = { ...appliedFilters, ...newFilters }
        const queryParams = new URLSearchParams(searchParams.toString())

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

    return (
        <div className='grid grid-cols-6 gap-x-6 items-stretch justify-between'>
            <div className="text-3xl leading-tight">
                <p className='font-medium text-primary-500'>All</p>
                <p className='font-bold'>Sneakers</p>
            </div>

            <div className='flex flex-col justify-between h-full col-span-5'>
                <div className="flex items-center justify-end">
                    {/* TODO: Update this */}
                    <p className='font-semibold text-md text-primary-700 w-fit'>Showing {1} out of {total}</p>
                </div>

                <div className='flex items-center gap-3'>
                    <div className="flex-1">
                        <MultiSelect
                            id='brands-select'
                            options={brandOptions}
                            placeholder='Brand'
                            selected={appliedFilters.brand?.filter((x): x is string => x != null) || []}
                            onChange={(selected) => updateFilters({ brand: selected })}
                            onClear={() => updateFilters({ brand: undefined })}
                        />
                    </div>
                    <div className="flex-1">
                        <MultiSelect
                            id='models-select'
                            options={modelOptions}
                            selected={appliedFilters.model?.filter((x): x is string => x != null) || []}
                            placeholder='Models'
                            onChange={(selected) => updateFilters({ model: selected })}
                            onClear={() => updateFilters({ model: undefined })}
                        />
                    </div>
                    <div className="flex-1">
                        <MultiSelect
                            id='collections-select'
                            options={collectionOptions}
                            selected={appliedFilters.collection?.filter((x): x is string => x != null) || []}
                            placeholder='Collections'
                            onChange={(selected) => updateFilters({ collection: selected })}
                            onClear={() => updateFilters({ collection: undefined })}
                        />
                    </div>
                    <div className="flex-1">
                        <PriceRange
                            id='price-range'
                            placeholder='Price'
                            min={0}
                            max={600}
                            bins={priceBins}
                            onChange={(priceRange) => updateFilters({ price: `${priceRange[0]}-${priceRange[1]}` })}
                            onClear={() => updateFilters({ price: undefined })}
                        />
                    </div>
                    <div className="flex-1">
                        <SizeFilter
                            id='size-filter'
                            placeholder='Sizes'
                            categories={SIZING_CATEGORY_OPTIONS}
                            onChange={(category, sizes) => updateFilters({ category, size: sizes })}
                            onClear={() => updateFilters({ category: undefined, size: undefined })}
                        />
                    </div>
                    <span className="h-6 border-l border-border mx-1" />
                    <div className="flex-1">
                        <Select
                            id='sort'
                            placeholder='Sort By'
                            showClear
                            options={SORT_OPTIONS}
                            onChange={([selected]) => {
                                const [field, order] = selected.split('|')
                                updateFilters({ sort: field, order: order as SortOrder })
                            }}
                            onClear={() => updateFilters({ sort: undefined, order: undefined })}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterPanel
