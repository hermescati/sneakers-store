'use client'

import useNavMenuItems from '@/hooks/useNavMenuItems'
import routes from '@/lib/routes'
import { useUserStore } from '@/stores/userStore'
import { NavCategory, NavMenuItem } from '@/types'
import { cn } from '@/utils'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Drawer } from 'vaul'
import { Accordion, AccordionItem } from '../base/Accordion'
import Icon from '../base/Icon'
import Link from '../base/Link'
import Button from '../base/button/Button'
import IconButton from '../base/button/IconButton'
import ThemeToggle from '../theme/ThemeToggle'

const NAV_LINKS_CLASS =
  'flex items-center justify-between px-4 py-3.5 h-[3.25rem] rounded-lg font-semibold transition-all duration-300 ease-in-out'

const MenuItem = ({ item }: { item: NavMenuItem }) => (
  <Link
    href={item.route}
    onClick={item.action}
    className={cn(NAV_LINKS_CLASS, item.class, {
      'hover:bg-primary-100': !!item.route || item.action,
      'py-2': !!item.subtitle
    })}
  >
    <div className="leading-tight">
      <p className="font-semibold">{item.title}</p>
      {item.subtitle && <p className="text-md font-medium text-primary-600">{item.subtitle}</p>}
    </div>
    {item.icon && <Icon icon={item.icon} className="text-xl" />}
    {item.component && item.component}
  </Link>
)

const MobileNav = ({ items }: { items: NavCategory[] }) => {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = useNavMenuItems()
  const { user } = useUserStore()

  const closeOnCurrent = (href: string) => {
    router.push(href)
    setIsOpen(false)
  }

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <div className="lg:hidden">
      <Drawer.Root direction="left" open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Trigger asChild>
          <IconButton icon="solar:hamburger-menu-linear" className="p-1" iconClass="text-3xl" />
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-30 bg-black/40 lg:hidden" />
          <Drawer.Content
            className="fixed inset-y-2 left-0 z-30 flex w-[85%] max-w-lg overflow-hidden rounded-r-2xl border-y border-l border-border bg-background shadow-xl outline-none md:w-[80%] lg:hidden"
            style={{ '--initial-transform': 'calc(100% + 0.5rem)' } as React.CSSProperties}
          >
            <div className="flex h-full w-full flex-col">
              <Drawer.Title asChild>
                <div className="flex items-center justify-between px-4 py-2">
                  <IconButton
                    icon="hugeicons:sidebar-left"
                    iconClass="text-2xl"
                    className="p-2"
                    onClick={() => setIsOpen(false)}
                  />
                  <ThemeToggle headless />
                </div>
              </Drawer.Title>
              <Drawer.Description asChild>
                <div className="flex flex-1 flex-col justify-between divide-y divide-border overflow-hidden border-t border-border">
                  <div className="flex flex-1 flex-col overflow-y-auto">
                    {user && menuItems.length > 0 && (
                      <ul className="mx-3 my-1">
                        {menuItems.map(item => (
                          <MenuItem key={item.value} item={item} />
                        ))}
                      </ul>
                    )}
                    {user && <span className="h-px w-full border-t border-border" />}
                    <Accordion className="mx-3 my-1 gap-0">
                      {items.map((link, index) =>
                        link.items?.length ? (
                          <AccordionItem
                            key={link.name}
                            index={index}
                            title={link.name}
                            titleClasses={cn(NAV_LINKS_CLASS, 'h-12')}
                          >
                            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 border-b border-border p-4">
                              {link.items.map(ft => (
                                <Link
                                  key={ft.name}
                                  underline
                                  onClick={() => closeOnCurrent(ft.href!)}
                                  className="w-fit text-md font-medium text-primary-700"
                                >
                                  {ft.name}
                                </Link>
                              ))}
                            </ul>
                          </AccordionItem>
                        ) : (
                          <Link
                            key={link.name}
                            underline
                            onClick={() => closeOnCurrent(link.href!)}
                            className={cn(NAV_LINKS_CLASS, 'h-12', {
                              'hover:bg-primary-100': link.href,
                              'text-secondary hover:text-secondary': link.name === 'On Sale'
                            })}
                          >
                            {link.name}
                          </Link>
                        )
                      )}
                    </Accordion>
                  </div>
                  {!user ? (
                    <div className="px-4 py-3">
                      <Button href={routes.auth.login} label="Sign in" className="w-full" />
                    </div>
                  ) : (
                    <div className="h-2 !border-t-0 bg-background" />
                  )}
                </div>
              </Drawer.Description>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  )
}

export default MobileNav
