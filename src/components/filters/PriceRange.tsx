'use client'

import { formatPrice } from '@/utils'
import { useState } from 'react'
import FilterControl from './FilterControl'
import RangeSlider, { HistogramBin } from './RangeSlider'

interface PriceRangeProps {
    id: string
    placeholder: string
    min: number
    max: number
    bins?: HistogramBin[]
    onChange: (value: [number, number]) => void
    onClear: VoidFunction
}

const PriceRange = ({
    id,
    placeholder,
    min,
    max,
    onChange,
    onClear,
    ...props
}: PriceRangeProps) => {
    const [selectedRange, setSelectedRange] = useState<[number, number]>([min, max])

    const displayValues = () => {
        if (selectedRange[0] === min && selectedRange[1] === max) return ''
        return `${formatPrice(selectedRange[0], { fractionDigits: 0 })} - ${formatPrice(selectedRange[1], { fractionDigits: 0 })}`
    }

    const handleOnChange = (newValues: [number, number]) => {
        setSelectedRange(newValues)
        onChange(newValues)
    }

    const handleOnClear = () => {
        setSelectedRange([min, max])
        onClear()
    }

    return (
        <FilterControl
            id={id}
            placeholder={placeholder}
            value={displayValues()}>
            <div className='absolute top-full w-full min-w-[400px] left-0 mt-2 z-10 border border-border rounded-xl bg-background shadow-lg'>
                <div className='flex flex-col gap-4 px-6 py-4'>
                    <h3 className='font-semibold text-lg'>Price Range</h3>
                    <RangeSlider
                        id={id}
                        placeholder={placeholder}
                        min={min}
                        max={max}
                        values={selectedRange}
                        {...props}
                        onChange={handleOnChange} />
                </div>

                <div className='flex border-t border-border'>
                    <button
                        className='flex-1 px-6 py-3 font-medium text-md text-right hover:bg-primary-100/50 hover:underline hover:underline-offset-4 disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none'
                        disabled={selectedRange[0] === min && selectedRange[1] === max}
                        onClick={handleOnClear}>
                        Reset
                    </button>
                </div>
            </div>
        </FilterControl>
    )
}

export default PriceRange
