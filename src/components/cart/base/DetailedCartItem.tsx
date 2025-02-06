'use client'

import IconButton from '@/components/base/IconButton'
import ProductCardSkeleton from '@/components/product/skeletons/ProductCardSkeleton'
import { formatPrice } from '@/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Props {
  index: number
  name: string
  nickname: string
  thumbnail: string
  category: string
  size: number
  basePrice: number
  discountedPrice: number
  onRemove: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const DetailedCartItem = ({
  discountedPrice,
  basePrice,
  index,
  ...props
}: Props) => {
  const isDiscounted = discountedPrice !== basePrice

  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, index * 75)

    return () => clearTimeout(timer)
  }, [index])

  if (!props.name || !isLoaded) return <ProductCardSkeleton />

  return (
    <div className="flex flex-col gap-2 w-full group">
      <div className="relative px-5 bg-zinc-100 rounded-2xl aspect-square sm:aspect-auto">
        <IconButton
          icon="tabler-x"
          className="absolute top-3 left-3 z-10 p-1.5 hover:text-danger hover:bg-primary-300 active:bg-primary-300"
          onClick={props.onRemove} />
        <Image
          alt={`${props.nickname} thumbnail`}
          src={props.thumbnail}
          width={400}
          height={300}
          loading="eager"
          priority
          className="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-0.5 lg:gap-0 w-full">
        <h3 className="font-semibold text-primary-800 line-clamp-1 text-lg">
          {props.name}
        </h3>

        <span className="flex items-center gap-2 text-md text-primary-600">
          &quot;{props.nickname}&quot;
        </span>

        <span className="text-primary-600 text-md">
          {props.category} (US) - {props.size}
        </span>

        {/* Price */}
        <div className="flex items-baseline gap-2 lg:mt-1">
          <span className="font-semibold text-lg">
            {formatPrice(discountedPrice)}
          </span>
          {isDiscounted && (
            <span className="text-md line-through text-primary-600">
              {formatPrice(basePrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default DetailedCartItem
