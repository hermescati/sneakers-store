'use client'

import { cn } from '@/utils'
import { InlineIcon } from '@iconify/react'
import { useRef, useState } from 'react'
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
  title: string
  items: DropdownItem[]
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  icon?: string
  imageSrc?: string
}

const DropdownMenu = ({
  id,
  title,
  items,
  position = 'bottom-right'
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const dropdownRef = useRef<HTMLDivElement>(null!)
  useOnClickOutside(dropdownRef, () => setIsOpen(false))

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
      <button
        id={id}
        aria-label="Toggle dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center gap-5 rounded-xl w-full py-3 px-6 hover:bg-primary-200 active:outline-none active:ring-0 active:ring-transparent active:shadow-[inset_0_0px_6px_rgba(0,0,0,0.2)] transition ease-in-out duration-300"
      >
        <span className="font-semibold text-primary-700">{title}</span>
      </button>
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
                {item.icon && <InlineIcon icon={item.icon} height="1.25rem" />}
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
