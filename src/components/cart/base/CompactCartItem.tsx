'use client'

import Button from '@/components/base/Button'
import CartItemSkeleton from '@/components/cart/skeletons/CartItemSkeleton'
import { formatPrice } from '@/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface DetailedCartItemProps {
  index: number
  name: string
  nickname: string
  category: string
  size: number
  price: number
  thumbnail: string
  onRemove: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const CompactCartItem = ({
  index,
  onRemove,
  ...props
}: DetailedCartItemProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, index * 75)

    return () => clearTimeout(timer)
  }, [index])

  if (!props.name || !isLoaded) return <CartItemSkeleton />

  return (
    <div className="flex items-center gap-6 py-3 lg:py-1 lg:px-5">
      <div className="aspect-square">
        <Image
          alt={props.name}
          src={props.thumbnail}
          height={80}
          width={120}
          className="h-full w-full object-contain rounded-md"
        />
      </div>
      <div className="flex w-full justify-between gap-x-4 lg:gap-x-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-medium leading-tight">{props.name}</h3>

          <span className="text-primary-700 text-md">
            {props.category} (US) - {props.size}
          </span>

          <span className="lg:hidden mt-2 font-semibold">
            {formatPrice(props.price)}
          </span>
        </div>

        <div className="flex lg:hidden flex-col justify-between items-end">
          <Button
            variant="ghost"
            size="icon"
            icon="tabler:x"
            onClick={onRemove}
            className="text-xl"
          />
        </div>

        <div className="hidden lg:flex flex-col justify-between items-end">
          <span className="font-semibold">{formatPrice(props.price)}</span>
          <span
            className="text-md text-primary-600 hover:text-danger hover:underline hover:underline-offset-4 cursor-pointer transition-all ease-in-out duration-300"
            onClick={onRemove}
          >
            Remove
          </span>
        </div>
      </div>
    </div>
  )
}

export default CompactCartItem
