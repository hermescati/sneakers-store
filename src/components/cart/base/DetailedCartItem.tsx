'use client'

import IconButton from '@/components/base/button/IconButton'
import { Media } from '@/types/payload'
import { formatPrice } from '@/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import CartItemSkeleton from '../skeletons/CartItemSkeleton'

interface DetailedCartItemProps {
  index: number
  name: string
  nickname: string
  thumbnail: Media
  category: string
  size: number
  basePrice: number
  discountedPrice: number
  onRemove: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const DetailedCartItem = ({
  name,
  nickname,
  thumbnail,
  category,
  size,
  basePrice,
  discountedPrice,
  index,
  onRemove
}: DetailedCartItemProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const isDiscounted = discountedPrice !== basePrice

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, index * 75)

    return () => clearTimeout(timer)
  }, [index])

  if (!isLoaded) return <CartItemSkeleton />

  return (
    <div className="flex flex-col gap-2 w-full group">
      <div className="relative px-5 bg-primary-100 dark:bg-primary-700 rounded-2xl aspect-auto">
        <IconButton
          icon="tabler-x"
          className="absolute top-2 left-2 z-10 p-1.5 dark:text-primary-300 hover:text-danger hover:bg-primary-300 dark:hover:bg-primary-600 active:bg-primary-300"
          onClick={onRemove}
        />
        <Image
          alt={`${nickname} thumbnail`}
          src={thumbnail.url!}
          width={thumbnail.width!}
          height={thumbnail.height!}
          loading="lazy"
          className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-0.5 lg:gap-0 w-full">
        <h3 className="font-semibold line-clamp-1">{name}</h3>
        <span className="font-medium text-primary-600 text-md">
          {category} (US) - {size}
        </span>

        <div className="flex items-baseline gap-2 mt-1">
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
