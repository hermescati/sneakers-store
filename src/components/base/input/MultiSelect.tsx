'use client'

import { SelectOption } from "@/types"
import { cn } from "@/utils"
import { Icon } from '@iconify/react'
import { useRef, useState } from "react"
import { useOnClickOutside } from "usehooks-ts"
import SelectMenu from "./SelectMenu"

interface MultiSelectProps {
    id: string,
    options: SelectOption[]
    placeholder?: string
    width?: string
    onChange: (selected: string[]) => void
}

const MultiSelect = ({
    id,
    options,
    placeholder = 'Select a value',
    width,
    onChange
}: MultiSelectProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])

    const multiSelectRef = useRef<HTMLDivElement>(null!)
    useOnClickOutside(multiSelectRef, () => setIsExpanded(false))

    const handleSelectionChange = (selectedOptions: string[]) => {
        setSelectedOptions(selectedOptions)
        onChange(selectedOptions)
    }

    return (
        <div ref={multiSelectRef} className={cn('relative', width)}>
            <div
                id={id}
                aria-label='toggle menu'
                aria-haspopup='true'
                aria-expanded={isExpanded}
                className='flex items-center justify-between gap-3 w-full px-3 py-2 rounded-xl border border-border cursor-pointer'
                onClick={() => setIsExpanded((prev) => !prev)}
            >
                <div className="flex-1 overflow-hidden text-ellipsis line-clamp-1">
                    {selectedOptions.length > 0 ? (
                        <p className="font-medium text-md">
                            {selectedOptions
                                .map((value) => {
                                    const option = options.find((opt) => opt.value === value)
                                    return option ? option.label : ''
                                })
                                .join(', ')}
                        </p>
                    ) : (
                        <p className="text-md font-medium text-primary-600">{placeholder}</p>
                    )}
                </div>
                <button className='p-1 text-primary-600'>
                    <Icon icon='mage:chevron-down' className={cn('transition-all duration-300 ease-in-out', { 'rotate-180': isExpanded })} />
                </button>
            </div>

            {isExpanded &&
                <SelectMenu
                    options={options}
                    selectId={id}
                    multiple
                    selected={selectedOptions}
                    onSelect={handleSelectionChange}
                    onClear={() => setSelectedOptions([])} />}
        </div>
    )
}

export default MultiSelect
