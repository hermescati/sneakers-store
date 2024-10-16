'use client'

import { NavItem } from '@/types'
import { cn } from '@/utils'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import NavLink from './base/NavLink'
import useOnEscapeKey from '@/hooks/use-escape-key'

interface ActiveIndicator {
  left: number
  width: number
}

const NavLinks = ({ items }: { items: NavItem[] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [activeIndicator, setActiveIndicator] = useState<ActiveIndicator>({
    left: 0,
    width: 0
  })

  const navRef = useRef<HTMLUListElement>(null!)
  const linksRef = useRef<Array<HTMLLIElement | null>>([])

  useOnClickOutside(navRef, () => setActiveIndex(null))
  useOnEscapeKey(() => setActiveIndex(null))

  const handleOpen = useCallback((index: number, href?: string) => {
    setActiveIndex(
      href ? null : (prevIndex) => (prevIndex === index ? null : index)
    )
  }, [])

  useEffect(() => {
    if (activeIndex !== null && linksRef.current[activeIndex]) {
      const { offsetLeft, offsetWidth } = linksRef.current[activeIndex]!
      setActiveIndicator({ left: offsetLeft, width: offsetWidth })
    }
  }, [activeIndex])

  return (
    <>
      <ul ref={navRef} className="flex gap-4 justify-between h-full py-4">
        {items.map((item, index) => (
          <li
            key={item.name}
            ref={(el) => {
              linksRef.current[index] = el
            }}
            className="list-none"
          >
            <NavLink
              item={item}
              isActive={index === activeIndex}
              isAnyActive={activeIndex !== null}
              handleOpen={(href) => handleOpen(index, href)}
            />
          </li>
        ))}
      </ul>

      {/* Active Indicator */}
      {!!activeIndex && (
        <span
          className={cn(
            'absolute bottom-0 h-[0.2rem] rounded-full bg-foreground mb-2 transition-all duration-300 ease-in-out'
          )}
          style={{
            left: `${activeIndicator.left}px`,
            width: `${activeIndicator.width}px`
          }}
        />
      )}
    </>
  )
}

export default NavLinks
