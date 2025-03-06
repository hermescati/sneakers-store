import { getNavLinks } from '@/services'
import Link from '../base/Link'
import MainContainer from '../MainContainer'
import NavLinks from './base/NavLinks'
import UserNav from './base/UserNav'
import MobileNav from './MobileNav'
import SearchBar from './SearchBar'

const Navbar = async () => {
  const navItems = await getNavLinks()

  return (
    <nav className="sticky z-20 top-0 inset-x-0">
      <div className="relative bg-background shadow dark:border-b dark:border-border">
        <MainContainer>
          <div className="flex gap-16 py-3 lg:py-4 lg:pt-6 lg:pb-4 items-center justify-between">
            <Link href="/" className="font-bold text-xl text-foreground">Sneakers.</Link>
            <div className="hidden lg:flex lg:flex-grow items-center gap-16">
              <SearchBar />
              <UserNav />
            </div>
            <MobileNav items={navItems} />
          </div>
          <NavLinks items={navItems} />
        </MainContainer>
      </div>
    </nav>
  )
}

export default Navbar
