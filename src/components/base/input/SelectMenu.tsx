'use client'

import { MenuPosition, SelectOption } from "@/types"
import { cn } from "@/utils"
import { Icon } from '@iconify/react'

interface SelectMenuProps {
    selectId: string
    options: SelectOption[]
    selected: string[]
    showClear?: boolean
    multiple?: boolean
    position?: MenuPosition
    onSelect: (selected: string[]) => void
    onClear?: VoidFunction
}

const SelectMenu = ({
    selectId,
    options,
    selected,
    showClear = false,
    multiple = false,
    position = 'bottom-left',
    onSelect,
    onClear
}: SelectMenuProps) => {
    const menuClass = cn(
        'absolute z-10 min-w-48 w-full border border-border rounded-lg bg-background overflow-y-auto shadow-lg',
        {
            'top-full right-0 mt-2': position === 'bottom-right',
            'top-full left-0 mt-2': position === 'bottom-left',
            'bottom-full right-0 mb-2': position === 'top-right',
            'bottom-full left-0 mb-2': position === 'top-left'
        }
    )

    const handleSelect = (value: string) => {
        let updatedSelections: string[]

        if (!multiple) {
            updatedSelections = [value]
        } else {
            updatedSelections = selected.includes(value)
                ? selected.filter((option) => option !== value)
                : [...selected, value]
        }

        onSelect(updatedSelections)
    }

    return (
        <div aria-label="select-menu" className={menuClass}>
            <ul aria-labelledby={selectId} aria-orientation="vertical" role="menu" className="p-1 max-h-80 overflow-auto">
                {options.map((option) => {
                    const isSelected = selected.includes(option.value)

                    return (
                        <li
                            key={option.value}
                            className="flex items-center justify-between gap-4 p-3 cursor-pointer hover:bg-primary-100 rounded-md transition-all duration-300 ease-in-out"
                            onClick={() => handleSelect(option.value)}
                        >
                            <span className="inline-flex items-center gap-2">
                                {option.icon && multiple && <Icon icon={option.icon} className="text-xl text-primary-700" />}
                                <p className="font-medium text-md leading-none">{option.label}</p>
                            </span>
                            {option.icon && <Icon icon={option.icon} className="text-xl text-primary-700" />}
                            {multiple && (
                                <span
                                    className={cn(
                                        "w-4 h-4 border rounded flex items-center justify-center transition-all duration-300 ease-in-out",
                                        isSelected ? "bg-primary-900 dark:bg-secondary border-primary-900 dark:border-secondary" : "border-primary-400"
                                    )}
                                >
                                    {isSelected && <Icon icon="mdi:check" className="text-background text-md" />}
                                </span>
                            )}
                        </li>
                    )
                })}
            </ul>

            {(showClear || multiple) && 
                <div className='flex border-t border-border'>
                    <button
                        className='flex-1 px-4 py-3 font-medium text-md text-right hover:bg-primary-100/50 hover:underline hover:underline-offset-4 disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none'
                        disabled={!selected.length}
                        onClick={onClear}>
                        Reset
                    </button>
                </div>
            }
        </div>
    )
}

export default SelectMenu