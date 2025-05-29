'use client'

import { ProductFilters } from '@/types'
import { DynamicFilterHeading, FiltersPanelProps } from './FiltersPanel'
import FiltersDrawer from './drawers/FiltersDrawer'
import SortDrawer from './drawers/SortDrawer'

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
    <div className="mt-6 flex flex-col gap-3">
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div className="leading-tight">
          <p className="text-xl font-medium text-primary-500">{dynamicHeading.heading}</p>
          <span className="inline-flex flex-wrap items-baseline gap-x-2">
            <p className="text-xl font-bold md:text-2xl">{dynamicHeading.labels[0]}</p>
            {dynamicHeading.labels.length > 1 && <p className="text-base">& others</p>}
          </span>
        </div>

        {!!total && <p className="w-fit text-md font-semibold text-primary-700">{total} results</p>}
      </div>

      <div className="flex items-center justify-evenly border-y border-border">
        <FiltersDrawer initialFilters={{ ...filters }} updateFilters={updateFilters} {...props} />
        <span className="h-8 w-px bg-border" />
        <SortDrawer sort={sort} order={order} updateFilters={updateFilters} />
      </div>
    </div>
  )
}

export default MobileFilters
