'use client'

import Button from '@/components/base/Button'
import { Collection } from '@/types/payload'
import { darkenHexColor } from '@/utils/colors'
import { useColor } from 'color-thief-react'
import Image from 'next/image'
import { useMediaQuery } from 'usehooks-ts'

const CollectionCover = ({ collection }: { collection: Collection }) => {
    const collectionCover =
        typeof collection.image === 'string'
            ? collection.image
            : (collection.image?.url as string)

    const { data } = useColor(collectionCover, 'hex')
    const dominantColor = data ? darkenHexColor(data, 35) : '#000000'

    const isMobile = useMediaQuery('(max-width: 1024px)')

    return (
        <div className="relative w-full aspect-video xl:aspect-[3/2] rounded-2xl overflow-clip">
            {/* Gradient Overlay */}
            <div
                className="absolute inset-x-0 min-h-full z-10"
                style={{
                    background: `linear-gradient( ${isMobile ? "to top" : "to bottom"},
                        ${dominantColor}FF 0%,   /* 100% opacity */
                        ${dominantColor}BF 15%,  /* 75% opacity */
                        ${dominantColor}26 75%,  /* 15% opacity */
                        ${dominantColor}00 100%  /* 0% opacity */)`
                }}
            />

            {/* Header Section */}
            <header className="absolute inset-x-0 bottom-0 lg:top-0 z-10 flex justify-between items-end lg:items-start p-6 lg:p-10">
                <div className="flex flex-col leading-snug text-white" style={{ textShadow: "0 0.25em 0.25em rgba(0,0,0,0.4)" }}>
                    <h3 className="font-medium">
                        {typeof collection.brand === "string" ? collection.brand : collection.brand.name}
                    </h3>
                    <h2 className="font-semibold text-2xl">
                        {collection.name}
                    </h2>
                </div>
                <Button
                    variant="ghost"
                    label="Cop now"
                    iconAppend="solar:arrow-right-linear"
                    href={`/sneakers?collection=${collection.id}`}
                    className="hover:underline hover:underline-offset-4"
                />
            </header>

            {/* Image */}
            <Image
                alt={collection.name}
                src={collectionCover || ""}
                fill
                loading="lazy"
                className="w-full h-full object-cover object-center"
            />
        </div>
    )
}

export default CollectionCover
