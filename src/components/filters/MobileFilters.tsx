'use client'

import { ProductFilters } from "@/types";
import FiltersDrawer from "../drawers/FiltersDrawer";
import SortDrawer from "../drawers/SortDrawer";
import { FilterPanelProps } from "./FilterPanel";

interface MobileFiltersProps extends FilterPanelProps {
    dynamicLabels: string[]
    updateFilters: (newFilters: Partial<ProductFilters>) => void
}

const MobileFilters = ({
    initialFilters,
    total,
    dynamicLabels,
    updateFilters,
    ...props
}: MobileFiltersProps) => {
    const { sort, order, ...filters } = initialFilters

    return (
        <div className="flex flex-col gap-3 mt-6">
            <div className="flex items-end justify-between">
                <div className="text-2xl leading-tight">
                    <p className="font-medium text-primary-500">{initialFilters.brand?.length ? 'Brand' : 'All'}</p>
                    <span className="inline-flex flex-wrap items-baseline gap-x-2">
                        <p className="font-bold">{dynamicLabels[0]}</p>
                        {dynamicLabels.length > 1 && <p className="text-base">& others</p>}
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