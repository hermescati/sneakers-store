'use client'

import { SIZING_CATEGORY_OPTIONS } from "@/lib/options"
import { ProductFilters, SelectOption, SortOrder } from "@/types"
import { Product } from "@/types/payload"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react"
import { useDebounceCallback } from "usehooks-ts"
import FilterTags from "./base/FilterTags"
import { HistogramBin } from "./base/RangeSlider"
import DesktopFilters from "./DesktopFilters"
import MobileFilters from "./MobileFilters"

export interface FilterPanelProps {
    initialFilters: ProductFilters
    brandOptions: SelectOption[]
    modelOptions: SelectOption[]
    collectionOptions: SelectOption[]
    priceBins?: HistogramBin[]
    total?: number,
}

// TODO: Filter the model and collection based on the selected brand, if no selected brand, then show them all
// To be completed once a mechanism to have a centralized config is done so it takes the values from there and
// and constructs the SelectOption array in this component.
const FilterPanel = ({
    initialFilters,
    ...props
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
            order: searchParams.get('order') as SortOrder | undefined,
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
            const label = props.brandOptions.find((o) => o.value === b)?.label
            if (label) acc.push(label)
            return acc
        }, [])
        : ['Sneakers']

    return (
        <div className="space-y-3">
            <div className="hidden lg:block">
                <DesktopFilters
                    initialFilters={filters}
                    dynamicLabels={selectedBrandLabels}
                    updateFilters={debounceUpdateFilters}
                    {...props}
                />
            </div>

            <div className="lg:hidden">
                <MobileFilters
                    initialFilters={filters}
                    dynamicLabels={selectedBrandLabels}
                    updateFilters={updateFilters}
                    {...props} />
            </div>

            <div className="hidden md:block">
                <FilterTags
                    filters={filters}
                    brandOptions={props.brandOptions}
                    modelOptions={props.modelOptions}
                    collectionOptions={props.collectionOptions}
                    categoryOptions={SIZING_CATEGORY_OPTIONS}
                    updateFilters={updateFilters} />
            </div>
        </div>
    )
}

export default FilterPanel
