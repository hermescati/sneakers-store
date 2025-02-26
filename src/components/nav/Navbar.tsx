import { getUser } from '@/services/auth'
import { getNavbarItems } from '@/services/config'
import Link from '../base/Link'
import MainContainer from '../MainContainer'
import NavCart from './base/NavCart'
import NavLinks from './base/NavLinks'
import UserMenu from './base/UserMenu'
import MobileNav from './MobileNav'
import SearchBar from './SearchBar'
import ThemeToggle from '../theme/ThemeToggle'

const Navbar = async () => {
  const { user } = await getUser()
  const navItems = await getNavbarItems()

  return (
    <nav className="sticky z-20 top-0 inset-x-0">
      <div className="relative bg-background shadow dark:border-b dark:border-border">
        <MainContainer>
          <div className="flex gap-14 py-3 lg:py-4 lg:pt-6 lg:pb-4 items-center justify-between">
            <Link href="/" className="font-bold text-xl text-foreground">Sneakers.</Link>
            <div className="hidden lg:flex lg:flex-grow items-center lg:gap-14">
              <SearchBar />
              <div className="relative lg:flex lg:gap-x-4 lg:flex-1 lg:items-center lg:justify-end transition-all duration-300 ease-in-out">
                <div className="flex items-center gap-2">
                  {!user && <ThemeToggle floating/>}
                  <NavCart />
                </div>
                <UserMenu user={user} />
              </div>
            </div>
            <MobileNav items={navItems} user={user} />
          </div>
          <NavLinks items={navItems} />
        </MainContainer>
      </div>
    </nav>
  )
}

export default Navbar
