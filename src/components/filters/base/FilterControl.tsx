'use client'

import Icon from '@/components/base/Icon'
import { cn } from '@/utils'
import { ReactNode, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

interface FilterControlProps {
  id: string
  children: ReactNode
  placeholder: string
  value: string
}

const FilterControl = ({ id, children, placeholder, value }: FilterControlProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const filterControlRef = useRef<HTMLDivElement>(null!)
  useOnClickOutside(filterControlRef, () => setIsExpanded(false))

  return (
    <div ref={filterControlRef} className="relative">
      <div
        id={id}
        aria-label="toggle menu"
        aria-haspopup="true"
        aria-expanded={isExpanded}
        className="flex items-center justify-between gap-1 w-full px-3 py-1.5 rounded-xl border border-border cursor-pointer"
        onClick={() => setIsExpanded(prev => !prev)}
      >
        <div className="relative flex flex-col justify-center flex-1 h-9 overflow-hidden">
          <span
            className={cn(
              'absolute font-medium text-md text-primary-600 truncate transition-all duration-150 ease-linear pointer-events-none',
              value ? 'top-0 text-sm' : 'top-1/2 transform -translate-y-1/2'
            )}
          >
            {placeholder}
          </span>

          {!!value && (
            <p className="absolute bottom-0 overflow-hidden font-semibold text-md truncate">
              {value}
            </p>
          )}
        </div>

        <span className="p-1 text-primary-600">
          <Icon
            icon="mage:chevron-down"
            className={cn('transition-all duration-300 ease-in-out', { 'rotate-180': isExpanded })}
          />
        </span>
      </div>
      {isExpanded && children}
    </div>
  )
}

export default FilterControl
