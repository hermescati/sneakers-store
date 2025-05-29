'use client'

import { SIZING_CATEGORY_OPTIONS } from '@/lib/options'
import { ProductFilters, SelectOption, SortOrder } from '@/types'
import { Product } from '@/types/payload'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'
import { HistogramBin } from './base/RangeSlider'
import DesktopFilters from './DesktopFilters'
import FilterTags from './FiltersTags'
import MobileFilters from './MobileFilters'

export interface FiltersPanelProps {
  initialFilters: ProductFilters
  brandOptions: SelectOption[]
  modelOptions: SelectOption[]
  collabOptions: SelectOption[]
  priceBins?: HistogramBin[]
  total?: number
}

export type DynamicFilterHeading = {
  heading: string
  labels: string[]
}

// TODO: Filter the model and collection based on the selected brand, if no selected brand, then show them all
// To be completed once a mechanism to have a centralized config is done so it takes the values from there and
// and constructs the SelectOption array in this component.
const FiltersPanel = ({ initialFilters, ...props }: FiltersPanelProps) => {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const updatedFilters: ProductFilters = {
      brand: searchParams.getAll('brand') || undefined,
      model: searchParams.getAll('model') || undefined,
      collaboration: searchParams.getAll('collaboration') || undefined,
      category: (searchParams.get('category') as Product['size_category']) || undefined,
      size: searchParams.getAll('size').map(Number) || undefined,
      price: searchParams.get('price') || undefined,
      sort: searchParams.get('sort') || undefined,
      order: searchParams.get('order') as SortOrder | undefined,
      query: searchParams.get('query') || ''
    }
    setFilters(updatedFilters)
  }, [searchParams])

  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    const queryParams = new URLSearchParams(searchParams.toString())
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

  const dynamicHeading = (): DynamicFilterHeading => {
    if (filters.query) {
      return { heading: 'Term', labels: [`"${filters.query}"`] }
    }

    if (filters.brand?.length) {
      const brandsLabels = filters.brand
        .map(b => props.brandOptions.find(o => o.value === b)?.label || '')
        .filter(Boolean)

      return { heading: 'Brand', labels: brandsLabels }
    }

    if (filters.model?.length) {
      const modelsLabels = filters.model
        .map(m => props.modelOptions.find(o => o.value === m)?.label || '')
        .filter(Boolean)

      return { heading: 'Model', labels: modelsLabels }
    }

    if (filters.collaboration?.length) {
      const collabLabels = filters.collaboration
        .map(c => props.collabOptions.find(o => o.value === c)?.label || '')
        .filter(Boolean)

      return { heading: 'Collaboration', labels: collabLabels }
    }

    return { heading: 'All', labels: ['Sneakers'] }
  }

  return (
    <>
      <div className="hidden lg:block">
        <DesktopFilters
          initialFilters={filters}
          dynamicHeading={dynamicHeading()}
          updateFilters={debounceUpdateFilters}
          {...props}
        />
      </div>

      <div className="lg:hidden">
        <MobileFilters
          initialFilters={filters}
          dynamicHeading={dynamicHeading()}
          updateFilters={updateFilters}
          {...props}
        />
      </div>

      <div className="my-3 hidden md:block">
        <FilterTags
          appliedFilters={filters}
          brandOptions={props.brandOptions}
          modelOptions={props.modelOptions}
          collabOptions={props.collabOptions}
          categoryOptions={SIZING_CATEGORY_OPTIONS}
          updateFilters={updateFilters}
        />
      </div>
    </>
  )
}

export default FiltersPanel
