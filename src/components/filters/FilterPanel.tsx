'use client'

import { getBrands, getCollections, getModels } from "@/services/products"
import { ProductFilters, SelectOption } from "@/types"
import { useEffect, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import MultiSelect from "../base/input/MultiSelect"

interface FilterPanelProps {
    appliedFilters: ProductFilters
    total?: number
}

const FilterPanel = ({ appliedFilters, total }: FilterPanelProps) => {
    const [brands, setBrands] = useState<SelectOption[]>([])
    const [models, setModels] = useState<SelectOption[]>([])
    const [collections, setCollections] = useState<SelectOption[]>([])

    const isMobile = useMediaQuery('(max-width: 1023px)')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: brands } = await getBrands()
                const { data: models } = await getModels()
                const { data: collections } = await getCollections()

                setBrands(brands.map((b) => (
                    { value: b.id, label: b.name }
                )))
                setModels(models.map((m) => (
                    { value: m.id, label: m.name }
                )))
                setCollections(collections.map((c) => (
                    { value: c.id, label: c.name }
                )))
            } catch (e) {
                console.error(e)
            }
        }

        fetchData()
    }, [])

    const handleBrandChange = (selectedBrands: string[]) => {
        const updatedFilters = { ...appliedFilters, brand: selectedBrands }
        console.log({updatedFilters})
    }

    const handleModelChange = (selectedModels: string[]) => {
        const updatedFilters = { ...appliedFilters, models: selectedModels }
        console.log({updatedFilters})
    }

    const handleCollectionChange = (selectedCollections: string[]) => {
        const updatedFilters = { ...appliedFilters, collections: selectedCollections }
        console.log({updatedFilters})
    }

    return (
        <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 items-end'>
            <div className="leading-tight col-span-2">
                <p className='text-primary-500 text-2xl'>All</p>
                <span className="inline-flex items-baseline gap-2">
                    <p className='font-bold text-3xl'>Sneakers</p>
                    {!!total && <p className="font-semibold text-lg">({total})</p>}
                </span>
            </div>

            {!isMobile &&
                <div className="col-span-4 w-full grid grid-cols-5 items-center gap-3">
                    <MultiSelect
                        id='brands-select'
                        options={brands}
                        placeholder="Brand"
                        onChange={handleBrandChange}
                    />
                    <MultiSelect
                        id='models-select'
                        options={models}
                        placeholder="Models"
                        onChange={handleModelChange}
                    />
                    <MultiSelect
                        id='collections-select'
                        options={collections}
                        placeholder="Collections"
                        onChange={handleCollectionChange}
                    />
                </div>
            }
        </div>
    )
}

export default FilterPanel