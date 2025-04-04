'use client'

import useNavigationMenu from '@/hooks/useNavigationMenu'
import { useCartStore } from '@/stores/cartStore'
import { useUserStore } from '@/stores/userStore'
import { NavItem } from '@/types'
import { cn } from '@/utils'
import { Icon } from '@iconify/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Drawer } from 'vaul'
import { Accordion, AccordionItem } from '../base/Accordion'
import Button from '../base/button/Button'
import IconButton from '../base/button/IconButton'
import Link from '../base/Link'
import routes from '@/lib/routes'

const MobileNav = ({ navLinks }: { navLinks: NavItem[] }) => {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = useNavigationMenu()
  const { items: cartItems } = useCartStore()
  const { user } = useUserStore()

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const closeOnCurrent = (href: string) => {
    router.push(href)
    setIsOpen(false)
  }

  const navLinkClasses = "flex items-center justify-between px-4 py-3.5 rounded-lg font-semibold transition-all duration-300 ease-in-out"

  return (
    <Drawer.Root direction='right' open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger asChild>
        <IconButton icon="solar:hamburger-menu-linear" className="p-1.5 text-[1.75rem]" />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 z-30 bg-black/40' />
        <Drawer.Content
          className="flex fixed right-0 inset-y-2 z-30 w-[85%] max-w-lg rounded-l-2xl border-l border-y border-border bg-background shadow-xl outline-none overflow-hidden"
          style={{ '--initial-transform': 'calc(100% + 3rem)' } as React.CSSProperties}>
          <div className="relative flex flex-col h-full grow">
            <Drawer.Title></Drawer.Title>

            <div className='flex flex-col divide-y divide-border w-full h-full'>
              <div className="flex flex-none px-4 py-2 items-center justify-between">
                <IconButton
                  icon="tabler-x"
                  className="text-2xl"
                  onClick={() => setIsOpen(false)} />
                <div className='relative'>
                  <IconButton
                    href={routes.cart}
                    icon="solar:cart-large-minimalistic-linear"
                    className="text-primary-700 text-2xl" />
                  {cartItems.length > 0 && <span className='absolute top-[20%] right-[15%] w-2 h-2 rounded-full bg-secondary' />}
                </div>
              </div>

              <div className='flex flex-col gap-2 h-full overflow-y-auto'>
                {menuItems.length > 0 && <ul className="mx-3 mt-2 space-y-0.5">
                  {menuItems.map((item) => (
                    <Link
                      key={item.value}
                      href={item.route}
                      onClick={item.action}
                      className={cn(
                        navLinkClasses,
                        {
                          "hover:bg-primary-100": !!item.route || item.action,
                          "py-1.5": !!item.subtitle || item.component
                        }
                      )}>
                      <div className="leading-snug">
                        <p className="font-semibold">{item.title}</p>
                        {item.subtitle && <p className="font-medium text-sm text-primary-600">{item.subtitle}</p>}
                      </div>
                      {item.icon && <Icon icon={item.icon} className="text-xl" />}
                      {item.component && item.component}
                    </Link>
                  ))}
                </ul>}

                <span className='w-full h-px border-t border-border' />

                <ul className="mx-3 space-y-0.5">
                  {navLinks.map((link, index) =>
                    !link.items?.length ? (
                      <Link
                        key={link.name}
                        underline
                        onClick={() => closeOnCurrent(link.href!)}
                        className={cn(navLinkClasses, {
                          "hover:bg-primary-100": link.href,
                          "text-secondary hover:text-secondary": link.name === "On Sale",
                        })}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <Accordion key={link.name}>
                        <AccordionItem index={index} title={link.name} titleClasses={navLinkClasses}>
                          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 p-4 border-b border-border">
                            {link.items.map((ft) => (
                              <Link
                                key={ft.name}
                                underline
                                onClick={() => closeOnCurrent(ft.href!)}
                                className="w-fit font-medium text-md text-primary-700"
                              >
                                {ft.name}
                              </Link>
                            ))}
                          </ul>
                        </AccordionItem>
                      </Accordion>
                    )
                  )}
                </ul>

              </div>

              {!user
                ? <div className="py-3 px-4">
                  <Button
                    href={routes.auth.login}
                    label="Sign in"
                    className="w-full" />
                </div>
                : <div className='!border-t-0 bg-background h-3' />
              }
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default MobileNav