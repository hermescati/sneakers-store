'use client'

import { MenuPosition, SelectOption } from '@/types'
import { cn } from '@/utils'
import { useCallback } from 'react'
import Button from '../button/Button'
import Icon from '../Icon'

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
    'absolute z-10 min-w-52 w-full border border-border rounded-lg bg-background overflow-y-auto shadow-lg',
    {
      'top-full right-0 mt-2': position === 'bottom-right',
      'top-full left-0 mt-2': position === 'bottom-left',
      'bottom-full right-0 mb-2': position === 'top-right',
      'bottom-full left-0 mb-2': position === 'top-left'
    }
  )

  const handleSelect = useCallback(
    (value: string) => {
      onSelect(
        multiple
          ? selected.includes(value)
            ? selected.filter(option => option !== value)
            : [...selected, value]
          : [value]
      )
    },
    [multiple, selected, onSelect]
  )

  return (
    <div aria-label={`${selectId}-menu`} className={menuClass}>
      <ul
        aria-labelledby={selectId}
        aria-orientation="vertical"
        role="menu"
        className="p-1 space-y-1 max-h-80 overflow-auto"
      >
        {options.map(option => {
          const isSelected = selected.includes(option.value)

          return (
            <li
              key={option.value}
              className={cn(
                'flex items-center justify-between gap-4 p-3 cursor-pointer font-medium hover:bg-primary-100/50 rounded-md transition-all duration-300 ease-in-out',
                { 'bg-primary-100/50': isSelected && !multiple },
                { 'font-semibold dark:text-secondary': isSelected }
              )}
              onClick={() => handleSelect(option.value)}
            >
              <span className="inline-flex items-center gap-2">
                {option.icon && multiple && <Icon icon={option.icon} className="text-xl" />}
                <p className="text-md leading-none">{option.label}</p>
              </span>
              {option.icon && !multiple && <Icon icon={option.icon} className="text-xl" />}
              {multiple && (
                <span
                  className={cn(
                    'w-4 h-4 border rounded flex items-center justify-center transition-all duration-300 ease-in-out',
                    isSelected
                      ? 'bg-primary-900 dark:bg-secondary border-primary-900 dark:border-secondary'
                      : 'border-primary-400'
                  )}
                >
                  {isSelected && <Icon icon="mdi:check" className="text-background text-md" />}
                </span>
              )}
            </li>
          )
        })}
      </ul>

      {(showClear || multiple) && (
        <div className="flex border-t border-border">
          <Button
            variant="ghost"
            size="small"
            label="Clear"
            disabled={!selected.length}
            className="flex-1 py-3 justify-end rounded-none hover:underline hover:underline-offset-4 active:ring-0 active:ring-offset-0 focus:ring-0 focus:ring-offset-0 shadow-none active:shadow-none"
            onClick={onClear}
          />
        </div>
      )}
    </div>
  )
}

export default SelectMenu
