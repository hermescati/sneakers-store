import { getUser } from '@/services/auth'
import { getNavbarItems } from '@/services/config'
import { cn } from '@/utils'
import Link from 'next/link'
import MainContainer from '../MainContainer'
import NavCart from './base/NavCart'
import NavLinks from './base/NavLinks'
import UserAccount from './base/UserAccount'
import NavItemsSkeleton from './skeletons/NavItemsSkeleton'

const Navbar = async () => {
  const { user } = await getUser()
  const navItems = await getNavbarItems()

  return (
    <nav className="sticky z-20 top-0 inset-x-0">
      <div className="relative bg-background shadow">
        <MainContainer>
          <div className="flex gap-20 pt-6 pb-4 items-center">
            {/* TODO: Mobile nav */}
            <div className="flex">
              <Link href="/">
                <h2 className="font-bold text-xl text-foreground">Sneakers.</h2>
              </Link>
            </div>

            <div className="flex flex-grow items-center gap-12">
              <div className="relative hidden lg:flex lg:gap-x-4 lg:flex-1 lg:items-center lg:justify-end transition-all duration-300 ease-in-out">
                {/* Account */}
                <UserAccount user={user} />

                {/* Separator */}
                <div className={cn('flex', user ? 'pl-0' : 'pl-3')}>
                  <span
                    className="h-8 w-px bg-primary-300"
                    aria-hidden="true"
                  />
                </div>

                {/* Cart */}
                <NavCart />
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
