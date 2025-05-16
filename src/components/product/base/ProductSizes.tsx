'use client'

import Button from '@/components/base/button/Button'
import IconButton from '@/components/base/button/IconButton'
import toast from '@/components/base/toast/Toast'
import { SIZING_CATEGORY_OPTIONS } from '@/lib/options'
import routes from '@/lib/routes'
import { checkWishlistStatus, wishlistProduct } from '@/services/products'
import { useCartStore } from '@/stores/cartStore'
import { useUserStore } from '@/stores/userStore'
import { SelectedSize } from '@/types'
import { Product } from '@/types/payload'
import { cn } from '@/utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import NotifyForm from './NotifyForm'
import SizeGuides from './SizeGuides'

interface SizeBoxProps {
  size: number
  stock: number
  selected: boolean
  onSelect: VoidFunction
}

const SizeBox = ({ size, stock, selected, onSelect }: SizeBoxProps) => {
  const baseStyle = `
    flex items-center justify-center p-4
    rounded-xl border border-border 
    bg-background 
    font-semibold text-primary-700
    disabled:opacity-40 disabled:cursor-not-allowed
    enabled:hover:border-primary-400
    cursor-pointer transition-color ease-in-out duration-300
  `

  return (
    <button
      disabled={!stock}
      className={cn(baseStyle, {
        'border-none bg-primary-900 text-background shadow-[0_2px_8px_-2px_rgba(var(--primary-800),0.35)]':
          selected
      })}
      onClick={onSelect}
    >
      {size}
    </button>
  )
}

interface ProductSizeProps {
  product: Product
  selectedSize: SelectedSize
  setSelectedSize: (size: SelectedSize) => void
}

const ProductSizes = ({ product, selectedSize, setSelectedSize }: ProductSizeProps) => {
  const router = useRouter()
  const { addItem } = useCartStore()
  const { user } = useUserStore()
  const queryClient = useQueryClient()

  const { data: isWishlisted, isLoading } = useQuery({
    queryKey: ['wishlist', user?.id, product.id],
    queryFn: () => checkWishlistStatus(user!.id, product.id),
    enabled: !!user
  })

  const {
    mutate: toggleWishlist,
    isPending,
    reset
  } = useMutation({
    mutationFn: () => wishlistProduct(user!.id, product.id),
    onSuccess: data => {
      if (data.data === 'added') {
        toast.success(data.message)
      } else if (data.data === 'removed') {
        toast.warning(data.message)
      }
      queryClient.invalidateQueries({ queryKey: ['wishlist', user?.id, product.id] })
      reset()
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.')
      reset()
    }
  })

  const handleWishlistClick = () => {
    if (!user) {
      localStorage.setItem(
        'deferredAction',
        JSON.stringify({
          type: 'wishlist',
          productId: product.id
        })
      )
      return router.push(`${routes.auth.login}?origin=sneakers/${product.slug}`)
    }
    toggleWishlist()
  }

  useEffect(() => {
    if (!user || isLoading || isWishlisted === undefined) return

    try {
      const defAction = localStorage.getItem('deferredAction')
      if (!defAction) return

      const action = JSON.parse(defAction)
      if (action.type === 'wishlist' && action.productId === product.id) {
        if (!isWishlisted) {
          toggleWishlist()
        }
        localStorage.removeItem('deferredAction')
      }
    } catch {
      localStorage.removeItem('deferredAction')
    }
  }, [user, product.id, isWishlisted, isLoading, toggleWishlist])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-lg">
          {`Sizes - US ${SIZING_CATEGORY_OPTIONS.find(o => o.value === product.size_category)?.label}`}
        </h4>
        <div className="md:hidden">
          <SizeGuides />
        </div>
      </div>

      <ul className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 lg:grid-cols-4 xl:grid-cols-6 gap-2">
        {product.stock.map(item => (
          <SizeBox
            key={item.id}
            size={item.size}
            stock={item.quantity}
            selected={item.id === selectedSize?.id}
            onSelect={() => setSelectedSize(item)}
          />
        ))}
      </ul>

      <div className="hidden md:block">
        <SizeGuides />
      </div>

      <div className="flex gap-2 items-center mt-4">
        <Button
          disabled={!selectedSize}
          label="Add to cart"
          iconPrepend="solar:cart-large-minimalistic-linear"
          onClick={() => addItem(product, selectedSize)}
          className="w-full"
        />
        <IconButton
          icon={
            isLoading
              ? 'solar:heart-outline'
              : isWishlisted
                ? 'solar:heart-bold'
                : 'solar:heart-outline'
          }
          disabled={isPending}
          className="h-full aspect-square rounded-2xl bg-primary-200 hover:bg-primary-100"
          iconClass={isWishlisted ? 'dark:text-secondary' : ''}
          onClick={handleWishlistClick}
        />
      </div>

      <NotifyForm />
    </div>
  )
}

export default ProductSizes
