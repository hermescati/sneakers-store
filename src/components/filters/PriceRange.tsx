'use client'

import { cn, formatPrice } from '@/utils'
import { Icon } from '@iconify/react'
import { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import RangeSlider, { HistogramBin } from './RangeSlider'

interface PriceRangeProps {
    id: string
    placeholder: string
    min: number
    max: number
    bins?: HistogramBin[]
    onChange: (value: [number, number]) => void
}

const PriceRange = ({
    id,
    placeholder,
    min,
    max,
    onChange,
    ...props
}: PriceRangeProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [selectedRange, setSelectedRange] = useState<[number, number]>([min, max])

    const priceRangeRef = useRef<HTMLDivElement>(null!)
    useOnClickOutside(priceRangeRef, () => setIsExpanded(false))

    const handleOnPriceChange = (newValues: [number, number]) => {
        setSelectedRange(newValues)
        onChange(newValues)
    }

    return (
        <div ref={priceRangeRef} className='relative'>
            <div
                id={id}
                aria-label='toggle menu'
                aria-haspopup='true'
                aria-expanded={isExpanded}
                className='flex items-center justify-between gap-3 w-full px-3 py-2 rounded-xl border border-border cursor-pointer'
                onClick={() => setIsExpanded((prev) => !prev)}
            >
                <div className="flex-1 overflow-hidden text-ellipsis line-clamp-1">
                    {selectedRange[0] === min && selectedRange[1] === max
                        ? <p className="text-md font-medium text-primary-600">{placeholder}</p>
                        : (
                            <p className="text-md font-medium">
                                {formatPrice(selectedRange[0], { fractionDigits: 0 })} - {formatPrice(selectedRange[1], { fractionDigits: 0 })}
                            </p>
                        )
                    }
                </div>
                <button className='p-1 text-primary-600'>
                    <Icon icon='mage:chevron-down' className={cn('transition-all duration-300 ease-in-out', { 'rotate-180': isExpanded })} />
                </button>
            </div>

            {isExpanded &&
                <div className='absolute top-full min-w-[400px] left-0 mt-2 z-20 w-full border border-border rounded-xl bg-background shadow-lg'>
                    <div className='flex flex-col gap-2 px-6 py-4'>
                        <h3 className='font-medium text-lg'>Price Range</h3>
                        <RangeSlider
                            id={id}
                            placeholder={placeholder}
                            min={min}
                            max={max}
                            values={selectedRange}
                            {...props}
                            onChange={handleOnPriceChange} />
                    </div>

                    <div className='flex border-t border-border'>
                        <button
                            className='flex-1 px-6 py-3 font-medium text-md text-right hover:bg-primary-100/50 hover:underline hover:underline-offset-4 disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none'
                            disabled={selectedRange[0] === min && selectedRange[1] === max}
                            onClick={() => setSelectedRange([min, max])}>
                            Clear
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default PriceRange
