'use client'

import { useCart } from '@/hooks/use-cart'
import useOnKeyPress from '@/hooks/use-keypress'
import { useSearch } from '@/hooks/use-search'
import useUserMenu from '@/hooks/useUserMenu'
import { NavItem } from '@/types'
import { User } from '@/types/payload'
import { cn } from '@/utils'
import { Icon } from '@iconify/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { AccordionItem } from '../base/Accordion'
import Button from '../base/Button'
import IconButton from '../base/IconButton'
import Link from '../base/Link'

interface MobileNavProps {
  items: NavItem[]
  user: User | null
}

// TODO: Add a sliding animation to it
// TODO: Clean up the code - break it down to smaller components
const MobileNav = ({ items, user }: MobileNavProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const { expandSearch } = useSearch()
  const { items: cartItems } = useCart()
  const menuItems = useUserMenu(user)

  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const navRef = useRef<HTMLDivElement>(null!)
  useOnKeyPress({ key: 'm', ctrl: true, preventDefault: true }, () => setIsOpen(true))
  useOnClickOutside(navRef, () => setIsOpen(false))

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  const closeOnCurrent = (href: string) => {
    router.push(href)
    setIsOpen(false)
  }

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  if (!isOpen)
    return (
      <div className="lg:hidden flex items-center gap-3">
        <IconButton
          icon="solar:rounded-magnifer-linear"
          className="text-xl"
          onClick={expandSearch} />
        <div className="flex">
          <span
            className="h-8 w-px bg-border"
            aria-hidden="true"
          />
        </div>
        <IconButton
          icon="solar:hamburger-menu-linear"
          onClick={() => setIsOpen(true)}
          className="p-1.5 text-[1.75rem]" />
      </div>
    )

  return (
    <div className="relative z-40 lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-35" />

      <div className="fixed inset-0 z-40 flex justify-end">
        <div className="w-4/5">
          <div ref={navRef} className="relative w-full h-full flex flex-col border border-border rounded-s-xl overflow-y-auto shadow-xl bg-background">

            <div className="flex items-center justify-between flex-none px-4 py-2">
              <IconButton
                icon="tabler-x"
                className="text-2xl"
                onClick={() => setIsOpen(false)} />
              <div className='relative'>
                <IconButton
                  href="/cart"
                  icon="solar:cart-large-minimalistic-linear"
                  className="text-primary-700 text-2xl" />
                {cartItems.length > 0 && <span className='absolute top-[20%] right-[15%] w-2 h-2 rounded-full bg-secondary' />}
              </div>
            </div>

            {/* Routes */}
            <div className='flex-1 overflow-y-auto px-3 border-y border-border divide-y divide-border'>
              {!!menuItems.length && <ul className="py-2">
                {menuItems.map((item) => (
                  <li key={item.value}>
                    <Link
                      href={item.route}
                      onClick={item.action}
                      className={cn(
                        "flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-300 ease-in-out",
                        {
                          "hover:bg-primary-100/50": !!item.route || item.action,
                          "py-1": !!item.subtitle || item.component
                        }
                      )}>
                      <div className="flex flex-col">
                        <span className="font-medium">{item.title}</span>
                        {item.subtitle && <span className="text-md text-primary-600">{item.subtitle}</span>}
                      </div>
                      {item.icon && <Icon icon={item.icon} className="text-xl" />}
                      {item.component && item.component}
                    </Link>
                  </li>
                ))}
              </ul>}

              {/* Links */}
              <ul className="py-2">
                {items.map((item, index) => (
                  <li key={item.name}>
                    {item.items?.length ?
                      <AccordionItem
                        title={item.name}
                        titleClass="px-4 py-3 rounded-lg font-medium"
                        iconClass='w-5 h-5'
                        isOpen={openIndex === index}
                        onOpen={() => handleToggle(index)}>
                        <ul className='grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-0 px-8 mt-1 mb-2'>
                          {item.items.map((ft) =>
                            <Link
                              key={ft.name}
                              underline
                              onClick={() => closeOnCurrent(ft.href!)}
                              className='w-fit py-0.5 font-medium text-md text-primary-600'>
                              {ft.name}
                            </Link>
                          )}
                        </ul>
                      </AccordionItem> :
                      <Link
                        onClick={() => closeOnCurrent(item.href!)}
                        className={cn(
                          "flex items-center justify-between py-3 px-4 rounded-lg font-medium transition-all duration-300 ease-in-out",
                          {
                            "hover:bg-primary-100": item.href,
                            "text-secondary hover:text-secondary!": item.name === 'On Sale'
                          })}>
                        {item.name}
                      </Link>
                    }
                  </li>
                ))}
              </ul>

            </div>

            {/* Login */}
            {!user && <div className="py-3 px-4">
              <Button
                href="/login"
                label="Sign in"
                className="w-full" />
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNav