'use client'

import { Accordion, AccordionItem } from '@/components/base/Accordion'
import Button from '@/components/base/button/Button'
import Icon from '@/components/base/Icon'
import { SelectOption } from '@/types'
import { cn } from '@/utils'
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
                  'flex cursor-pointer items-center justify-between rounded-lg px-4 py-2.5 text-md font-medium transition-all duration-300 ease-in-out',
                  { 'bg-primary-100/50 py-4 font-semibold': isSelected }
                )}
                onClick={() => onSelect(option.value)}
              >
                <p className="leading-none">{option.label}</p>
                <span
                  className={cn(
                    'flex h-5 w-5 items-center justify-center rounded border transition-all duration-300 ease-in-out',
                    isSelected
                      ? 'border-primary-900 bg-primary-900 dark:border-secondary dark:bg-secondary'
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
            className="my-2 flex-1 justify-end rounded-lg py-3 shadow-none hover:bg-transparent focus:ring-0 focus:ring-offset-0 active:underline active:underline-offset-4 active:shadow-none active:ring-0 active:ring-offset-0"
            onClick={onClear}
          />
        </div>
      </AccordionItem>
    </Accordion>
  )
}

export default MultiSelectFilter
