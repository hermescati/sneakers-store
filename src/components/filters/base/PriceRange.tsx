'use client'

import Button from '@/components/base/button/Button'
import { formatPrice } from '@/utils'
import { useEffect, useMemo, useState } from 'react'
import FilterControl from './FilterControl'
import RangeSlider, { HistogramBin } from './RangeSlider'

interface PriceRangeProps {
  id: string
  placeholder: string
  min: number
  max: number
  selected?: string
  bins?: HistogramBin[]
  compact?: boolean
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
  compact = false,
  onChange,
  onClear
}: PriceRangeProps) => {
  const parseSelected = (selected?: string): [number, number] => {
    if (!selected) return [min, max]
    const [minValue, maxValue] = selected.split('-').map(Number)
    return [minValue, maxValue]
  }

  const [selectedRange, setSelectedRange] = useState<[number, number]>(() =>
    parseSelected(selected)
  )

  useEffect(() => {
    setSelectedRange(parseSelected(selected))
  }, [selected])

  const isDefaultRange = selectedRange[0] === min && selectedRange[1] === max

  const displayedValue = useMemo(
    () =>
      isDefaultRange
        ? ''
        : `${formatPrice(selectedRange[0], { fractionDigits: 0 })} - ${formatPrice(selectedRange[1], { fractionDigits: 0 })}`,
    [selectedRange, isDefaultRange]
  )

  const handleOnChange = (newValues: [number, number]) => {
    setSelectedRange(newValues)
    onChange(newValues)
  }

  const handleOnClear = () => {
    setSelectedRange([min, max])
    onClear()
  }

  const renderSlider = () => {
    return (
      <div className="flex flex-col gap-6">
        <div className="leading-tight">
          <h3 className="font-semibold text-lg">Price Range</h3>
          <p className="font-medium text-md text-primary-600">
            Based on the minimum price of the product.
          </p>
        </div>
        <RangeSlider
          id={id}
          min={min}
          max={max}
          values={selectedRange}
          bins={bins}
          onChange={handleOnChange}
        />
      </div>
    )
  }

  if (compact) {
    return (
      <div className="flex flex-col gap-2">
        {renderSlider()}
        <Button
          variant="ghost"
          size="small"
          label="Clear"
          disabled={selectedRange[0] === min && selectedRange[1] === max}
          className="w-full py-3 justify-end rounded-lg hover:bg-transparent active:underline active:underline-offset-4 active:ring-0 active:ring-offset-0 focus:ring-0 focus:ring-offset-0 shadow-none active:shadow-none"
          onClick={handleOnClear}
        />
      </div>
    )
  }

  return (
    <FilterControl id={id} placeholder={placeholder} value={displayedValue}>
      <div className="absolute top-full w-full min-w-[400px] left-0 mt-2 z-10 border border-border rounded-xl bg-background shadow-lg">
        <div className="px-6 py-4">{renderSlider()}</div>
        <div className="flex border-t border-border">
          <Button
            variant="ghost"
            size="small"
            label="Clear"
            disabled={selectedRange[0] === min && selectedRange[1] === max}
            className="flex-1 py-3 justify-end rounded-none hover:underline hover:underline-offset-4 active:ring-0 active:ring-offset-0 focus:ring-0 focus:ring-offset-0 shadow-none active:shadow-none"
            onClick={handleOnClear}
          />
        </div>
      </div>
    </FilterControl>
  )
}

export default PriceRange
