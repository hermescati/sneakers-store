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
        className="flex w-full cursor-pointer items-center justify-between gap-1 rounded-xl border border-border px-3 py-1.5"
        onClick={() => setIsExpanded(prev => !prev)}
      >
        <div className="relative flex h-9 flex-1 flex-col justify-center overflow-hidden">
          <span
            className={cn(
              'pointer-events-none absolute select-none truncate text-md font-medium text-primary-600 transition-all duration-150 ease-linear',
              value ? 'top-0 text-sm' : 'top-1/2 -translate-y-1/2 transform'
            )}
          >
            {placeholder}
          </span>

          {!!value && (
            <p className="absolute bottom-0 select-none overflow-hidden truncate text-md font-semibold">
              {value}
            </p>
          )}
        </div>

        <span className="p-1 text-primary-600">
          <Icon
            icon="mage:chevron-down"
            className={cn('transition-all duration-300 ease-in-out', { 'rotate-90': isExpanded })}
          />
        </span>
      </div>
      {isExpanded && children}
    </div>
  )
}

export default FilterControl
