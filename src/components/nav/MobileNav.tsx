'use client'

import { useCart } from '@/hooks/use-cart'
import useOnKeyPress from '@/hooks/use-keypress'
import { useSearch } from '@/hooks/use-search'
import { NavItem } from '@/types'
import { User } from '@/types/payload'
import { cn } from '@/utils'
import { Icon } from '@iconify/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useOnClickOutside } from 'usehooks-ts'
import { AccordionItem } from '../base/Accordion'
import Button from '../base/Button'
import Link from '../base/Link'
import ThemeToggle from '../ThemeToggle'

// TODO: Add a sliding animation to it
const MobileNav = ({ items, user }: { items: NavItem[], user: User | null }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { expandSearch } = useSearch()

  const navRef = useRef<HTMLDivElement>(null!)
  useOnKeyPress({ key: 'm', ctrl: true, preventDefault: true }, () => setIsOpen(true))
  useOnClickOutside(navRef, () => setIsOpen(false))

  const router = useRouter()
  const pathname = usePathname()
  const { items: cartItems } = useCart()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const dropdownItems = user
    ? [
      ...(user && user.role === 'admin'
        ? [
          {
            value: 'dashboard',
            label: 'Admin Dashboard',
            icon: 'mage:dashboard',
            action: '/admin',
          },
        ]
        : []),
      {
        value: 'orders',
        label: 'My Orders',
        icon: 'mage:box',
        action: '/orders'
      }
    ]
    : []

  const closeOnCurrent = (href: string) => {
    router.push(href)
    setIsOpen(false)
  }

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (!response.ok) throw new Error('Logout failed')
      toast.success('Successfully logged out.')

      router.refresh()
    } catch (error) {
      console.error('Error during logout:', error)
      toast.error("Couldn't logout. Please try again!")
    }
  }

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  if (!isOpen)
    return (
      <div className="lg:hidden flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          icon="solar:rounded-magnifer-linear"
          className="p-2 inline-flex items-center justify-center rounded-full text-xl hover:bg-primary-100"
          onClick={expandSearch}
        />
        <div className="flex">
          <span
            className="h-8 w-px bg-primary-300"
            aria-hidden="true"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          icon="solar:hamburger-menu-linear"
          onClick={() => setIsOpen(true)}
          className="p-1.5 inline-flex items-center justify-center rounded-full text-[1.75rem] hover:bg-primary-100"
        />
      </div>
    )

  return (
    <div className="relative z-40 lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-25" />

      {/* Sliding Sheet */}
      <div className="fixed inset-0 z-40 flex justify-end">
        <div className="w-4/5">
          <div ref={navRef} className="relative w-full h-full flex flex-col overflow-y-auto shadow-xl border-l-2 border-primary-200 bg-background">

            {/* Header */}
            <div className="flex items-center justify-between flex-none px-4 py-2">
              <Button
                size="icon"
                variant="ghost"
                icon="tabler:x"
                onClick={() => setIsOpen(false)}
                className="relative p-2.5 inline-flex items-center justify-center rounded-full text-xl hover:bg-primary-100"
              />
              <div className='flex items-center justify-between'>
                <ThemeToggle />
                {/* <NavCart /> */}
                <div className="relative">
                  <Button
                    size="icon"
                    variant="ghost"
                    icon="solar:cart-large-minimalistic-linear"
                    href="/cart"
                    className="p-2.5 inline-flex items-center justify-center rounded-full hover:bg-primary-100 text-[1.5rem]"
                  />
                  {cartItems.length > 0 &&
                    <span className="absolute top-2 right-1.5 bg-secondary rounded-full w-2 h-2">
                    </span>
                  }
                </div>
                {user && <>
                  <div className="flex ml-2 mr-4">
                    <span
                      className="h-8 w-px bg-primary-300"
                      aria-hidden="true"
                    />
                  </div>
                  <h4 className="flex-1 font-semibold">
                    Hi, {user.firstName}
                  </h4>
                </>}
              </div>
            </div>

            <div className='flex-1 overflow-y-auto px-4 border-y border-primary-300 divide-y divide-primary-300'>
              {/* User routes */}
              {user && <ul className="divide-y divide-gray-100">
                {dropdownItems.map((item) =>
                  <li key={item.value}>
                    <Link
                      href={item.action}
                      className='flex gap-3 items-center px-3 py-4 font-medium rounded cursor-pointer hover:bg-primary-100'>
                      {item.icon && <Icon icon={item.icon} className="text-2xl" />}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                )}
              </ul>}
              {/* Links */}
              <ul className="divide-y divide-gray-100">
                {items.map((item, index) => (
                  <li key={item.name}>
                    {!item.featured?.length ?
                      <Link
                        underline={!!item.href}
                        onClick={() => closeOnCurrent(item.href!)}
                        className={cn(
                          "inline-flex w-full px-3 py-4 rounded font-semibold",
                          {
                            "hover:bg-primary-100": item.href,
                            "text-secondary hover:text-secondary!": item.name === 'On Sale'
                          })}>
                        {item.name}
                      </Link>
                      :
                      <AccordionItem
                        title={item.name}
                        titleClass="font-semibold text-base rounded px-3 py-4"
                        iconClass='w-5 h-5'
                        isOpen={openIndex === index}
                        onOpen={() => handleToggle(index)}>
                        <ul className='grid grid-cols-2 md:grid-cols-3 px-3 pt-1 pb-4'>
                          {item.featured.map((ft) =>
                            <Link
                              key={ft.name}
                              underline
                              onClick={() => closeOnCurrent(ft.href!)}
                              className='w-fit py-0.5 font-medium text-md'>
                              {ft.name}
                            </Link>
                          )}
                        </ul>
                      </AccordionItem>
                    }
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className='flex-none py-5 px-6'>
              {user ? <Button
                label="Logout"
                size="small"
                variant="outline"
                className="w-full py-2.5 text-base border-primary-500 text-primary-600"
                onClick={handleLogout}
              />
                : <div>
                  <Button
                    href="/login"
                    label="Sign in"
                    size="small"
                    className="w-full py-3 text-base" />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNav