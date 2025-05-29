'use client'

import Button from '@/components/base/button/Button'
import ToggleButton from '@/components/base/button/ToggleButton'
import { SIZES } from '@/lib/options'
import { SelectOption } from '@/types'
import { Product } from '@/types/payload'
import { cn } from '@/utils'
import { useEffect, useMemo, useState } from 'react'
import FilterControl from './FilterControl'

interface SizeFilterProps {
  id: string
  placeholder: string
  categories: SelectOption[]
  selected?: { category: Product['size_category']; sizes: number[] }
  compact?: boolean
  onChange: (category: Product['size_category'], sizes: number[]) => void
  onClear: VoidFunction
}

const SizeFilter = ({
  id,
  placeholder,
  categories,
  selected = { category: 'mens', sizes: [] },
  compact = false,
  onChange,
  onClear
}: SizeFilterProps) => {
  const initializeSizeState = (categories: SelectOption[]) =>
    categories.reduce(
      (acc, category) => ({
        ...acc,
        [category.value]: []
      }),
      {} as Record<Product['size_category'], number[]>
    )

  const [selectedCategory, setSelectedCategory] = useState<Product['size_category']>(
    categories[0].value as Product['size_category']
  )
  const [selectedSizes, setSelectedSizes] = useState<Record<Product['size_category'], number[]>>(
    () => initializeSizeState(categories)
  )

  const sizes = useMemo(
    () => SIZES.find(cat => cat.value === selectedCategory)?.sizes || [],
    [selectedCategory]
  )
  const currentSizes = selectedSizes[selectedCategory] || []

  const displayedValue =
    currentSizes.length === 0
      ? ''
      : currentSizes.length < 3
        ? `US - ${currentSizes.join(', ')}`
        : `${currentSizes.length} selected`

  const displayedPlaceholder = selectedCategory
    ? `${placeholder} (${categories.find(o => o.value === selectedCategory)?.label})`
    : placeholder

  useEffect(() => {
    setSelectedCategory(selected.category)
    setSelectedSizes(prev => ({ ...prev, [selected.category]: selected.sizes }))
  }, [selected])

  const onCategoryChange = (category: string) => {
    const newCategory = category as Product['size_category']
    setSelectedCategory(newCategory)
    onChange(newCategory, selectedSizes[newCategory])
  }

  const onSizeSelect = (size: number) => {
    const updated = selectedSizes[selectedCategory].includes(size)
      ? selectedSizes[selectedCategory].filter(s => s !== size)
      : [...selectedSizes[selectedCategory], size]

    setSelectedSizes(prev => ({ ...prev, [selectedCategory]: updated }))
    onChange(selectedCategory, updated)
  }

  const handleOnClear = () => {
    setSelectedSizes(prev => ({ ...prev, [selectedCategory]: [] }))
    onClear()
  }

  const renderSizes = () => {
    return (
      <>
        <ToggleButton
          options={categories}
          selected={selectedCategory}
          onChange={onCategoryChange}
        />

        <ul className="grid grid-cols-5 gap-3 md:grid-cols-6 lg:grid-cols-5">
          {sizes.map(size => (
            <button
              key={size}
              className={cn(
                'transition-color flex cursor-pointer items-center justify-center rounded-xl border border-border bg-primary-100/20 px-4 py-2.5 font-semibold text-primary-700 duration-300 ease-in-out',
                {
                  'hover:bg-primary-100/50': !selectedSizes[selectedCategory].includes(size),
                  'border-primary-900 bg-primary-100/50 text-foreground ring-1 ring-primary-900 dark:border-secondary dark:bg-secondary-100/10 dark:text-secondary dark:ring-secondary':
                    selectedSizes[selectedCategory].includes(size)
                }
              )}
              onClick={() => onSizeSelect(size)}
            >
              {size}
            </button>
          ))}
        </ul>
      </>
    )
  }

  if (compact) {
    return (
      <div className="flex flex-col gap-2">
        <div className="mb-3 leading-tight">
          <h3 className="text-lg font-semibold">Sizes (US)</h3>
          <p className="text-md font-medium text-primary-600">
            Select a category to view all items, or choose a size to filter within the category.
          </p>
        </div>

        {renderSizes()}
        <Button
          variant="ghost"
          size="small"
          label="Clear"
          disabled={!selectedSizes[selectedCategory].length}
          className="w-full justify-end rounded-lg py-3 shadow-none hover:bg-transparent focus:ring-0 focus:ring-offset-0 active:underline active:underline-offset-4 active:shadow-none active:ring-0 active:ring-offset-0"
          onClick={handleOnClear}
        />
      </div>
    )
  }

  return (
    <FilterControl id={id} placeholder={displayedPlaceholder} value={displayedValue}>
      <div className="absolute right-0 top-full z-10 mt-2 w-full min-w-[400px] overflow-clip rounded-xl border border-border bg-background shadow-lg 2xl:left-0">
        <div className="flex flex-col gap-4 px-6 pb-4 pt-6">{renderSizes()}</div>
        <div className="flex border-t border-border">
          <Button
            variant="ghost"
            size="small"
            label="Clear"
            disabled={!selectedSizes[selectedCategory].length}
            className="flex-1 justify-end rounded-none py-3 shadow-none hover:underline hover:underline-offset-4 focus:ring-0 focus:ring-offset-0 active:shadow-none active:ring-0 active:ring-offset-0"
            onClick={handleOnClear}
          />
        </div>
      </div>
    </FilterControl>
  )
}

export default SizeFilter
