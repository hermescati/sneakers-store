'use client'

import { cn, formatPrice } from '@/utils'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useEffect, useState } from 'react'
import Input from "../base/input/Input"

export interface HistogramBin {
    minRange: number
    maxRange: number
    count: number
}

interface RangeSliderProps {
    id: string
    placeholder: string
    min: number
    max: number
    values: [number, number]
    bins?: HistogramBin[]
    onChange: (value: [number, number]) => void
}

const RangeSlider = ({
    id,
    placeholder,
    min,
    max,
    values,
    bins,
    onChange
}: RangeSliderProps) => {
    const [minInput, setMinInput] = useState(values[0].toString())
    const [maxInput, setMaxInput] = useState(values[1].toString())

    useEffect(() => {
        setMinInput(values[0].toString())
        setMaxInput(values[1].toString())
    }, [values])

    const handleMinBlur = () => {
        const parsed = parseInt(minInput)
        if (!isNaN(parsed)) {
            onChange([parsed, values[1]])
        } else {
            setMinInput(values[0].toString())
        }
    }

    const handleMaxBlur = () => {
        const parsed = parseInt(maxInput)
        if (!isNaN(parsed)) {
            onChange([values[0], parsed])
        } else {
            setMaxInput(values[1].toString())
        }
    }

    return (
        <div className="flex flex-col gap-5 w-full">
            <div className='flex flex-col'>
                <div className="relative h-20 -mb-0.5">
                    {bins && bins.length > 0 && bins.map((bin, index) => {
                        const totalRange = max - min;
                        const leftPercent = ((bin.minRange - min) / totalRange) * 100;
                        const widthPercent = ((bin.maxRange - bin.minRange) / totalRange) * 100;
                        const isActive = values[0] <= bin.maxRange && values[1] >= bin.minRange;

                        return (
                            <div
                                key={index}
                                className={cn(
                                    'rounded absolute bottom-0 transition-all duration-300 ease-in-out',
                                    isActive ? "bg-primary-900" : "bg-primary-100"
                                )}
                                style={{
                                    left: `calc(${leftPercent}% + 2px)`,
                                    width: `calc(${widthPercent}% - 4px)`,
                                    height: `${bin.count * 5}px`
                                }}
                            />
                        )
                    })}
                </div>

                <div className='mx-2 py-1.5 bg-background'>
                    <Slider
                        id={id}
                        range
                        pushable
                        keyboard
                        min={min}
                        max={max}
                        value={values}
                        onChange={(newValues) => { onChange(newValues as [number, number]) }}
                        handleRender={(props, values) => (
                            <div {...props.props}>
                                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-0.5 rounded-md bg-foreground text-md text-background shadow">
                                    {formatPrice(values.value, { fractionDigits: 0 })}
                                </span>
                            </div>
                        )}
                        styles={{
                            handle: {
                                backgroundColor: 'rgba(var(--background))',
                                borderColor: 'rgba(var(--primary-900))',
                                opacity: 1,
                                height: 20,
                                width: 20,
                                borderWidth: 5,
                                marginTop: -8,
                                boxShadow: 'none',
                            },
                            track: {
                                backgroundColor: 'rgba(var(--primary-900))',
                                height: 4,
                            },
                            rail: {
                                backgroundColor: 'rgba(var(--primary-200))',
                                height: 4,
                                width: 'calc(100% + 1rem)',
                                marginLeft: -8,
                            }
                        }}
                    />
                </div>
            </div>

            <div className="flex justify-between gap-2 mt-4">
                <Input
                    label={`Min. ${placeholder}`}
                    type="number"
                    value={minInput}
                    iconAppend="iconoir:dollar"
                    inputSize='small'
                    onChange={(e) => setMinInput(e.target.value)}
                    onBlur={handleMinBlur}
                />
                <span className="border-t-2 border-border min-w-6 mb-5 mt-auto"></span>
                <Input
                    label={`Max. ${placeholder}`}
                    type="number"
                    value={maxInput}
                    max={max}
                    iconAppend="iconoir:dollar"
                    inputSize='small'
                    onChange={(e) => setMaxInput(e.target.value)}
                    onBlur={handleMaxBlur}
                />
            </div>
        </div>
    )
}

export default RangeSlider
