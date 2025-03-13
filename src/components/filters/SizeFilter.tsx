import { SIZE_CATEGORIES } from '@/lib/options'
import { SelectOption } from '@/types'
import { cn, getSizeCategoryKey } from '@/utils'
import { useMemo, useState } from 'react'
import ToggleButton from '../base/ToggleButton'
import FilterControl from './FilterControl'

interface SizeFilterProps {
    id: string
    placeholder: string
    categories: SelectOption[]
    className?: string
    onChange: (value: number[]) => void
}

const SizeFilter = ({
    id,
    placeholder,
    categories,
    className,
    onChange
}: SizeFilterProps) => {
    const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: number[] }>({
        mens: [],
        womens: [],
        kids: [],
    })
    const [selectedCategory, setSelectedCategory] = useState<string>(categories[0].value)

    const selectedKey = useMemo(() => getSizeCategoryKey(selectedCategory), [selectedCategory])
    const sizes = useMemo(() => SIZE_CATEGORIES[selectedKey] || [], [selectedKey])

    const handleOnChange = (newValue: number) => {
        const updatedSizes = { ...selectedSizes }

        if (updatedSizes[selectedCategory].includes(newValue)) {
            updatedSizes[selectedCategory] = updatedSizes[selectedCategory].filter(size => size !== newValue)
        } else {
            updatedSizes[selectedCategory].push(newValue)
        }

        Object.keys(updatedSizes).forEach(category => {
            if (category !== selectedCategory) {
                updatedSizes[category] = updatedSizes[category].filter(size => size !== newValue)
            }
        })

        setSelectedSizes(updatedSizes)
        onChange(Object.values(updatedSizes).flat())
    }

    return (
        <FilterControl
            id={id}
            menu={
                <div className='absolute top-full w-full min-w-[400px] left-0 mt-2 z-20 border border-border rounded-xl bg-background shadow-lg'>
                    <div className='flex flex-col gap-4 px-6 py-4'>
                        <h3 className='font-semibold text-lg'>Sizes (US)</h3>
                        <ToggleButton
                            options={categories}
                            selected={selectedCategory}
                            onChange={(newValue) => setSelectedCategory(newValue)} />

                        <ul className='grid grid-cols-5 gap-x-2 gap-y-3'>
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    className={cn(
                                        'flex items-center justify-center px-4 py-2 rounded-lg border border-primary-200 font-semibold text-primary-700 cursor-pointer transition-color ease-in-out duration-300',
                                        {
                                            'border-secondary': selectedSizes[selectedCategory]?.includes(size),
                                            'hover:border-primary-900': !selectedSizes[selectedCategory]?.includes(size)
                                        }
                                    )}
                                    onClick={() => handleOnChange(size)} >
                                    {size}
                                </button>
                            ))}
                        </ul>
                    </div>

                    <div className='flex border-t border-border'>
                        <button
                            className='flex-1 px-6 py-3 font-medium text-md text-right hover:bg-primary-100/50 hover:underline hover:underline-offset-4 disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none'
                            disabled={selectedSizes[selectedCategory].length === 0}
                            onClick={() => {
                                const resetSizes = { ...selectedSizes }
                                resetSizes[selectedCategory] = []
                                setSelectedSizes(resetSizes)
                                onChange([])
                            }}>
                            Reset
                        </button>
                    </div>
                </div>
            }>
            <div className={className}>
                {selectedSizes[selectedCategory].length > 0
                    ? <p className='font-medium text-md'>US - {selectedSizes[selectedCategory].join(', ')}</p>
                    : <p className='text-md font-medium text-primary-600'>{placeholder}</p>
                }
            </div>
        </FilterControl>
    )
}

export default SizeFilter
