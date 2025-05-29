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
    <div className="group flex w-full flex-col gap-2">
      <div className="relative aspect-auto rounded-2xl bg-primary-100 px-5 dark:bg-primary-700">
        <IconButton
          icon="tabler-x"
          className="absolute left-2 top-2 z-10 p-1.5 hover:bg-primary-300 hover:text-danger active:bg-primary-300 dark:text-primary-300 dark:hover:bg-primary-600"
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

      <div className="flex w-full flex-col gap-0.5 lg:gap-0">
        <h3 className="line-clamp-1 font-semibold">{name}</h3>
        <span className="text-md font-medium text-primary-600">
          {category} (US) - {size}
        </span>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-lg font-semibold">{formatPrice(discountedPrice)}</span>
          {isDiscounted && (
            <span className="text-md text-primary-600 line-through">{formatPrice(basePrice)}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default DetailedCartItem
