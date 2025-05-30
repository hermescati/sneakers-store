'use client'

import Icon from '@/components/base/Icon'
import Link from '@/components/base/Link'
import Button from '@/components/base/button/Button'
import useNavMenuItems from '@/hooks/useNavMenuItems'
import useOnKeyPress from '@/hooks/useOnKeyPress'
import { useUserStore } from '@/stores/userStore'
import { cn } from '@/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

const UserMenu = () => {
  const { user } = useUserStore()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null!)

  const menuItems = useNavMenuItems()

  useOnClickOutside(dropdownRef, () => setIsOpen(false))
  useOnKeyPress({ key: 'Escape' }, () => setIsOpen(false))

  return (
    <div ref={dropdownRef} className="relative">
      <Button
        variant="ghost"
        className="h-11 gap-2.5 py-0 pl-3 pr-4 text-md text-primary-700 hover:bg-transparent hover:text-foreground active:bg-transparent active:shadow-none"
        iconClass="text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="rounded-full border border-border p-1.5">
          <Icon icon="solar:user-bold-duotone" className="text-xl" />
        </span>
        <span>{user?.firstName}</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            aria-label="Dropdown menu"
            className="absolute right-0 top-full mt-3 overflow-y-auto rounded-xl border border-border bg-background p-1 shadow-lg"
          >
            <ul role="menu" aria-labelledby="account-dropdown" aria-orientation="vertical">
              {menuItems.map(item => (
                <li key={item.value}>
                  <Link
                    href={item.route}
                    onClick={item.action}
                    className={cn(
                      'flex items-center justify-between gap-10 rounded-lg px-4 py-3 transition-all duration-300 ease-in-out',
                      {
                        'hover:bg-primary-100': item.route || item.action,
                        'py-1': item.component,
                        'py-2.5': item.subtitle
                      },
                      item.class
                    )}
                  >
                    <div className="flex flex-col leading-4">
                      <span className="text-md font-medium">{item.title}</span>
                      {item.subtitle && (
                        <span className="text-sm text-primary-600">{item.subtitle}</span>
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

export default UserMenu
