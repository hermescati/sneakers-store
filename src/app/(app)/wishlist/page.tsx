'use client'

import MainContainer from '@/components/MainContainer'
import Button from '@/components/base/button/Button'
import toast from '@/components/base/toast/Toast'
import ProductTile from '@/components/product/ProductTile'
import ProductTileSkeleton from '@/components/product/skeletons/ProductTileSkeleton'
import { getWishlistedProducts, wishlistProduct } from '@/services/products'
import { useUserStore } from '@/stores/userStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// TODO: Implement add-to-cart & empty state
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
      return getWishlistedProducts(user.id)
    },
    enabled: !!user?.id
  })

  const products = response?.data

  const { mutate: removeFromWishlist } = useMutation({
    mutationFn: (productId: string) => {
      if (!user?.id) return Promise.reject('User ID is missing')
      return wishlistProduct(user.id, productId)
    },
    onSuccess: data => {
      client.invalidateQueries({ queryKey: ['wishlist', user?.id] })
      toast.warning(data.message)
    },
    onError: err => {
      console.error('Error updating wishlist:', err)
    }
  })

  return (
    <MainContainer className="flex flex-col gap-5 py-6 lg:py-8">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <div className="flex w-full flex-col sm:w-fit">
          <h2 className="text-2xl font-bold leading-snug">My Wishlist</h2>
          <h3 className="text-md font-medium text-primary-600">
            {products?.length} item{products?.length && products?.length > 1 ? '(s)' : ''}
          </h3>
        </div>

        <div className="flex items-center gap-2 place-self-start sm:place-self-center">
          <Button
            variant="ghost"
            label="Remove all"
            size="small"
            iconPrepend="solar:trash-bin-trash-outline"
            iconClass="text-xl"
            className="order-2 py-3 text-primary-600 hover:text-danger active:text-danger dark:font-semibold sm:order-1"
          />
          <Button
            label="Add all to cart"
            size="small"
            iconPrepend="solar:bag-4-outline"
            iconClass="text-xl"
            className="order-1 py-3 sm:order-2"
          />
        </div>
      </div>

      {isLoading || isFetching ? (
        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, idx) => (
            <ProductTileSkeleton key={idx} />
          ))}
        </ul>
      ) : products && products.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {products.map(product => (
            <ProductTile
              key={product.id}
              product={product}
              onAction={() => console.log('added')}
              onRemove={productId => removeFromWishlist(productId)}
            />
          ))}
        </ul>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </MainContainer>
  )
}

export default Wishlist
