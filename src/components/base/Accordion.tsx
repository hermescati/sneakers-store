'use client'

import { AccordionItem as IAccordionItem } from '@/types'
import { cn } from '@/utils'
import { createContext, ReactNode, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon'

interface AccordionItemProps extends IAccordionItem {
  index: number
  children?: ReactNode
  titleClasses?: string
  contentClasses?: string
  iconClasses?: string
}

interface AccordionProps {
  items?: IAccordionItem[]
  activeIndex?: number | number[]
  children?: ReactNode
  className?: string
  multiple?: boolean
}

interface AccordionContext {
  openIndexes: number[]
  multiple: boolean
  toggleItem: (index: number) => void
}

const AccordionContext = createContext<AccordionContext | null>(null)

export const AccordionItem = ({
  index,
  title,
  icon,
  content,
  children,
  titleClasses,
  contentClasses,
  iconClasses
}: AccordionItemProps) => {
  const context = useContext(AccordionContext)
  if (!context) return null

  const { openIndexes, toggleItem } = context
  const isOpen = openIndexes.includes(index)

  return (
    <div className="w-full transition-all duration-300 ease-in-out">
      <div
        className={cn(
          'flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 font-medium transition-all duration-300 ease-in-out hover:bg-primary-100',
          { 'bg-primary-100 lg:bg-transparent': isOpen },
          titleClasses
        )}
        onClick={() => toggleItem(index)}
      >
        <div className="flex items-center gap-3">
          {icon && <Icon icon={icon} className={cn('text-2xl', iconClasses)} />}
          <h4>{title}</h4>
        </div>
        <span
          className={`transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-90' : 'rotate-0'}`}
        >
          <Icon icon="mage:chevron-down" className="text-lg" />
        </span>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: 'auto', opacity: 1 },
              collapsed: { height: 0, opacity: 0 }
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div>
              {children ?? (
                <p
                  className={cn(
                    'my-2 text-pretty px-4 leading-relaxed text-primary-700',
                    contentClasses
                  )}
                >
                  {content}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const Accordion = ({
  items,
  activeIndex,
  children,
  className,
  multiple = false
}: AccordionProps) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    Array.isArray(activeIndex) ? activeIndex : activeIndex !== undefined ? [activeIndex] : []
  )

  const toggleItem = (index: number) => {
    setOpenIndexes(prev => {
      if (multiple) {
        return prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      }
      return prev.includes(index) ? [] : [index]
    })
  }

  return (
    <AccordionContext.Provider value={{ openIndexes, multiple, toggleItem }}>
      <ul className={cn('flex flex-col gap-2', className)}>
        {items
          ? items.map((item, index) => (
              <li key={index}>
                <AccordionItem index={index} {...item} />
              </li>
            ))
          : children}
      </ul>
    </AccordionContext.Provider>
  )
}
