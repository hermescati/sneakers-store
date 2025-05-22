'use client'

import MainContainer from '@/components/MainContainer'
import Icon from '@/components/base/Icon'
import Button from '@/components/base/button/Button'
import toast from '@/components/base/toast/Toast'
import ProductTile from '@/components/product/ProductTile'
import ProductTileSkeleton from '@/components/product/skeletons/ProductTileSkeleton'
import routes from '@/lib/routes'
import { clearWishlist, getWishlistItems, removeFromWishlist } from '@/services/wishlist'
import { useUserStore } from '@/stores/userStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import EmptyBox from '../../../../public/empty/empty-box.svg'

// TODO: Implement add-to-cart functionality
const Wishlist = () => {
  const { user } = useUserStore()
  const client = useQueryClient()

  const {
    data: response,
    isLoading,
    isPending: isFetching
  } = useQuery({
    queryKey: ['wishlist', user?.id],
    queryFn: () => {
      if (!user?.id) return Promise.reject('User ID is missing')
      return getWishlistItems(user.id)
    },
    enabled: !!user?.id
  })

  const products = response?.data ?? []
  const hasItems = products && products?.length > 0

  const { mutate: removeItem } = useMutation({
    mutationFn: (productId: string) => {
      if (!user?.id) return Promise.reject('User ID is missing')
      return removeFromWishlist(user.id, productId)
    },
    onSuccess: data => {
      client.invalidateQueries({ queryKey: ['wishlist', user?.id] })
      toast.warning(data.message)
    },
    onError: err => {
      console.error('Error updating wishlist:', err)
    }
  })

  const { mutate: removeAll, isPending: isClearing } = useMutation({
    mutationFn: () => {
      if (!user?.id) return Promise.reject('User ID is missing')
      return clearWishlist(user.id)
    },
    onSuccess: data => {
      client.invalidateQueries({ queryKey: ['wishlist', user?.id] })
      toast.success(data.message || 'Wishlist cleared')
    },
    onError: err => {
      console.error('Error clearing wishlist:', err)
      toast.error('Failed to clear wishlist')
    }
  })

  if (isLoading || isFetching) {
    return (
      <MainContainer className="flex flex-col gap-5 py-6 lg:py-8">
        <h2 className="mb-5 text-2xl font-bold leading-snug">My Wishlist</h2>
        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, idx) => (
            <ProductTileSkeleton key={idx} />
          ))}
        </ul>
      </MainContainer>
    )
  }

  if (!hasItems) {
    return (
      <MainContainer className="flex flex-col gap-5 py-6 lg:py-8">
        <h2 className="mb-5 text-2xl font-bold leading-snug">My Wishlist</h2>
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <div className="relative">
            <EmptyBox width="10rem" height="10rem" />
            <Icon
              icon="line-md:heart-filled"
              className="absolute right-5 top-1 rotate-6 text-3xl text-secondary"
            />
          </div>
          <div className="flex flex-col items-center gap-6">
            <div>
              <h3 className="text-2xl font-semibold">Your Wishlist is Empty</h3>
              <p className="text-primary-600">
                Tap the heart button to start saving your favorite items.
              </p>
            </div>
            <Button
              href={routes.products.home}
              variant="outline"
              label="Add Now"
              className="w-fit hover:underline hover:underline-offset-4"
            />
          </div>
        </div>
      </MainContainer>
    )
  }

  return (
    <MainContainer className="flex flex-col gap-5 py-6 lg:py-8">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <div className="flex w-full flex-col sm:w-fit">
          <h2 className="text-2xl font-bold leading-snug">My Wishlist</h2>
          <h3 className="text-md font-medium text-primary-600">
            {products.length} item{products.length > 1 ? 's' : ''}
          </h3>
        </div>

        <div className="flex items-center gap-2 place-self-start sm:place-self-center">
          <Button
            variant="ghost"
            size="small"
            label="Remove all"
            disabled={isClearing}
            iconPrepend="solar:trash-bin-trash-outline"
            iconClass="text-xl"
            className="order-2 py-3 text-primary-600 hover:text-danger active:text-danger dark:font-semibold sm:order-1"
            onClick={() => removeAll()}
          />
          <Button
            size="small"
            label="Add all to cart"
            iconPrepend="solar:bag-4-outline"
            iconClass="text-xl"
            className="order-1 py-3 sm:order-2"
          />
        </div>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {products.map(product => (
          <ProductTile
            key={product.id}
            product={product}
            onAction={() => console.log('added')}
            onRemove={productId => removeItem(productId)}
          />
        ))}
      </ul>
    </MainContainer>
  )
}

export default Wishlist
