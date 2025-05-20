'use client'

import MainContainer from '@/components/MainContainer'
import { getWishlistedProducts } from '@/services/products'
import { useUserStore } from '@/stores/userStore'
import { useQuery } from '@tanstack/react-query'

const Wishlist = () => {
  const { user } = useUserStore()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['wishlist', user?.id],
    queryFn: () => {
      if (!user?.id) {
        return Promise.reject('User ID is missing')
      }
      return getWishlistedProducts(user.id)
    },
    enabled: !!user?.id
  })
  const products = data?.data

  if (isLoading) {
    return (
      <MainContainer className="py-6 lg:py-8">
        <p>Loading...</p>
      </MainContainer>
    )
  }

  if (isError) {
    return (
      <MainContainer className="py-6 lg:py-8">
        <p>Something went wrong. Please try again later.</p>
      </MainContainer>
    )
  }

  return (
    <MainContainer className="flex flex-col gap-10 py-6 lg:py-8">
      <p className="text-xl font-semibold">Wishlist Items</p>
      {products && products?.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(product => (
            <li key={product.id} className="border p-4 rounded-lg">
              <p>{product.nickname}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </MainContainer>
  )
}

export default Wishlist
