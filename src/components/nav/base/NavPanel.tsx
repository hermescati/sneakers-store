'use client'

import Link from '@/components/base/Link'
import MainContainer from '@/components/MainContainer'
import { NavCategory } from '@/types'
import Image from 'next/image'

interface NavPanelProps {
  item: NavCategory
  onClick: (href: NavCategory['href']) => void
}

const NavPanel = ({ item, onClick }: NavPanelProps) => {
  return (
    <div className="bg-primary-100/50 py-6">
      {item.items && item.items.length > 0 && (
        <MainContainer className="flex flex-col gap-12">
          <div className="grid w-full grid-cols-6">
            <h3 className="font-semibold">{item.name === 'Others' ? 'All Brands' : 'Models'}</h3>
            <ul className="col-span-5 col-start-2 mt-1 grid grid-flow-col grid-rows-3 gap-x-3 gap-y-3">
              {item.items.map((model, index) => (
                <Link
                  key={index}
                  underline
                  className="w-fit text-md font-medium text-primary-700 hover:text-foreground"
                  onClick={() => onClick(model.href)}
                >
                  {model.name}
                </Link>
              ))}
            </ul>
          </div>

          {item.featured && item.featured?.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold">Popular</h3>
              <ul className="grid grid-cols-3 gap-x-8">
                {item.featured.map(featuredItem => (
                  <Link
                    key={featuredItem.name}
                    underline
                    className="group relative flex flex-col gap-2"
                    onClick={() => onClick(featuredItem.href)}
                  >
                    <div className="relative aspect-video overflow-hidden rounded-2xl bg-white">
                      <Image
                        src={featuredItem.imageSrc as string}
                        alt={featuredItem.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 33vw"
                        className="object-cover object-center"
                      />
                      <div className="absolute inset-0 transition-all duration-300 group-hover:bg-black/10" />
                    </div>
                    <p className="text-md font-medium text-primary-700 hover:text-foreground">
                      {featuredItem.name}
                    </p>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </MainContainer>
      )}
    </div>
  )
}

export default NavPanel
