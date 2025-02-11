"use client"

import { cn } from "@/utils"
import { Icon } from "@iconify/react"
import { ReactNode, useEffect, useRef, useState } from "react"

export interface AccordionItem {
  title: string
  icon?: string
  content?: string
}

interface AccordionItemProps extends AccordionItem {
  iconClass?: string
  titleClass?: string
  contentClass?: string
  children?: ReactNode
  isOpen?: boolean
  onOpen?: () => void
}

interface AccordionProps {
  items?: AccordionItem[]
  activeIndex?: number
  children?: ReactNode
  iconClass?: string
  titleClass?: string
  contentClass?: string
}

export const AccordionItem = ({
  title,
  icon,
  content,
  children,
  titleClass,
  contentClass,
  iconClass,
  isOpen,
  onOpen
}: AccordionItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`)
    } else {
      setHeight('0px')
    }
  }, [isOpen])

  return (
    <div className="w-full">
      <div
        className={cn("flex justify-between items-center rounded-2xl cursor-pointer px-4 py-3 hover:bg-primary-100", titleClass)}
        onClick={onOpen}
      >
        <div className="flex items-center gap-3">
          {icon && <Icon icon={icon} className={iconClass} />}
          <h4>{title}</h4>
        </div>
        <span className={`transition-transform duration-300 ease-in-out ${isOpen ? "rotate-90" : "rotate-0"}`}>
          <Icon icon="mage:chevron-down" />
        </span>
      </div>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height }}
      >
        {children ??
          <p className={cn("px-4 py-1 bg-background text-primary-700 text-pretty", contentClass)}>
            {content}
          </p>
        }
      </div>
    </div>
  )
}

export const Accordion = ({
  items,
  activeIndex,
  children,
  titleClass,
  contentClass,
  iconClass }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(activeIndex ?? null)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <ul className="w-full flex flex-col gap-4 3xl:gap-2">
      {children ??
        <>
          {items?.map((item, index) => (
            <li key={index}>
              <AccordionItem
                title={item.title}
                titleClass={titleClass}
                content={item.content}
                contentClass={contentClass}
                icon={item.icon}
                iconClass={iconClass}
                isOpen={openIndex === index}
                onOpen={() => handleToggle(index)}
              />
            </li>
          ))}
        </>
      }
    </ul>
  )
}
