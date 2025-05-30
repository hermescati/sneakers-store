'use client'

import Input from '@/components/base/input/Input'
import { cn, formatPrice } from '@/utils'
import { useTheme } from 'next-themes'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useEffect, useState } from 'react'

export interface HistogramBin {
  minRange: number
  maxRange: number
  count: number
}

interface RangeSliderProps {
  id: string
  min: number
  max: number
  values: [number, number]
  bins?: HistogramBin[]
  onChange: (value: [number, number]) => void
}

const RangeSlider = ({ id, min, max, values, bins, onChange }: RangeSliderProps) => {
  const [minInput, setMinInput] = useState(values[0].toString())
  const [maxInput, setMaxInput] = useState(values[1].toString())

  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMinInput(values[0].toString())
    setMaxInput(values[1].toString())
  }, [values])

  const updateMinValue = (value: string) => {
    setMinInput(value)
    const parsed = parseInt(value)

    if (!isNaN(parsed) && parsed >= min && parsed <= max && parsed <= values[1]) {
      onChange([parsed, values[1]])
    }
  }

  const updateMaxValue = (value: string) => {
    setMaxInput(value)
    const parsed = parseInt(value)

    if (!isNaN(parsed) && parsed >= min && parsed <= max && parsed >= values[0]) {
      onChange([values[0], parsed])
    }
  }

  const handleMinBlur = (value: string) => {
    const parsed = parseInt(value)

    if (isNaN(parsed)) {
      setMinInput(values[0].toString())
    } else {
      const clampedValue = Math.max(min, Math.min(parsed, max))
      const newMin = Math.min(clampedValue, values[1])
      setMinInput(newMin.toString())
      onChange([newMin, values[1]])
    }
  }

  const handleMaxBlur = (value: string) => {
    const parsed = parseInt(value)

    if (isNaN(parsed)) {
      setMaxInput(values[1].toString())
    } else {
      const clampedValue = Math.max(min, Math.min(parsed, max))
      const newMax = Math.max(clampedValue, values[0])
      setMaxInput(newMax.toString())
      onChange([values[0], newMax])
    }
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="mx-4 flex flex-col">
        <div className="relative -mb-0.5 h-20">
          {bins &&
            bins.length > 0 &&
            bins.map((bin, index) => {
              const totalRange = max - min
              const leftPercent = ((bin.minRange - min) / totalRange) * 100
              const widthPercent = ((bin.maxRange - bin.minRange) / totalRange) * 100
              const isActive = values[0] < bin.maxRange && values[1] > bin.minRange

              return (
                <div
                  key={index}
                  className={cn(
                    'absolute bottom-0 cursor-pointer rounded transition-all duration-300 ease-in-out hover:bg-primary-400',
                    isActive
                      ? 'bg-primary-700 dark:bg-secondary-200'
                      : 'bg-primary-100 dark:bg-secondary-100/20'
                  )}
                  style={{
                    left: `calc(${leftPercent}% + 2px)`,
                    width: `calc(${widthPercent}% - 4px)`,
                    height: `${bin.count * 5}px`
                  }}
                  onClick={() => onChange([bin.minRange, bin.maxRange])}
                />
              )
            })}
        </div>

        <div className="mx-2 bg-background py-1.5">
          <Slider
            id={id}
            range
            pushable
            keyboard
            min={min}
            max={max}
            value={values}
            onChange={newValues => {
              onChange(newValues as [number, number])
            }}
            handleRender={(props, values) => (
              <div {...props.props}>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 transform rounded-md bg-foreground px-2 py-0.5 text-md text-background shadow dark:font-medium">
                  {formatPrice(values.value, { fractionDigits: 0 })}
                </span>
              </div>
            )}
            styles={{
              handle: {
                backgroundColor:
                  resolvedTheme === 'dark'
                    ? 'rgba(var(--secondary-500))'
                    : 'rgba(var(--background))',
                borderColor: 'rgba(var(--primary-900))',
                opacity: 1,
                height: 20,
                width: 20,
                borderWidth: 5,
                marginTop: -8,
                boxShadow: 'none'
              },
              track: {
                backgroundColor:
                  resolvedTheme === 'dark'
                    ? 'rgba(var(--secondary-500))'
                    : 'rgba(var(--primary-900))',
                height: 4
              },
              rail: {
                backgroundColor: 'rgba(var(--primary-200))',
                height: 4,
                width: 'calc(100% + 1rem)',
                marginLeft: -8
              }
            }}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-between gap-2">
        <Input
          label="From"
          type="number"
          value={minInput}
          iconPrepend="iconoir:dollar"
          inputSize="small"
          onChange={e => updateMinValue(e.target.value)}
          onBlur={() => handleMinBlur(minInput)}
        />
        <span className="mb-5 mt-auto min-w-6 border-t border-primary-400 dark:border-border"></span>
        <Input
          label="To"
          type="number"
          value={maxInput}
          max={max}
          iconPrepend="iconoir:dollar"
          inputSize="small"
          onChange={e => updateMaxValue(e.target.value)}
          onBlur={() => handleMaxBlur(maxInput)}
        />
      </div>
    </div>
  )
}

export default RangeSlider
