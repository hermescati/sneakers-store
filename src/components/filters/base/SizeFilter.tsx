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
    selected?: { category: Product['size_category'], sizes: number[] }
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
        categories.reduce((acc, category) => ({
            ...acc,
            [category.value]: []
        }), {} as Record<Product['size_category'], number[]>)

    const [selectedCategory, setSelectedCategory] = useState<Product['size_category']>(categories[0].value as Product['size_category'])
    const [selectedSizes, setSelectedSizes] = useState<Record<Product['size_category'], number[]>>(() => initializeSizeState(categories))

    const sizes = useMemo(() => SIZES.find(cat => cat.value === selectedCategory)?.sizes || [], [selectedCategory])
    const currentSizes = selectedSizes[selectedCategory] || []

    const displayedValue = currentSizes.length === 0
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
                    onChange={onCategoryChange} />

                <ul className='grid grid-cols-5 md:grid-cols-6 lg:grid-cols-5 gap-3'>
                    {sizes.map((size) => (
                        <button
                            key={size}
                            className={cn(
                                'flex items-center justify-center px-4 py-2.5 border border-border rounded-xl bg-primary-100/20 font-semibold text-primary-700 cursor-pointer transition-color ease-in-out duration-300',
                                {
                                    'hover:bg-primary-100/50': !selectedSizes[selectedCategory].includes(size),
                                    'ring-1 ring-primary-900 border-primary-900 bg-primary-100/50 text-foreground dark:ring-secondary dark:border-secondary dark:bg-secondary-100/10 dark:text-secondary': selectedSizes[selectedCategory].includes(size)
                                }
                            )}
                            onClick={() => onSizeSelect(size)}>
                            {size}
                        </button>
                    ))}
                </ul>
            </>
        )
    }

    if (compact) {
        return (
            <div className='flex flex-col gap-2'>
                <div className='leading-tight mb-3'>
                    <h3 className='font-semibold text-lg'>Sizes (US)</h3>
                    <p className='font-medium text-md text-primary-600'>
                        Select a category to view all items, or choose a size to filter within the category.
                    </p>
                </div>

                {renderSizes()}
                <Button
                    variant='ghost'
                    size='small'
                    label='Clear'
                    disabled={!selectedSizes[selectedCategory].length}
                    className='w-full py-3 justify-end rounded-lg hover:bg-transparent active:underline active:underline-offset-4 active:ring-0 active:ring-offset-0 focus:ring-0 focus:ring-offset-0 shadow-none active:shadow-none'
                    onClick={handleOnClear} />
            </div>
        )
    }

    return (
        <FilterControl
            id={id}
            placeholder={displayedPlaceholder}
            value={displayedValue}>
            <div className='absolute top-full w-full min-w-[400px] right-0 2xl:left-0 mt-2 z-10 border border-border rounded-xl bg-background shadow-lg overflow-clip'>
                <div className='flex flex-col gap-4 px-6 pt-6 pb-4'>
                    {renderSizes()}
                </div>
                <div className='flex border-t border-border'>
                    <Button
                        variant='ghost'
                        size='small'
                        label='Clear'
                        disabled={!selectedSizes[selectedCategory].length}
                        className='flex-1 py-3 justify-end rounded-none hover:underline hover:underline-offset-4 active:ring-0 active:ring-offset-0 focus:ring-0 focus:ring-offset-0 shadow-none active:shadow-none'
                        onClick={handleOnClear} />
                </div>
            </div>
        </FilterControl>
    )
}

export default SizeFilter
