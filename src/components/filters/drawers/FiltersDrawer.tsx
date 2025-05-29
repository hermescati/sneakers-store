'use client'

import Button from '@/components/base/button/Button'
import { SIZING_CATEGORY_OPTIONS } from '@/lib/options'
import { ProductFilters } from '@/types'
import { useEffect, useMemo, useState } from 'react'
import { Drawer } from 'vaul'
import { FiltersPanelProps } from '../FiltersPanel'
import MultiSelectFilter from '../base/MultiSelectFilter'
import PriceRange from '../base/PriceRange'
import SizeFilter from '../base/SizeFilter'

interface FiltersDrawerProps extends FiltersPanelProps {
  initialFilters: Omit<ProductFilters, 'sort' | 'order'>
  updateFilters: (newFilters: Partial<ProductFilters>) => void
}

const FiltersDrawer = ({
  initialFilters,
  brandOptions,
  modelOptions,
  collabOptions,
  priceBins,
  updateFilters
}: FiltersDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<ProductFilters>(initialFilters)

  const initialFiltersCount = useMemo(() => {
    return Object.entries(initialFilters).filter(
      ([, value]) => value && (Array.isArray(value) ? value.length > 0 : true)
    ).length
  }, [initialFilters])

  const currentFiltersCount = useMemo(() => {
    return Object.entries(filters).filter(
      ([key, value]) =>
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
    return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : []
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
      collaboration: undefined,
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
    <Drawer.Root shouldScaleBackground handleOnly open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger asChild>
        <Button
          variant="ghost"
          size="small"
          label={initialFiltersCount ? `Filters (${initialFiltersCount})` : 'Filters'}
          iconAppend="hugeicons:filter-horizontal"
          className="w-full justify-between gap-4 rounded-none py-3.5 pr-6 hover:bg-transparent"
          iconClass="text-xl"
        />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-30 bg-black/40" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-30 mt-24 flex h-full max-h-[96%] flex-col rounded-t-2xl bg-background outline-none">
          <div className="relative mx-auto flex h-full w-full max-w-lg flex-col p-3">
            <Drawer.Handle className="relative !mx-0 mb-6 !flex !w-full !items-center !justify-center !bg-transparent">
              <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-primary-200"></div>
            </Drawer.Handle>
            <Drawer.Title className="mx-3 border-b border-border pb-2 text-xl font-semibold">
              Filters
            </Drawer.Title>

            <div className="h-full divide-y divide-border overflow-y-auto px-3">
              <div>
                <MultiSelectFilter
                  title="Brands"
                  options={brandOptions}
                  selectedValues={getSelectedValues('brand')}
                  onSelect={value => handleSelect('brand', value)}
                  onClear={() => updateFilters({ ...filters, brand: undefined })}
                />
                <MultiSelectFilter
                  title="Models"
                  options={modelOptions}
                  selectedValues={getSelectedValues('model')}
                  onSelect={value => handleSelect('model', value)}
                  onClear={() => updateFilters({ ...filters, model: undefined })}
                />
                <MultiSelectFilter
                  title="Collaborations"
                  options={collabOptions}
                  selectedValues={getSelectedValues('collaboration')}
                  onSelect={value => handleSelect('collaboration', value)}
                  onClear={() => updateFilters({ ...filters, collaboration: undefined })}
                />
              </div>
              <div className="pb-2 pt-3">
                <PriceRange
                  id="price-range"
                  placeholder="Price"
                  min={0}
                  max={600}
                  selected={filters.price}
                  bins={priceBins}
                  compact
                  onChange={priceRange =>
                    setFilters({
                      ...filters,
                      price: `${priceRange[0]}-${priceRange[1]}`
                    })
                  }
                  onClear={() => updateFilters({ ...filters, price: undefined })}
                />
              </div>
              <div className="pb-2 pt-3">
                <SizeFilter
                  id="size-filter"
                  placeholder="Sizes"
                  categories={SIZING_CATEGORY_OPTIONS}
                  selected={{
                    category: filters.category || initialFilters.category || 'mens',
                    sizes: filters.size || initialFilters.size || []
                  }}
                  compact
                  onChange={(category, sizes) =>
                    setFilters({
                      ...filters,
                      category,
                      size: sizes
                    })
                  }
                  onClear={() =>
                    updateFilters({
                      ...filters,
                      category: undefined,
                      size: undefined
                    })
                  }
                />
              </div>
            </div>

            {/* TODO: Add some sliding animation for the button */}
            <div className="flex items-center justify-evenly gap-2 border-t border-border bg-background px-3 py-2 transition-all duration-300 ease-in-out">
              {currentFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  label="Clear all"
                  className="w-full active:underline active:underline-offset-4"
                  onClick={clearAll}
                />
              )}
              <Button
                className="w-full"
                label="Apply"
                disabled={isApplyDisabled}
                onClick={applyFilters}
              />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default FiltersDrawer
