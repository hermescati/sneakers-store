'use client'

import { formatPrice } from '@/utils'
import { useEffect, useMemo, useState } from 'react'
import Button from '../base/button/Button'
import FilterControl from './FilterControl'
import RangeSlider, { HistogramBin } from './RangeSlider'

interface PriceRangeProps {
    id: string
    placeholder: string
    min: number
    max: number
    selected?: string
    bins?: HistogramBin[]
    onChange: (value: [number, number]) => void
    onClear: VoidFunction
}

const PriceRange = ({
    id,
    placeholder,
    min,
    max,
    selected = '',
    bins = [],
    onChange,
    onClear,
}: PriceRangeProps) => {
    const parseSelected = (selected?: string): [number, number] => {
        if (!selected) return [min, max]
        const [minValue, maxValue] = selected.split('-').map(Number)
        return [minValue, maxValue]
    }

    const [selectedRange, setSelectedRange] = useState<[number, number]>(
        () => parseSelected(selected)
    )

    useEffect(() => {
        setSelectedRange(parseSelected(selected))
    }, [selected])

    const displayedValue = useMemo(() => {
        if (selectedRange[0] === min && selectedRange[1] === max) return ''
        return `${formatPrice(selectedRange[0], { fractionDigits: 0 })} - ${formatPrice(selectedRange[1], { fractionDigits: 0 })}`
    }, [selectedRange])

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
            value={displayedValue}>
            <div className='absolute top-full w-full min-w-[400px] left-0 mt-2 z-10 border border-border rounded-xl bg-background shadow-lg'>
                <div className='flex flex-col gap-6 px-6 py-4'>
                    <div>
                        <h3 className='font-semibold text-lg'>Price range</h3>
                        <p className='font-medium text-md text-primary-600'>Based on the minimum price of the product.</p>
                    </div>
                    <RangeSlider
                        id={id}
                        min={min}
                        max={max}
                        values={selectedRange}
                        bins={bins}
                        onChange={handleOnChange} />
                </div>

                <div className='flex border-t border-border divide-x divide-border'>
                    <Button
                        variant='ghost'
                        size='small'
                        disabled={selectedRange[0] === min && selectedRange[1] === max}
                        className='flex-1 py-3 justify-end rounded-none hover:underline hover:underline-offset-4 active:ring-0 active:ring-offset-0 focus:ring-0 focus:ring-offset-0 shadow-none active:shadow-none'
                        onClick={handleOnClear}>
                        Clear
                    </Button>
                </div>
            </div>
        </FilterControl>
    )
}

export default PriceRange
