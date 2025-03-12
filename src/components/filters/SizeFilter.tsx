'use client'

import { cn } from '@/utils'
import { useState } from 'react'
import FilterControl from './FilterControl'

interface SizeFilterProps {
    id: string
    placeholder: string
    sizes: number[]
    onChange: (value: number[]) => void
}

const SizeFilter = ({
    id,
    placeholder,
    sizes,
    onChange
}: SizeFilterProps) => {
    const [selectedSizes, setSelectedSizes] = useState<number[]>([])

    const handleOnChange = (newValue: number) => {
        let updatedSizes = [...selectedSizes]

        if (selectedSizes.includes(newValue)) {
            updatedSizes = updatedSizes.filter(size => size !== newValue)
        } else {
            updatedSizes.push(newValue)
        }

        setSelectedSizes(updatedSizes)
        onChange(updatedSizes)
    }

    return (
        <FilterControl
            id={id}
            menu={
                <div className='absolute top-full w-full min-w-[400px] left-0 mt-2 z-20 border border-border rounded-xl bg-background shadow-lg'>
                    <div className='flex flex-col gap-4 px-6 py-4'>
                        <h3 className='font-semibold text-lg'>Sizes (US)</h3>
                        <ul className='grid grid-cols-5 gap-x-2 gap-y-3'>
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    className={cn(
                                        'flex items-center justify-center px-4 py-2 rounded-lg border border-primary-200 font-semibold text-primary-700 cursor-pointer transition-color ease-in-out duration-300',
                                        {
                                            'border-secondary': selectedSizes.includes(size),
                                            'hover:border-primary-900': !selectedSizes.includes(size)
                                        }
                                    )}
                                    onClick={() => handleOnChange(size)}>
                                    {size}
                                </button>
                            ))}
                        </ul>
                    </div>

                    <div className='flex border-t border-border'>
                        <button
                            className='flex-1 px-6 py-3 font-medium text-md text-right hover:bg-primary-100/50 hover:underline hover:underline-offset-4 disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none'
                            disabled={!selectedSizes.length}
                            onClick={() => setSelectedSizes([])}>
                            Reset
                        </button>
                    </div>
                </div>
            }>
            {selectedSizes.length > 0
                ? <p className='font-medium text-md'>{selectedSizes.join(', ')}</p>
                : <p className='text-md font-medium text-primary-600'>{placeholder}</p>
            }
        </FilterControl>
    )
}

export default SizeFilter