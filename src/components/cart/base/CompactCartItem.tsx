'use client'

import IconButton from '@/components/base/button/IconButton'
import CartItemSkeleton from '@/components/cart/skeletons/CartItemSkeleton'
import { Media } from '@/types/payload'
import { formatPrice } from '@/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

interface CompactCartItemProps {
  index: number
  name: string
  category: string
  size: number
  price: number
  thumbnail: Media
  onRemove: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const CompactCartItem = ({
  index,
  name,
  category,
  size,
  price,
  thumbnail,
  onRemove
}: CompactCartItemProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const isMobile = useMediaQuery('(max-width: 1023px)')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, index * 75)

    return () => clearTimeout(timer)
  }, [index])

  if (!isLoaded) return <CartItemSkeleton compact />

  return (
    <div className="flex items-center gap-5 py-4 lg:px-5">
      <div className="relative aspect-[4/3]">
        <Image
          alt={name}
          src={thumbnail.url!}
          width={thumbnail.width!}
          height={thumbnail.height!}
          className="object-contain rounded-xl"
        />
      </div>

      <div className="flex w-full items-stretch justify-between gap-x-4 lg:gap-x-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <h3 className="font-semibold">{name}</h3>
            <span className="font-medium text-primary-700 text-md">
              {category} (US) - {size}
            </span>
          </div>
          <span className="font-semibold">{formatPrice(price)}</span>
        </div>

        <IconButton
          icon={isMobile ? 'tabler-x' : 'solar:trash-bin-trash-linear'}
          className="h-fit p-2 text-xl hover:text-danger active:text-danger"
          onClick={onRemove}
        />
      </div>
    </div>
  )
}

export default CompactCartItem
