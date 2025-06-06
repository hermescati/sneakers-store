'use client'

import Link from '@/components/base/Link'
import useOnKeyPress from '@/hooks/useOnKeyPress'
import { ActiveIndicator, NavCategory } from '@/types'
import { cn } from '@/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useLayoutEffect, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import NavPanel from './base/NavPanel'

interface NavLinksProps {
  items: NavCategory[]
}

const NavLinks = ({ items }: NavLinksProps) => {
  const router = useRouter()

  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [activeIndicator, setActiveIndicator] = useState<ActiveIndicator>({
    left: 0,
    width: 0
  })

  const navRef = useRef<HTMLDivElement>(null!)
  const linksRef = useRef<(HTMLLIElement | null)[]>([])

  useOnClickOutside(navRef, () => setActiveIndex(null))
  useOnKeyPress({ key: 'Escape' }, () => setActiveIndex(null))

  const handleOpen = (index: number, item: NavCategory) => {
    if (!item.items?.length && item.href) {
      router.push(item.href)
      setActiveIndex(null)
      return
    }
    setActiveIndex(prevIndex => (prevIndex !== index ? index : null))
  }

  const handleOnClick = (href: NavCategory['href']) => {
    if (!href) return
    router.push(href)
    setActiveIndex(null)
  }

  useLayoutEffect(() => {
    if (activeIndex !== null && linksRef.current[activeIndex]) {
      const { offsetLeft, offsetWidth } = linksRef.current[activeIndex]!
      setActiveIndicator({ left: offsetLeft, width: offsetWidth })
    } else {
      setActiveIndicator({ left: 0, width: 0 })
    }
  }, [activeIndex])

  return (
    <div ref={navRef} className="hidden lg:block lg:self-stretch">
      <ul className="flex h-full justify-between gap-4 py-2">
        {items.map((item, index) => (
          <li
            key={item.name}
            ref={el => {
              linksRef.current[index] = el
            }}
          >
            <Link
              className={cn('text-md font-semibold text-primary-600 hover:text-foreground', {
                'text-foreground': index === activeIndex,
                'hover:text-secondary! text-secondary': item.name === 'On Sale'
              })}
              onClick={() => handleOpen(index, item)}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {activeIndex !== null && (
          <>
            <motion.div
              key="indicator"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                left: activeIndicator.left,
                width: activeIndicator.width
              }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 150, damping: 25 }}
              className="absolute bottom-0 mb-2 h-[0.2rem] rounded-full bg-foreground"
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-x-0 top-full z-20 border-t border-border bg-background shadow-md"
            >
              <NavPanel item={items[activeIndex]} onClick={handleOnClick} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NavLinks
