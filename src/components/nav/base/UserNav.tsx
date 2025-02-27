'use client'

import Button from '@/components/base/Button'
import IconButton from '@/components/base/IconButton'
import Link from '@/components/base/Link'
import ThemeToggle from '@/components/theme/ThemeToggle'
import useOnEscapeKey from '@/hooks/use-escape-key'
import useNavigationMenu from '@/hooks/useNavigationMenu'
import { useUserStore } from '@/stores/userStore'
import { cn } from '@/utils'
import { Icon } from '@iconify/react'
import { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import NavCart from './NavCart'

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const dropdownRef = useRef<HTMLDivElement>(null!)
  useOnClickOutside(dropdownRef, () => setIsOpen(false))
  useOnEscapeKey(() => setIsOpen(false))

  const menuItems = useNavigationMenu()

  return (
    <div ref={dropdownRef} className="relative">
      <IconButton
        id="account-dropdown"
        aria-label="Toggle dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        icon="solar:user-bold-duotone"
        className="p-1.5 border border-border bg-transparent"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div aria-label="Dropdown menu" className="p-2 absolute top-full right-0 mt-4 z-20 border border-border rounded-xl bg-background overflow-y-auto shadow-lg">
          <ul role="menu" aria-labelledby="account-dropdown" aria-orientation="vertical">
            {menuItems.map((item) => (
              <li key={item.value}>
                <Link
                  href={item.route}
                  onClick={item.action}
                  className={cn(
                    "flex items-center justify-between gap-10 px-4 py-3.5 rounded-lg transition-all duration-300 ease-in-out",
                    {
                      "hover:bg-primary-100/50": !!item.route || item.action,
                      "py-1.5": !!item.subtitle || item.component
                    }
                  )}>
                  <div className="flex flex-col">
                    <span className="font-medium text-md">{item.title}</span>
                    {item.subtitle && <span className="text-md text-primary-600">{item.subtitle}</span>}
                  </div>
                  {item.icon && <Icon icon={item.icon} className="text-xl" />}
                  {item.component &&
                    <div className="-mr-2">
                      {item.component}
                    </div>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div >
  )
}

const UserNav = () => {
  const { user } = useUserStore()

  return (
    <div className="relative lg:flex lg:gap-x-3 lg:flex-1 lg:items-center lg:justify-end transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-2">
        {!user && <ThemeToggle floating />}
        <NavCart />
      </div>
      {!user
        ? <Button
          href="/login"
          label="Sign in"
          size="small"
          variant="outline"
          className="text-base border-primary-500 text-primary-600 dark:border-primary-400 dark:hover:bg-primary-100 dark:text-primary-600"
        />
        : <UserMenu />
      }
    </div>
  )
}

export default UserNav
