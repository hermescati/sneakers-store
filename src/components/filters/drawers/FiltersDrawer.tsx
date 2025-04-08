'use client'

import Button from "@/components/base/button/Button"
import { SIZING_CATEGORY_OPTIONS } from "@/lib/options"
import { ProductFilters } from "@/types"
import { useEffect, useMemo, useState } from "react"
import { Drawer } from 'vaul'
import { FiltersPanelProps } from "../FiltersPanel"
import MultiSelectFilter from "../base/MultiSelectFilter"
import PriceRange from "../base/PriceRange"
import SizeFilter from "../base/SizeFilter"

interface FiltersDrawerProps extends FiltersPanelProps {
    initialFilters: Omit<ProductFilters, 'sort' | 'order'>
    updateFilters: (newFilters: Partial<ProductFilters>) => void
}

const FiltersDrawer = ({
    initialFilters,
    brandOptions,
    modelOptions,
    collectionOptions,
    priceBins,
    updateFilters
}: FiltersDrawerProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [filters, setFilters] = useState<ProductFilters>(initialFilters)

    const initialFiltersCount = useMemo(() => {
        return Object.entries(initialFilters)
            .filter(([, value]) => value && (Array.isArray(value) ? value.length > 0 : true))
            .length
    }, [initialFilters])

    const currentFiltersCount = useMemo(() => {
        return Object.entries(filters)
            .filter(([key, value]) =>
                key !== 'sort' &&
                key !== 'order' &&
                value &&
                (Array.isArray(value) ? value.length > 0 : true)
            ).length
    }, [filters])

    const isApplyDisabled = useMemo(
        () => JSON.stringify(filters) === JSON.stringify(initialFilters),
        [filters, initialFilters]
    )

    useEffect(() => {
        setFilters(initialFilters)
    }, [initialFilters])

    const getSelectedValues = (key: keyof ProductFilters) => {
        const value = filters[key]
        return Array.isArray(value)
            ? value.filter((v): v is string => typeof v === 'string')
            : []
    }

    const handleSelect = (filterKey: keyof ProductFilters, value: string) => {
        const currentValues = getSelectedValues(filterKey)
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value]

        setFilters({
            ...filters,
            [filterKey]: newValues.length ? newValues : []
        })
    }

    const clearAll = () => {
        updateFilters({
            brand: undefined,
            model: undefined,
            collection: undefined,
            category: undefined,
            size: undefined,
            price: undefined,
            query: undefined
        })
    }

    const applyFilters = () => {
        updateFilters(filters)
        setTimeout(() => {
            setIsOpen(false)
        }, 300)
    }

    return (
        <Drawer.Root
            shouldScaleBackground
            handleOnly
            open={isOpen}
            onOpenChange={setIsOpen}>
            <Drawer.Trigger asChild>
                <Button
                    variant="ghost"
                    size="small"
                    label={initialFiltersCount ? `Filters (${initialFiltersCount})` : 'Filters'}
                    iconAppend="hugeicons:filter-horizontal"
                    className="w-full justify-between gap-4 py-3.5 pr-6 rounded-none hover:bg-transparent"
                />
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40 z-30" />
                <Drawer.Content className="flex flex-col fixed bottom-0 inset-x-0 z-30 mt-24 h-full max-h-[96%] bg-background rounded-t-2xl outline-none">
                    <div className="max-w-lg w-full mx-auto h-full relative flex flex-col p-3">
                        <Drawer.Handle className="relative !mx-0 !w-full !flex !items-center !justify-center mb-6 !bg-transparent">
                            <div className="mx-auto mt-5 w-24 h-1 bg-primary-200 rounded-full"></div>
                        </Drawer.Handle>
                        <Drawer.Title className="font-semibold text-xl pb-2 mx-3 border-b border-border">Filters</Drawer.Title>

                        <div className="px-3 h-full divide-y divide-border overflow-y-auto">
                            <div>
                                <MultiSelectFilter
                                    title="Brands"
                                    options={brandOptions}
                                    selectedValues={getSelectedValues('brand')}
                                    onSelect={value => handleSelect('brand', value)}
                                    onClear={() => updateFilters({ ...filters, brand: undefined })} />
                                <MultiSelectFilter
                                    title="Models"
                                    options={modelOptions}
                                    selectedValues={getSelectedValues('model')}
                                    onSelect={value => handleSelect('model', value)}
                                    onClear={() => updateFilters({ ...filters, model: undefined })} />
                                <MultiSelectFilter
                                    title="Collections"
                                    options={collectionOptions}
                                    selectedValues={getSelectedValues('collection')}
                                    onSelect={value => handleSelect('collection', value)}
                                    onClear={() => updateFilters({ ...filters, collection: undefined })} />
                            </div>
                            <div className="pt-3 pb-2">
                                <PriceRange
                                    id="price-range"
                                    placeholder="Price"
                                    min={0}
                                    max={600}
                                    selected={filters.price}
                                    bins={priceBins}
                                    compact
                                    onChange={(priceRange) => setFilters({
                                        ...filters,
                                        price: `${priceRange[0]}-${priceRange[1]}`
                                    })}
                                    onClear={() => updateFilters({ ...filters, price: undefined })} />
                            </div>
                            <div className="pt-3 pb-2">
                                <SizeFilter
                                    id="size-filter"
                                    placeholder="Sizes"
                                    categories={SIZING_CATEGORY_OPTIONS}
                                    selected={{
                                        category: filters.category || initialFilters.category || 'mens',
                                        sizes: filters.size || initialFilters.size || []
                                    }}
                                    compact
                                    onChange={(category, sizes) => setFilters({
                                        ...filters,
                                        category,
                                        size: sizes
                                    })}
                                    onClear={() => updateFilters({
                                        ...filters,
                                        category: undefined,
                                        size: undefined
                                    })} />
                            </div>
                        </div>

                        {/* TODO: Add some sliding animation for the button */}
                        <div className="flex items-center justify-evenly gap-2 px-3 py-2 border-t border-border bg-background transition-all duration-300 ease-in-out">
                            {currentFiltersCount > 0 && <Button
                                variant="ghost"
                                label="Clear all"
                                className="w-full active:underline active:underline-offset-4"
                                onClick={clearAll} />}
                            <Button
                                className="w-full"
                                label="Apply"
                                disabled={isApplyDisabled}
                                onClick={applyFilters} />
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}

export default FiltersDrawer
