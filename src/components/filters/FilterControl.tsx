'use client'

import { cn } from '@/utils'
import { Icon } from '@iconify/react'
import { ReactNode, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

interface FilterControlProps {
    id: string,
    children: ReactNode,
    menu: ReactNode
}

const FilterControl = ({
    id,
    children,
    menu
}: FilterControlProps) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const filterControlRef = useRef<HTMLDivElement>(null!)
    useOnClickOutside(filterControlRef, () => setIsExpanded(false))

    return (
        <div ref={filterControlRef} className='relative'>
            <div
                id={id}
                aria-label='toggle menu'
                aria-haspopup='true'
                aria-expanded={isExpanded}
                className='flex items-center justify-between gap-3 w-full px-3 py-2 rounded-xl border border-border cursor-pointer'
                onClick={() => setIsExpanded((prev) => !prev)}>
                <div className='flex-1 overflow-hidden text-ellipsis line-clamp-1'>{children}</div>
                <span className='p-1 text-primary-600'>
                    <Icon
                        icon='mage:chevron-down'
                        className={cn(
                            'transition-all duration-300 ease-in-out',
                            { 'rotate-180': isExpanded }
                        )} />
                </span>
            </div>

            {isExpanded && menu}
        </div>
    )
}

export default FilterControl