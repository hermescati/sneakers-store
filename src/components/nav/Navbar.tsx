import { getUser } from '@/services/auth'
import { getNavbarItems } from '@/services/config'
import { cn } from '@/utils'
import Link from 'next/link'
import MainContainer from '../MainContainer'
import NavCart from './base/NavCart'
import NavLinks from './base/NavLinks'
import UserAccount from './base/UserAccount'
import MobileNav from './MobileNav'
import SearchBar from './SearchBar'
import NavItemsSkeleton from './skeletons/NavItemsSkeleton'
import { Product } from '@/types/payload'

const Navbar = async () => {
  const { user } = await getUser()
  const navItems = await getNavbarItems()

  return (
    <nav className="sticky z-20 top-0 inset-x-0">
      <div className="relative bg-background shadow">
        <MainContainer>
          <div className="flex gap-14 py-3 lg:py-4 lg:pt-6 lg:pb-4 items-center justify-between">
            <div className="flex">
              <Link href="/">
                <h2 className="font-bold text-xl text-foreground">Sneakers.</h2>
              </Link>
            </div>

            {/* <MobileNav items={navItems} user={user}/> */}
            <SearchBar />

            <div className="hidden lg:flex lg:flex-grow items-center gap-12">
              <div className="relative lg:flex lg:gap-x-4 lg:flex-1 lg:items-center lg:justify-end transition-all duration-300 ease-in-out">
                {/* Cart */}
                <NavCart />

                {/* Separator */}
                <div className={cn('flex', user ? 'ml-1' : '-ml-1 mr-2')}>
                  <span
                    className="h-8 w-px bg-primary-300"
                    aria-hidden="true"
                  />
                </div>

                {/* Account */}
                <UserAccount user={user} />
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden z-20 lg:block lg:self-stretch">
            {!navItems.length ? (
              <NavItemsSkeleton />
            ) : (
              <NavLinks items={navItems} />
            )}
          </div>
        </MainContainer>
      </div>
    </nav>
  )
}

export default Navbar
