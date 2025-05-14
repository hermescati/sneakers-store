import { NavItemGroups, NavLink } from '@/types'
import MainContainer from '../MainContainer'
import SearchDrawer from '../filters/drawers/SearchDrawer'
import MobileNav from './MobileNav'
import Logo from './base/Logo'
import NavMenu from './base/NavMenu'
import UserNav from './base/UserNav'

const Navbar = ({ navItems }: { navItems: NavItemGroups }) => {
  const navMenuItems: NavLink[] = [
    ...(navItems.featured.length ? [navItems.featured[0]] : []),
    ...navItems.brands,
    ...navItems.others,
    ...navItems.featured.slice(1)
  ]

  return (
    <nav
      role="navigation"
      className="sticky z-20 top-0 inset-x-0 min-h-16 bg-background/90 dark:bg-background/90 backdrop-blur-md border-b border-border/50 shadow"
    >
      <MainContainer className="py-1">
        <div className="flex items-center justify-between gap-6 lg:gap-16 py-2 lg:py-4">
          <Logo />
          <div className="flex items-center gap-4 lg:flex-grow lg:gap-16 divide-x divide-border lg:divide-x-0">
            <SearchDrawer />
            <div className="flex items-center gap-3">
              <UserNav />
              <MobileNav navLinks={navMenuItems} />
            </div>
          </div>
        </div>
        <NavMenu items={navMenuItems} />
      </MainContainer>
    </nav>
  )
}

export default Navbar
