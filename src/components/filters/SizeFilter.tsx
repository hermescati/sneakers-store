'use client'

import { SIZES } from '@/lib/options'
import { SelectOption } from '@/types'
import { Product } from '@/types/payload'
import { arraysEqual, cn } from '@/utils'
import { useEffect, useMemo, useState } from 'react'
import Button from '../base/button/Button'
import ToggleButton from '../base/button/ToggleButton'
import FilterControl from './FilterControl'

interface SizeFilterProps {
    id: string
    placeholder: string
    categories: SelectOption[]
    selected?: { category: Product['size_category'], sizes: number[] }
    onChange: (category: Product['size_category'], sizes: number[]) => void
    onClear: VoidFunction
}

const SizeFilter = ({
    id,
    placeholder,
    categories,
    selected = { category: 'mens', sizes: [] },
    onChange,
    onClear
}: SizeFilterProps) => {
    const initializeSizeState = (categories: SelectOption[]) => {
        return categories.reduce(
            (acc, category) => ({
                ...acc,
                [category.value]: []
            }),
            {} as Record<Product['size_category'], number[]>
        )
    }

    const [selectedCategory, setSelectedCategory] = useState<Product['size_category']>(
        categories[0].value as Product['size_category']
    )

    const [selectedSizes, setSelectedSizes] = useState<Record<Product['size_category'], number[]>>(
        () => initializeSizeState(categories)
    )

    const sizes = useMemo(() => {
        return SIZES.find(category => category.value === selectedCategory)?.sizes || []
    }, [selectedCategory])
    const currentSizes = useMemo(() => {
        return (selectedSizes[selectedCategory] || [])
    }, [selectedSizes, selectedCategory])

    useEffect(() => {
        setSelectedCategory(selected.category)
        setSelectedSizes(prev => ({
            ...prev,
            [selected.category]: selected.sizes
        }))
    }, [selected])

    const displayedValue = currentSizes.length === 0
        ? ''
        : currentSizes.length < 5
            ? `US - ${currentSizes.join(', ')}`
            : `${currentSizes.length} selected`

    const displayedPlaceholder = selectedCategory
        ? `${placeholder} (${categories.find((o) => o.value === selectedCategory)?.label})`
        : placeholder

    const canApply = (selected.category !== selectedCategory
        || !arraysEqual(selected.sizes, selectedSizes[selectedCategory]))
        && currentSizes.length > 0

    const handleOnChange = (newValue: number) => {
        setSelectedSizes((prev) => {
            const updatedSizes: Record<Product['size_category'], number[]> = { ...prev }
            const categorySizes = new Set(updatedSizes[selectedCategory])

            if (categorySizes.has(newValue)) {
                categorySizes.delete(newValue)
            } else {
                categorySizes.add(newValue)
            }

            return Object.keys(updatedSizes).reduce((acc, key) => {
                acc[key as Product['size_category']] =
                    key === selectedCategory ? Array.from(categorySizes) : updatedSizes[key as Product['size_category']].filter(size => size !== newValue)
                return acc
            }, {} as Record<Product['size_category'], number[]>)
        })
    }

    const handleOnClear = () => {
        setSelectedCategory(categories[0]?.value as Product['size_category'])
        setSelectedSizes(initializeSizeState(categories))
        onClear()
    }

    return (
        <FilterControl
            id={id}
            placeholder={displayedPlaceholder}
            value={displayedValue}>
            <div className='absolute top-full w-full min-w-[400px] right-0 2xl:left-0 mt-2 z-10 border border-border rounded-xl bg-background shadow-lg overflow-clip'>
                <div className='flex flex-col gap-4 px-6 pt-6 pb-4'>
                    <ToggleButton
                        options={categories}
                        selected={selectedCategory}
                        onChange={(newValue) => setSelectedCategory(newValue as Product['size_category'])} />

                    <ul className='grid grid-cols-5 gap-3'>
                        {sizes.map((size) => (
                            <button
                                key={size}
                                className={cn(
                                    'flex items-center justify-center px-4 py-2.5 border border-border rounded-xl bg-primary-100/20 font-semibold text-primary-700 cursor-pointer transition-color ease-in-out duration-300',
                                    {
                                        'hover:bg-primary-100/50': !selectedSizes[selectedCategory]?.includes(size),
                                        'ring-1 ring-primary-900 border-primary-900 bg-primary-100/50 text-foreground dark:ring-secondary dark:border-secondary dark:bg-secondary-100/10 dark:text-secondary': selectedSizes[selectedCategory]?.includes(size)
                                    }
                                )}
                                onClick={() => handleOnChange(size)} >
                                {size}
                            </button>
                        ))}
                    </ul>
                </div>

                <div className='flex border-t border-border divide-x divide-border'>
                    <Button
                        variant='ghost'
                        size='small'
                        disabled={!selectedSizes[selectedCategory]?.length}
                        className='flex-1 py-3 rounded-none hover:underline hover:underline-offset-4 active:ring-0 active:ring-offset-0 focus:ring-0 focus:ring-offset-0 shadow-none active:shadow-none'
                        onClick={handleOnClear}>
                        Clear
                    </Button>
                    <Button
                        variant='ghost'
                        size='small'
                        disabled={!canApply}
                        className='flex-1 py-3 rounded-none text-secondary hover:underline hover:underline-offset-4 active:ring-0 active:ring-offset-0 focus:ring-0 focus:ring-offset-0 shadow-none active:shadow-none'
                        onClick={() => onChange(selectedCategory, selectedSizes[selectedCategory] || [])}>
                        Apply
                    </Button>
                </div>
            </div>
        </FilterControl>
    )
}

export default SizeFilter
