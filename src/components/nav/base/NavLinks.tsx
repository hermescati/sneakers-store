'use client'

import useOnKeyPress from '@/hooks/useOnKeyPress'
import { NavItem } from '@/types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import NavLink from './NavLink'

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
  useOnKeyPress({ key: 'Escape' }, () => setActiveIndex(null))

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
    <div className="hidden z-20 lg:block lg:self-stretch">
      <ul ref={navRef} className="flex gap-4 justify-between h-full py-3">
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
          className="absolute bottom-0 h-[0.2rem] rounded-full bg-foreground mb-2 transition-all duration-300 ease-in-out"
          style={{
            left: `${activeIndicator.left}px`,
            width: `${activeIndicator.width}px`
          }}
        />
      )}
    </div>
  )
}

export default NavLinks
