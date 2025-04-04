"use client"

import { AccordionItem as IAccordionItem } from "@/types"
import { cn } from "@/utils"
import { Icon } from "@iconify/react"
import { createContext, ReactNode, useContext, useState } from "react"

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
  iconClasses,
}: AccordionItemProps) => {
  const context = useContext(AccordionContext)
  if (!context) return null

  const { openIndexes, toggleItem } = context
  const isOpen = openIndexes.includes(index)

  return (
    <div className="w-full transition-all duration-300 ease-in-out">
      <div
        className={cn(
          "flex items-center justify-between px-4 py-3 rounded-xl hover:bg-primary-100 font-medium cursor-pointer transition-all duration-300 ease-in-out",
          { 'bg-primary-100 lg:bg-transparent': isOpen },
          titleClasses
        )}
        onClick={() => toggleItem(index)}
      >
        <div className="flex items-center gap-3">
          {icon && <Icon icon={icon} className={cn('text-2xl', iconClasses)} />}
          <h4>{title}</h4>
        </div>
        <span className={`transition-transform duration-300 ease-in-out ${isOpen ? "rotate-90" : "rotate-0"}`}>
          <Icon icon="mage:chevron-down" className="text-lg" />
        </span>
      </div>

      {isOpen && <div className="overflow-hidden transition-all duration-300 ease-in-out">
        {children ??
          <p className={cn("px-4 my-2 text-primary-700 leading-relaxed text-pretty", contentClasses)}>
            {content}
          </p>
        }
      </div>}
    </div>
  )
}

export const Accordion = ({
  items,
  activeIndex,
  children,
  multiple = false
}: AccordionProps) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    Array.isArray(activeIndex)
      ? activeIndex
      : activeIndex !== undefined
        ? [activeIndex]
        : []
  )

  const toggleItem = (index: number) => {
    setOpenIndexes((prev) => {
      if (multiple) {
        return prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      }
      return prev.includes(index) ? [] : [index]
    })
  }

  return (
    <AccordionContext.Provider value={{ openIndexes, multiple, toggleItem }}>
      <ul className="w-full flex flex-col gap-2">
        {items
          ? items.map((item, index) => (
            <li key={index}>
              <AccordionItem
                index={index}
                {...item}
              />
            </li>
          ))
          : children}
      </ul>
    </AccordionContext.Provider>
  )
}
