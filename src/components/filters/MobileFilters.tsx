'use client'

import { ProductFilters } from "@/types"
import { DynamicFilterHeading, FiltersPanelProps } from "./FiltersPanel"
import FiltersDrawer from "./drawers/FiltersDrawer"
import SortDrawer from "./drawers/SortDrawer"

interface MobileFiltersProps extends FiltersPanelProps {
    dynamicHeading: DynamicFilterHeading
    updateFilters: (newFilters: Partial<ProductFilters>) => void
}

const MobileFilters = ({
    initialFilters,
    total,
    dynamicHeading,
    updateFilters,
    ...props
}: MobileFiltersProps) => {
    const { sort, order, ...filters } = initialFilters

    return (
        <div className="flex flex-col gap-3 mt-6">
            <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
                <div className="leading-tight">
                    <p className="font-medium text-xl text-primary-500">{dynamicHeading.heading}</p>
                    <span className="inline-flex flex-wrap items-baseline gap-x-2">
                        <p className="font-bold text-xl md:text-2xl">{dynamicHeading.labels[0]}</p>
                        {dynamicHeading.labels.length > 1 && <p className="text-base">& others</p>}
                    </span>
                </div>

                {!!total && <p className='font-semibold text-md text-primary-700 w-fit'>{total} results</p>}
            </div>

            <div className="flex items-center justify-evenly border-y border-border">
                <FiltersDrawer
                    initialFilters={{ ...filters }}
                    updateFilters={updateFilters}
                    {...props} />
                <span className='w-px h-8 bg-border' />
                <SortDrawer
                    sort={sort}
                    order={order}
                    updateFilters={updateFilters} />
            </div>
        </div>
    )
}

export default MobileFilters