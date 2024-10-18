'use client'

import Button from '@/components/base/Button'
import { Collection } from '@/types/payload'
import { darkenHexColor } from '@/utils/colors'
import { useColor } from 'color-thief-react'
import Image from 'next/image'

const CollectionCover = ({ collection }: { collection: Collection }) => {
  const collectionCover =
    typeof collection.image === 'string'
      ? collection.image
      : (collection.image?.url as string)

  const { data } = useColor(collectionCover, 'hex')
  const dominantColor = data ? darkenHexColor(data, 25) : '#000000'

  return (
    <>
      {/* Gradient Overlay */}
      <div
        className="absolute inset-x-0 min-h-full z-10"
        style={{
          background: `linear-gradient( to bottom,
            ${dominantColor}FF 0%,   /* 100% opacity */
            ${dominantColor}BF 15%,  /* 75% opacity */
            ${dominantColor}26 75%,  /* 15% opacity */
            ${dominantColor}00 100%  /* 0% opacity */
          )`
        }}
      />

      {/* Header Section */}
      <header className="absolute inset-x-0 top-0 z-10 flex justify-between items-start p-8 md:p-12 lg:px-16 lg:py-12">
        <div className="flex flex-col md:gap-1 text-background">
          <h3
            className="font-medium text-md md:font-semibold md:text-lg"
            style={{ textShadow: '0 0.25em 0.25em rgba(0,0,0,0.4)' }}
          >
            {collection.name}
          </h3>
          <h2
            className="font-semibold text-lg md:text-2xl"
            style={{ textShadow: '0 0.25em 0.25em rgba(0,0,0,0.4)' }}
          >
            {collection.name}
          </h2>
        </div>
        <Button
          variant="ghost"
          label="Cop now"
          iconAppend="solar:arrow-right-linear"
          href={`/sneakers?collection=${collection.id}`}
          style={{ textShadow: '0 0.25em 0.25em rgba(0,0,0,0.4)' }}
          className="text-white hover:bg-primary-900/20 active:bg-primary-900/20 hover:underline hover:underline-offset-4"
        />
      </header>

      {/* Image */}
      <Image
        alt={collection.name}
        src={collectionCover || ''}
        fill
        priority
        className="w-full h-full object-cover object-center"
      />
    </>
  )
}

export default CollectionCover
