'use client'

import IconButton from '@/components/base/IconButton'
import Link from '@/components/base/Link'
import ThemeToggle from '@/components/theme/ThemeToggle'
import useOnEscapeKey from '@/hooks/use-escape-key'
import useNavigationMenu from '@/hooks/useNavigationMenu'
import { useUserStore } from '@/stores/userStore'
import { cn } from '@/utils'
import { Icon } from '@iconify/react'
import { useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import NavCart from './NavCart'

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { user } = useUserStore()

  const dropdownRef = useRef<HTMLDivElement>(null!)
  useOnClickOutside(dropdownRef, () => setIsOpen(false))
  useOnEscapeKey(() => setIsOpen(false))

  const menuItems = useNavigationMenu()

  return (
    <div ref={dropdownRef} className="relative">
      <div
        className="flex items-center gap-2 cursor-pointer"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <IconButton
          id="account-dropdown"
          aria-label="Toggle dropdown"
          aria-haspopup="true"
          aria-expanded={isOpen}
          type="button"
          icon="solar:user-bold-duotone"
          className="p-1.5 border border-border bg-transparent"
        />
        <span className="font-medium text-md text-primary-600 leading-none">{user?.firstName}</span>
      </div>

      {isOpen && (
        <div aria-label="Dropdown menu" className="p-2 absolute top-full left-0 mt-4 z-20 border border-border rounded-xl bg-background overflow-y-auto shadow-lg">
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
                  <div className="flex flex-col leading-tight">
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
  const [mounted, setMounted] = useState(false)
  const { user } = useUserStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative flex min-w-44 items-center justify-between transition-all duration-300 ease-in-out">
      <div className={cn("flex items-center gap-2.5", !mounted ? 'opacity-0' : 'opacity-100')}>
        {!user && <ThemeToggle floating />}
        {!user
          ? <IconButton href='/login' icon='solar:user-outline' className='p-1.5 hover:text-foreground hover:bg-transparent active:bg-transparent active:shadow-none' />
          : <UserMenu />
        }
      </div>
      <span
        className={cn("h-8 w-px mr-3 ml-0 bg-border", { 'mx-3': user })}
        aria-hidden="true"
      />
      <NavCart />
    </div>
  )
}

export default UserNav
