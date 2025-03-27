import { getNavLinks } from '@/services'
import Link from '../base/Link'
import SearchDrawer from '../drawers/SearchDrawer'
import MainContainer from '../MainContainer'
import NavLinks from './base/NavLinks'
import UserNav from './base/UserNav'
import MobileNav from './MobileNav'

const Navbar = async () => {
  const navItems = await getNavLinks()

  return (
    <nav className="sticky z-20 top-0 inset-x-0 bg-background shadow dark:border-b dark:border-border/50">
      <MainContainer>
        <div className="flex items-center justify-between gap-6 lg:gap-16 py-3 lg:py-4 lg:pt-6 lg:pb-4">
          <Link href="/" className="font-bold text-xl text-foreground" aria-label='Home - Sneakers'>
            Sneakers.
          </Link>
          <div className="flex items-center gap-3 lg:flex-grow lg:gap-16 divide-x divide-border lg:divide-x-0">
            <SearchDrawer />
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex">
                <UserNav />
              </div>
              <div className="lg:hidden ml-3">
                <MobileNav navLinks={navItems} />
              </div>
            </div>
          </div>
        </div>
        <NavLinks items={navItems} />
      </MainContainer>
    </nav>
  )
}

export default Navbar
