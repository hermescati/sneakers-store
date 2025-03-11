'use client'

import { MenuPosition, SelectOption } from "@/types"
import { cn } from "@/utils"
import { Icon } from '@iconify/react'

interface SelectMenuProps {
    selectId: string
    options: SelectOption[]
    selected: string[]
    multiple?: boolean
    position?: MenuPosition
    onSelect: (selected: string[]) => void
    onClear?: VoidFunction
}

const SelectMenu = ({
    selectId,
    options,
    selected,
    multiple = false,
    position = 'bottom-right',
    onSelect,
    onClear
}: SelectMenuProps) => {
    const menuClass = cn(
        'absolute z-20 w-full max-h-54 border border-border rounded-lg bg-background overflow-y-auto shadow-lg',
        {
            'top-full right-0 mt-1': position === 'bottom-right',
            'top-full left-0 mt-1': position === 'bottom-left',
            'bottom-full right-0 mb-1': position === 'top-right',
            'bottom-full left-0 mb-1': position === 'top-left'
        }
    )

    const handleSelect = (value: string) => {
        let updatedSelections: string[]

        if (!multiple) {
            updatedSelections = [value]
        }

        updatedSelections = selected.includes(value)
            ? selected.filter((option) => option !== value)
            : [...selected, value]

        onSelect(updatedSelections)
    }

    return (
        <div aria-label="select-menu" className={menuClass}>
            <ul aria-labelledby={selectId} aria-orientation="vertical" role="menu" className="p-1">
                {options.map((option) => {
                    const isSelected = selected.includes(option.value)

                    return (
                        <li
                            key={option.value}
                            className="flex items-center justify-between gap-4 p-3 cursor-pointer hover:bg-primary-100 rounded-md transition-all duration-300 ease-in-out"
                            onClick={() => handleSelect(option.value)}
                        >
                            <span className="inline-flex items-center gap-2">
                                {option.icon && <Icon icon={option.icon} className="text-xl" />}
                                <p className="font-medium text-md leading-none">{option.label}</p>
                            </span>
                            {multiple && (
                                <span
                                    className={cn(
                                        "w-4 h-4 border rounded flex items-center justify-center transition-all duration-300 ease-in-out",
                                        isSelected ? "bg-primary-900 border-primary-900" : "border-primary-500"
                                    )}
                                >
                                    {isSelected && <Icon icon="mdi:check" className="text-background text-md" />}
                                </span>
                            )}
                        </li>
                    )
                })}
            </ul>

            {multiple &&
                <div className='flex border-t border-border'>
                    <button
                        className='flex-1 px-4 py-2 font-medium text-md text-right hover:bg-primary-100/50 hover:underline hover:underline-offset-4 disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none'
                        disabled={!selected.length}
                        onClick={onClear}>
                        Clear
                    </button>
                </div>
            }
        </div>
    )
}

export default SelectMenu