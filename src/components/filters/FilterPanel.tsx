'use client'

import { SIZING_CATEGORY_OPTIONS, SORT_OPTIONS } from "@/lib/options"
import { getBrands, getCollections, getModels } from "@/services/products"
import { ProductFilters, SelectOption } from "@/types"
import { cn } from "@/utils"
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import IconButton from "../base/IconButton"
import MultiSelect from "../base/input/MultiSelect"
import Select from "../base/input/Select"
import PriceRange from "./PriceRange"
import SizeFilter from "./SizeFilter"

interface FilterPanelProps {
    appliedFilters: ProductFilters
    total?: number
}

// TODO: Filter the model and collection based on the selected brand, if no selected brand, then show them all
// TODO: Persist filters in the query params (not sure to use replace or push)
// TODO: Get bins from backend
// TODO: More optimized function to update filters not have them separate
// TODO: Better way to fetch data, maybe fetching them in the server component and passing them as props here
// TODO: Better layout to handle the filters (maybe using grid might make more sense)
// TODO: Update filters colors to match the themes
// TODO: Update filters to work with dark mode
const FilterPanel = ({ appliedFilters, total }: FilterPanelProps) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const [brands, setBrands] = useState<SelectOption[]>([])
    const [models, setModels] = useState<SelectOption[]>([])
    const [collections, setCollections] = useState<SelectOption[]>([])

    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: brands } = await getBrands()
                const { data: models } = await getModels()
                const { data: collections } = await getCollections()

                setBrands(brands.map((b) => (
                    { value: b.slug!, label: b.name }
                )))
                setModels(models.map((m) => (
                    { value: m.slug!, label: m.name }
                )))
                setCollections(collections.map((c) => (
                    { value: c.slug!, label: c.name }
                )))
            } catch (e) {
                console.error(e)
            }
        }

        fetchData()
    }, [])

    const handleBrandChange = (selectedBrands: string[]) => {
        const updatedFilters = { ...appliedFilters, brand: selectedBrands }
        updateURLParams(updatedFilters)
    }

    const handleModelChange = (selectedModels: string[]) => {
        const updatedFilters = { ...appliedFilters, model: selectedModels }
        updateURLParams(updatedFilters)
    }

    const handleCollectionChange = (selectedCollections: string[]) => {
        const updatedFilters = { ...appliedFilters, collection: selectedCollections }
        updateURLParams(updatedFilters)
    }

    const handlePriceChange = (newRange: [number, number]) => {
        console.log(newRange)
    }

    const handleSizeChange = (selectedSizes: number[]) => {
        console.log(selectedSizes)
    }

    const handleSortChange = ([selectedOption]: string[]) => {
        console.log(selectedOption)
    }

    const updateURLParams = (filters: ProductFilters) => {
        const queryParams = new URLSearchParams()

        if (filters.brand) filters.brand.forEach(b => queryParams.append('brand', b!))
        if (filters.model) filters.model.forEach(m => queryParams.append('model', m!))
        if (filters.collection) filters.collection.forEach(c => queryParams.append('collection', c!))
        if (filters.size) queryParams.set('size', filters.size)
        if (filters.filter) queryParams.set('filter', filters.filter)
        if (filters.sort) queryParams.set('sort', filters.sort)
        if (filters.dir) queryParams.set('dir', filters.dir)

        router.push(`${pathname}?${queryParams.toString()}`)
    }

    // Get these from the backend
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
        <div className='grid grid-cols-3 items-end justify-between'>
            {!isExpanded && <div className="leading-tight">
                <p className='font-medium text-primary-500 text-2xl'>All</p>
                <span className="inline-flex items-baseline gap-2">
                    <p className='font-bold text-3xl'>Sneakers</p>
                    {!!total && <p className="font-semibold text-lg">({total})</p>}
                </span>
            </div>}

            <div className={cn(isExpanded ? 'col-span-3' : 'col-span-2')}>
                {isExpanded && <p className='font-semibold text-md text-primary-700 leading-loose'>Showing {total} item(s)</p>}

                <div className='flex items-center gap-3'>
                    <div className="flex-1">
                        <MultiSelect
                            id='brands-select'
                            options={brands}
                            placeholder='Brand'
                            className=''
                            onChange={handleBrandChange}
                        />
                    </div>
                    {isExpanded && (
                        <>
                            <div className="flex-1">
                                <MultiSelect
                                    id='models-select'
                                    options={models}
                                    placeholder='Models'
                                    className=''
                                    onChange={handleModelChange}
                                />
                            </div>
                            <div className="flex-1">
                                <MultiSelect
                                    id='collections-select'
                                    options={collections}
                                    placeholder='Collections'
                                    className=''
                                    onChange={handleCollectionChange}
                                />
                            </div>
                        </>
                    )}
                    <div className="flex-1">
                        <PriceRange
                            id='price-range'
                            placeholder='Price'
                            min={0}
                            max={600}
                            bins={bins}
                            className=''
                            onChange={handlePriceChange}
                        />
                    </div>
                    <div className="flex-1">
                        <SizeFilter
                            id='size-filter'
                            placeholder='Sizes'
                            categories={SIZING_CATEGORY_OPTIONS}
                            className=''
                            onChange={handleSizeChange}
                        />
                    </div>
                    <div className="flex-1">
                        <Select
                            id='sort'
                            placeholder='Sort By'
                            options={SORT_OPTIONS}
                            className=''
                            onChange={handleSortChange}
                        />
                    </div>
                    <span className="h-6 border-l border-border mx-1" />
                    <IconButton
                        icon={isExpanded ? 'tabler:arrow-bar-to-right' : 'hugeicons:filter-horizontal'}
                        className="p-2 rounded-xl shadow-none border border-border text-primary-600"
                        onClick={() => setIsExpanded((prev) => !prev)}
                    />
                </div>
            </div>
        </div>
    )
}

export default FilterPanel
