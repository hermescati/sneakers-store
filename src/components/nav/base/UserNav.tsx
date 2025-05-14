'use client'

import Icon from '@/components/base/Icon'
import Link from '@/components/base/Link'
import IconButton from '@/components/base/button/IconButton'
import ThemeToggle from '@/components/theme/ThemeToggle'
import useNavigationMenu from '@/hooks/useNavigationMenu'
import useOnKeyPress from '@/hooks/useOnKeyPress'
import routes from '@/lib/routes'
import { useUserStore } from '@/stores/userStore'
import { cn } from '@/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import NavCart from './NavCart'

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null!)

  const { user } = useUserStore()
  const menuItems = useNavigationMenu()

  useOnClickOutside(dropdownRef, () => setIsOpen(false))
  useOnKeyPress({ key: 'Escape' }, () => setIsOpen(false))

  return (
    <div ref={dropdownRef} className="relative">
      <div
        className="flex items-center gap-2.5 p-0.5 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IconButton
          id="account-dropdown"
          type="button"
          icon="solar:user-bold-duotone"
          aria-label="Toggle dropdown"
          aria-haspopup="true"
          aria-expanded={isOpen}
          className="p-1.5 border border-border bg-transparent text-lg"
          iconClass="text-xl"
        />
        <span className="font-semibold text-md text-primary-700 leading-none">
          {user?.firstName}
        </span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            aria-label="Dropdown menu"
            className="p-2 absolute top-full left-1/2 !-translate-x-1/2 3xl:left-0 3xl:!translate-x-0 mt-3 border border-border rounded-xl bg-background overflow-y-auto shadow-lg"
          >
            <ul role="menu" aria-labelledby="account-dropdown" aria-orientation="vertical">
              {menuItems.map(item => (
                <li key={item.value}>
                  <Link
                    href={item.route}
                    onClick={item.action}
                    className={cn(
                      'flex items-center justify-between gap-10 px-4 py-3.5 rounded-lg transition-all duration-300 ease-in-out',
                      {
                        'hover:bg-primary-100/50': item.route || item.action,
                        'py-1.5': item.subtitle || item.component
                      }
                    )}
                  >
                    <div className="flex flex-col leading-tight">
                      <span className="font-medium text-md">{item.title}</span>
                      {item.subtitle && (
                        <span className="text-md text-primary-600">{item.subtitle}</span>
                      )}
                    </div>
                    {item.icon && <Icon icon={item.icon} className="text-xl" />}
                    {item.component && <div className="-mr-2">{item.component}</div>}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const UserNav = () => {
  const { user } = useUserStore()

  return (
    <div className="relative hidden lg:flex items-center gap-5 transition-all duration-300 ease-in-out">
      <>
        {user ? (
          <UserMenu />
        ) : (
          <div className="flex items-center gap-1.5 opacity-100 transition-opacity duration-300">
            <ThemeToggle />
            <IconButton
              href={routes.auth.login}
              icon="solar:user-outline"
              className="p-1.5 hover:text-foreground hover:bg-transparent active:bg-transparent active:shadow-none"
              iconClass="text-2xl"
            />
          </div>
        )}
      </>

      <div className={cn('h-8 w-px bg-border', user ? 'mx-3' : 'mr-1')} aria-hidden="true" />
      <NavCart />
    </div>
  )
}

export default UserNav
