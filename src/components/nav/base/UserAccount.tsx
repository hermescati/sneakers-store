'use client'

import Button from '@/components/base/Button'
import Link from '@/components/base/Link'
import useOnEscapeKey from '@/hooks/use-escape-key'
import { User } from '@/types/payload'
import { cn } from '@/utils'
import { getNavRoutes } from '@/utils/navigation'
import { Icon } from '@iconify/react'
import { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

const UserAccount = ({ user }: { user: User | null }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const dropdownRef = useRef<HTMLDivElement>(null!)
  useOnClickOutside(dropdownRef, () => setIsOpen(false))
  useOnEscapeKey(() => setIsOpen(false))

  const routes = getNavRoutes(user)

  if (!user) {
    return (
      <Button
        href="/login"
        label="Sign in"
        size="small"
        variant="outline"
        className="border-primary-500 text-primary-600 text-base hover:background-primary-200"
      />
    )
  }

  return (
    <div ref={dropdownRef} className="relative">
      <Button
        id="account-dropdown"
        aria-label="Toggle dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        size="icon"
        variant="ghost"
        type="button"
        icon="solar:user-bold-duotone"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 border border-border bg-transparent hover:bg-primary-100/50 active:outline-none active:ring-0 active:ring-transparent">
      </Button>

      {isOpen && (
        <div aria-label="Dropdown menu" className="p-2 absolute top-full right-0 mt-4 z-20 border border-border rounded-xl bg-background overflow-y-auto shadow-lg">
          <ul role="menu" aria-labelledby="account-dropdown" aria-orientation="vertical">
            {routes.map((item) => (
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

export default UserAccount
