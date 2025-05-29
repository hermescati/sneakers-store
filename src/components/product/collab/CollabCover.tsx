'use client'

import Icon from '@/components/base/Icon'
import Link from '@/components/base/Link'
import routes from '@/lib/routes'
import { Collaboration, Media } from '@/types/payload'
import { darkenHexColor } from '@/utils/colors'
import { useColor } from 'color-thief-react'
import Image from 'next/image'

const CollabCover = ({ collaboration }: { collaboration: Collaboration }) => {
  const cover = collaboration.image as Media
  const { data } = useColor(cover.url!, 'hex')
  const dominantColor = data ? darkenHexColor(data, 35) : '#000000'

  return (
    <Link
      href={`${routes.products.home}?collaboration=${collaboration.slug}`}
      className="group relative aspect-video w-full overflow-hidden rounded-2xl md:aspect-[16/6] xl:aspect-[3/2]"
    >
      <div
        className="absolute inset-x-0 min-h-full"
        style={{
          background: `linear-gradient(to top,
                        ${dominantColor}FF 0%,   /* 100% opacity */
                        ${dominantColor}BF 35%,  /* 75% opacity */
                        ${dominantColor}26 75%,  /* 25% opacity */
                        ${dominantColor}00 100%  /* 0% opacity */)`
        }}
      />

      <header className="absolute inset-x-0 bottom-2 flex items-baseline justify-between px-6 py-2 md:bottom-6 md:px-12">
        <div
          className="flex flex-col leading-snug text-white"
          style={{ textShadow: '0 0.25em 0.25em rgba(0,0,0,0.4)' }}
        >
          <h2 className="text-xl font-semibold md:text-2xl">{collaboration.name}</h2>
        </div>
        <span
          className="inline-flex items-center gap-2 p-2 font-medium text-white transition duration-300 ease-in-out group-hover:underline group-hover:underline-offset-4 md:text-lg"
          style={{ textShadow: '0 0.25em 0.25em rgba(0,0,0,0.4)' }}
        >
          Cop now{' '}
          <Icon
            icon="flowbite:arrow-right-outline"
            className="text-xl group-hover:animate-bump md:text-2xl"
          />
        </span>
      </header>

      <Image
        alt={collaboration.name || ''}
        src={cover.url!}
        width={cover.width!}
        height={cover.height!}
        loading="lazy"
      />
    </Link>
  )
}

export default CollabCover
