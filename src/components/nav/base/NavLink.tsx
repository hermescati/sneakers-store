'use client'

import Link from '@/components/base/Link'
import MainContainer from '@/components/MainContainer'
import { NavItem } from '@/types'
import { cn } from '@/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface NavItemProps {
  item: NavItem
  isActive: boolean
  isAnyActive: boolean
  handleOpen: (href?: string) => void
}

const NavLink = ({ item, isActive, isAnyActive, handleOpen }: NavItemProps) => {
  const router = useRouter()

  const handleOnClick = (href?: string) => {
    if (!href) {
      handleOpen()
      return
    }

    router.push(href)
    handleOpen(href)
  }

  return (
    <div className="flex">
      {/* Nav Link */}
      <div className="relative flex items-center">
        <Link
          className={cn(
            'font-semibold text-md text-primary-600 hover:text-foreground',
            {
              'text-foreground': isActive,
              'text-secondary hover:text-secondary!': item.name === 'On Sale'
            }
          )}
          underline={false}
          onClick={() => handleOnClick(item.href)}
        >
          {item.name}
        </Link>
      </div>

      {isActive && !item.href && (
        <div
          className={cn('absolute inset-x-0 top-full bg-primary-100 py-8', {
            'animate-in fade-in-10 slide-in-from-top-5': !isAnyActive
          })}
        >
          <div className="absolute inset-0 top-1/2 shadow" aria-hidden="true" />

          <MainContainer className="flex flex-col gap-12">
            {/* All Models */}
            <div className="grid grid-cols-6 w-full">
              <h3 className="font-semibold text-foreground">Models</h3>
              <ul className="col-start-2 col-span-5 grid grid-rows-3 grid-flow-col gap-x-3 gap-y-3">
                {item.items?.map((model, index) => (
                  <li key={index}>
                    <Link
                      className="font-medium text-md text-primary-600 hover:text-foreground"
                      underline
                      onClick={() => handleOnClick(model.href)}
                    >
                      {model.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Featured Models */}
            {item.featured && !!item.featured.length && (
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-foreground">Popular</h3>
                <ul className="grid grid-cols-3 gap-x-8">
                  {item.featured?.map((featuredItem) => (
                    <li key={featuredItem.name}>
                      <Link
                        className="group relative flex flex-col gap-3"
                        underline
                        onClick={() => handleOnClick(featuredItem.href)}
                      >
                        <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-100">
                          <Image
                            src={featuredItem.imageSrc as string}
                            alt={featuredItem.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 33vw"
                            className="object-cover object-center"
                          />

                          <div className="absolute inset-0 transition-all duration-300 group-hover:bg-primary-900/15" />
                        </div>
                        <p className="font-semibold text-md">
                          {featuredItem.name}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </MainContainer>
        </div>
      )}
    </div>
  )
}

export default NavLink
