'use client'

import useOnEscapeKey from '@/hooks/use-escape-key'
import { cn } from '@/utils'
import { Icon } from '@iconify/react'
import { ReactNode, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

export interface DropdownItem {
  value: string
  label: string
  type?: 'header' | 'option'
  icon?: string
  action?: () => void
}

interface DropdownMenuProps {
  id: string
  title?: string
  children?: ReactNode
  items: DropdownItem[]
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  icon?: string
  imageSrc?: string
}

const DropdownMenu = ({
  id,
  title,
  children,
  items,
  position = 'bottom-right'
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const dropdownRef = useRef<HTMLDivElement>(null!)
  useOnClickOutside(dropdownRef, () => setIsOpen(false))
  useOnEscapeKey(() => setIsOpen(false))

  const handleItemClick = (item: DropdownItem) => {
    if (item.action) item.action()
    setIsOpen(!isOpen)
  }

  const dropdownClass = cn(
    'absolute z-20 border border-primary-300 bg-background w-[220px] max-h-52 overflow-y-auto p-1 rounded-lg shadow-[0_0_8px_1px_rgba(0,0,0,0.10)]',
    {
      'top-full right-0 mt-2': position === 'bottom-right',
      'top-full left-0 mt-2': position === 'bottom-left',
      'bottom-full right-0 mb-2': position === 'top-right',
      'bottom-full left-0 mb-2': position === 'top-left'
    }
  )

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger */}
      <button
        id={id}
        aria-label="Toggle dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'rounded-xl hover:bg-primary-300/35 active:outline-none active:ring-0 active:ring-transparent active:shadow-[inset_0_0px_6px_rgba(0,0,0,0.2)] transition ease-in-out duration-300',
          {
            'whitespace-nowrap py-3 px-6 font-semibold text-md text-primary-700':
              title
          }
        )}
      >
        <div className="flex gap-4 items-center">
          {children ?? title}
          <span className="flex items-center justify-center w-6 h-6 mr-2">
            <Icon
              icon="mage:chevron-down"
              className={cn(
                'text-lg text-primary-500 transition-all ease-in-out duration-150',
                { 'rotate-180': isOpen }
              )}
            />
          </span>
        </div>
      </button>

      {/* Menu */}
      {isOpen && (
        <div aria-label="Dropdown menu" className={dropdownClass}>
          <ul role="menu" aria-labelledby={id} aria-orientation="vertical">
            {items.map((item) => (
              <li
                key={item.value}
                onClick={() => handleItemClick(item)}
                className={cn('flex gap-2 items-center p-3 text-md', {
                  'font-medium rounded cursor-pointer hover:bg-primary-200':
                    item.type !== 'header',
                  'font-bold border-b border-primary-200':
                    item.type === 'header'
                })}
              >
                {item.icon && <Icon icon={item.icon} className="text-xl" />}
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default DropdownMenu
