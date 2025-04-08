'use client'

import { Accordion, AccordionItem } from '@/components/base/Accordion'
import Button from '@/components/base/button/Button'
import { SelectOption } from '@/types'
import { cn } from '@/utils'
import { Icon } from '@iconify/react'
import { useMemo } from 'react'

interface MultiSelectFilterProps {
    title: string
    options: SelectOption[]
    selectedValues: string[]
    onSelect: (value: string) => void
    onClear: VoidFunction
}

const MultiSelectFilter = ({
    title,
    options,
    selectedValues,
    onSelect,
    onClear
}: MultiSelectFilterProps) => {
    const isOpen = useMemo(() => selectedValues.length > 0, [selectedValues])

    return (
        <Accordion activeIndex={isOpen ? 0 : undefined}>
            <AccordionItem
                index={0}
                title={title}
                titleClasses="px-0 py-4 font-semibold bg-transparent hover:bg-transparent"
            >
                <ul className="space-y-1">
                    {options.map(option => {
                        const isSelected = selectedValues.includes(option.value)
                        return (
                            <li
                                key={option.value}
                                className={cn(
                                    'flex items-center justify-between px-4 py-2.5 cursor-pointer font-medium text-md rounded-lg transition-all duration-300 ease-in-out',
                                    { 'bg-primary-100/50 font-semibold py-4': isSelected }
                                )}
                                onClick={() => onSelect(option.value)}
                            >
                                <p className="leading-none">{option.label}</p>
                                <span
                                    className={cn(
                                        'w-5 h-5 border rounded flex items-center justify-center transition-all duration-300 ease-in-out',
                                        isSelected
                                            ? 'bg-primary-900 dark:bg-secondary border-primary-900 dark:border-secondary'
                                            : 'border-primary-400'
                                    )}
                                >
                                    {isSelected && <Icon icon="mdi:check" className="text-background" />}
                                </span>
                            </li>
                        )
                    })}
                </ul>
                <div className="flex border-b border-border">
                    <Button
                        variant="ghost"
                        size="small"
                        label="Clear"
                        disabled={!selectedValues.length}
                        className="flex-1 py-3 my-2 justify-end rounded-lg hover:bg-transparent active:underline active:underline-offset-4 active:ring-0 active:ring-offset-0 focus:ring-0 focus:ring-offset-0 shadow-none active:shadow-none"
                        onClick={onClear}
                    />
                </div>
            </AccordionItem>
        </Accordion>
    )
}

export default MultiSelectFilter
