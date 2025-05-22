import routes from '@/lib/routes'
import { getUser } from '@/services/auth'
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

const Navbar = async ({ items }: { items: NavStructure }) => {
  const { user } = await getUser()

  const navLinks: NavCategory[] = [
    ...(items.featured.length ? [items.featured[0]] : []),
    ...items.brands,
    ...items.others,
    ...items.featured.slice(1)
  ]

  return (
    <nav
      role="navigation"
      className="sticky inset-x-0 top-0 z-20 flex min-h-16 items-center border-b border-border/50 bg-background/90 shadow backdrop-blur-md dark:bg-background/90"
    >
      <MainContainer className="px-4 py-2.5">
        <div className="grid grid-cols-3 items-center gap-6 lg:flex lg:justify-between lg:gap-12 lg:py-2">
          <MobileNav items={navLinks} />
          <div className="place-self-center align-middle">
            <Logo />
          </div>
          <div className="flex items-center justify-end gap-2 lg:flex-1 lg:justify-normal lg:gap-12">
            <SearchDrawer />
            <div className="flex items-center gap-2">
              <span className="hidden lg:block">
                {user ? (
                  <IconButton href={routes.wishlist} icon="solar:heart-outline" />
                ) : (
                  <ThemeToggle />
                )}
              </span>
              <NavCart />
              <span className="hidden items-center lg:flex">
                <span
                  className={cn('ml-2 h-8 w-px bg-border', { 'mr-3': user })}
                  aria-hidden="true"
                />
                {user ? (
                  <UserMenu />
                ) : (
                  <Button
                    href={routes.auth.login}
                    variant="ghost"
                    iconPrepend="solar:user-outline"
                    label="Sign in"
                    className="gap-2 py-2 pl-3 pr-4 text-md text-primary-700 hover:bg-transparent hover:text-foreground active:bg-transparent active:shadow-none"
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
