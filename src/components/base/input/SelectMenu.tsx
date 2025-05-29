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
        className="max-h-80 space-y-1 overflow-auto p-1"
      >
        {options.map(option => {
          const isSelected = selected.includes(option.value)

          return (
            <li
              key={option.value}
              className={cn(
                'flex cursor-pointer items-center justify-between gap-4 rounded-md p-3 font-medium transition-all duration-300 ease-in-out hover:bg-primary-100/50',
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
                    'flex h-4 w-4 items-center justify-center rounded border transition-all duration-300 ease-in-out',
                    isSelected
                      ? 'border-primary-900 bg-primary-900 dark:border-secondary dark:bg-secondary'
                      : 'border-primary-400'
                  )}
                >
                  {isSelected && <Icon icon="mdi:check" className="text-md text-background" />}
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
            className="flex-1 justify-end rounded-none py-3 shadow-none hover:underline hover:underline-offset-4 focus:ring-0 focus:ring-offset-0 active:shadow-none active:ring-0 active:ring-offset-0"
            onClick={onClear}
          />
        </div>
      )}
    </div>
  )
}

export default SelectMenu
