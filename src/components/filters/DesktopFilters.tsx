'use client'

import { SIZING_CATEGORY_OPTIONS, SORT_OPTIONS } from "@/lib/options"
import { ProductFilters, SortOrder } from "@/types"
import Select from "../base/input/Select"
import PriceRange from "./base/PriceRange"
import SizeFilter from "./base/SizeFilter"
import { DynamicFilterHeading, FilterPanelProps } from "./FilterPanel"

interface DesktopFiltersProps extends FilterPanelProps {
    dynamicHeading: DynamicFilterHeading
    updateFilters: (newFilters: Partial<ProductFilters>) => void
}

const DesktopFilters = ({
    initialFilters,
    brandOptions,
    modelOptions,
    collectionOptions,
    priceBins,
    total,
    dynamicHeading,
    updateFilters
}: DesktopFiltersProps) => {
    return (
        <div className="flex flex-col gap-4 mt-8">
            <div className="flex items-end justify-between">
                <div className="leading-tight">
                    <p className="font-medium text-xl 2xl:text-2xl text-primary-500">{dynamicHeading.heading}</p>
                    <span className="inline-flex flex-wrap items-baseline gap-x-2">
                        <p className="font-bold text-2xl 2xl:text-3xl">{dynamicHeading.labels[0]}</p>
                        {dynamicHeading.labels.length > 1 && <p className="text-base">& others</p>}
                    </span>
                </div>

                {!!total && <p className='font-semibold text-md text-primary-700 w-fit'>{total} results</p>}
            </div>

            <div className="flex flex-col gap-2">
                <div className='flex items-center gap-3'>
                    <div className="flex-1">
                        <Select
                            id='brands'
                            placeholder='Brand'
                            options={brandOptions}
                            selected={initialFilters.brand?.filter((v): v is string => v != null) || []}
                            multiple
                            showClear
                            onChange={(selected) => updateFilters({ brand: selected })}
                            onClear={() => updateFilters({ brand: undefined })} />
                    </div>
                    <div className="flex-1">
                        <Select
                            id='models'
                            placeholder='Models'
                            options={modelOptions}
                            selected={initialFilters.model?.filter((v): v is string => v != null) || []}
                            multiple
                            showClear
                            onChange={(selected) => updateFilters({ model: selected })}
                            onClear={() => updateFilters({ model: undefined })} />
                    </div>
                    <div className="flex-1">
                        <Select
                            id='collections'
                            placeholder='Collections'
                            options={collectionOptions}
                            selected={initialFilters.collection?.filter((v): v is string => v != null) || []}
                            multiple
                            showClear
                            onChange={(selected) => updateFilters({ collection: selected })}
                            onClear={() => updateFilters({ collection: undefined })} />
                    </div>
                    <div className="flex-1">
                        <PriceRange
                            id='price-range'
                            placeholder='Price'
                            min={0}
                            max={600}
                            selected={initialFilters.price}
                            bins={priceBins}
                            onChange={(priceRange) => updateFilters({ price: `${priceRange[0]}-${priceRange[1]}` })}
                            onClear={() => updateFilters({ price: undefined })} />
                    </div>
                    <div className="flex-1">
                        <SizeFilter
                            id='size-filter'
                            placeholder='Sizes'
                            categories={SIZING_CATEGORY_OPTIONS}
                            selected={{ category: initialFilters.category || 'mens', sizes: initialFilters.size || [] }}
                            onChange={(category, sizes) => updateFilters({ category, size: sizes })}
                            onClear={() => updateFilters({ category: undefined, size: undefined })} />
                    </div>
                    <span className="h-6 border-l border-border mx-1" />
                    <div className="flex-1">
                        <Select
                            id='sort'
                            placeholder='Sort By'
                            options={SORT_OPTIONS}
                            selected={initialFilters.sort
                                ? initialFilters.order
                                    ? [`${initialFilters.sort}|${initialFilters.order}`]
                                    : [initialFilters.sort]
                                : []}
                            showClear
                            position='bottom-right'
                            onChange={([selected]) => {
                                const [field, order] = selected.split('|')
                                updateFilters({ sort: field, order: order as SortOrder })
                            }}
                            onClear={() => updateFilters({ sort: undefined, order: undefined })} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DesktopFilters