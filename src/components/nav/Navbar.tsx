'use client'

import routes from '@/lib/routes'
import { useUserStore } from '@/stores/userStore'
import { NavCategory, NavStructure } from '@/types'
import { cn } from '@/utils'
import MainContainer from '../MainContainer'
import Button from '../base/button/Button'
import IconButton from '../base/button/IconButton'
import SearchDrawer from '../filters/drawers/SearchDrawer'
import ThemeToggle from '../theme/ThemeToggle'
import MobileNav from './MobileNav'
import NavLinks from './NavLinks'
import Logo from './base/Logo'
import NavCart from './base/NavCart'
import UserMenu from './base/UserMenu'

const Navbar = ({ items }: { items: NavStructure }) => {
  const { user } = useUserStore()

  const navLinks: NavCategory[] = [
    ...(items.featured.length ? [items.featured[0]] : []),
    ...items.brands,
    ...items.others,
    ...items.featured.slice(1)
  ]

  return (
    <nav
      role="navigation"
      className="sticky z-20 top-0 inset-x-0 flex items-center min-h-16 bg-background/90 dark:bg-background/90 backdrop-blur-md border-b border-border/50 shadow"
    >
      <MainContainer className="py-2.5 px-4">
        <div className="grid grid-cols-3 items-center gap-6 lg:flex lg:justify-between lg:py-2 lg:gap-12">
          <MobileNav items={navLinks} />
          <div className="place-self-center align-middle">
            <Logo />
          </div>
          <div className="flex items-center justify-end lg:justify-normal lg:flex-1 lg:gap-12">
            <SearchDrawer />
            <div className="flex items-center gap-3">
              <span className="hidden lg:block">
                {user ? (
                  <IconButton href={routes.wishlist} icon="solar:heart-outline" />
                ) : (
                  <ThemeToggle />
                )}
              </span>
              <NavCart />
              <span className="hidden lg:flex items-center gap-4">
                <span className={cn('h-8 w-px bg-border ml-2')} aria-hidden="true" />
                {user ? (
                  <UserMenu />
                ) : (
                  <Button
                    href={routes.auth.login}
                    variant="ghost"
                    iconPrepend="solar:user-outline"
                    label="Sign in"
                    className="py-2 pl-3 pr-4 gap-2 text-primary-700 text-md hover:bg-transparent active:bg-transparent hover:text-foreground active:shadow-none"
                    iconClass="text-2xl"
                  />
                )}
              </span>
            </div>
          </div>
        </div>
        <NavLinks items={navLinks} />
      </MainContainer>
    </nav>
  )
}

export default Navbar
