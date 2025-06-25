'use client'

import Button from '@/components/base/button/Button'
import { useReviewFilters } from '@/hooks/useReviewFilters'
import { getProductReviews, getReviewSummary } from '@/services/products'
import { Product } from '@/types/payload'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import EmptyReviews from '../empty/EmptyReviews'
import ReviewFilters from '../reviews/ReviewFilters'
import ReviewItem from '../reviews/ReviewItem'
import ReviewSummary from '../reviews/ReviewSummary'
import ReviewItemSkeleton from '../skeletons/ReviewItemSkeleton'

interface ProductReviewsProps {
  product: Product
}

const ProductReviews = ({ product }: ProductReviewsProps) => {
  const { filters, setFilters } = useReviewFilters()

  const {
    data: reviewsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: reviewsStatus
  } = useInfiniteQuery({
    queryKey: ['reviews', product.id, filters],
    queryFn: ({ pageParam = 1 }) => getProductReviews(product.id, filters, pageParam),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const nextPage = lastPage.metadata?.nextPage
      const totalPages = lastPage.metadata?.totalPages
      return nextPage && totalPages && nextPage <= totalPages ? nextPage : undefined
    },
    enabled: !!product.id
  })

  const { data: summaryData, status: summaryStatus } = useQuery({
    queryKey: ['review-summary', product.id],
    queryFn: () => getReviewSummary(product.id),
    enabled: !!product.id
  })

  const reviews = reviewsData?.pages.flatMap(page => page.data) ?? []
  const summary = summaryData?.data
  const hasReviews = (summary?.totalReviews ?? 0) > 0
  const isLoading = reviewsStatus === 'pending' || summaryStatus === 'pending'

  if (isLoading) {
    return (
      <section className="mt-5 grid grid-cols-1 items-start gap-8 lg:mt-3 lg:grid-cols-3 lg:gap-x-8 xl:gap-x-12">
        <div className="order-2 flex flex-col gap-3 lg:order-1 lg:col-span-2">
          <ReviewFilters filters={filters} setFilters={setFilters} />
          <div className="order-2 divide-y divide-border rounded-2xl border border-border p-4 pt-6">
            {Array.from({ length: 3 }, (_, i) => (
              <ReviewItemSkeleton key={i} />
            ))}
          </div>
        </div>
        <div className="order-1 self-start lg:sticky lg:top-36 lg:order-2">
          <ReviewSummary summary={summary} />
        </div>
      </section>
    )
  }

  if (!hasReviews) return <EmptyReviews />

  return (
    <section className="mt-5 grid grid-cols-1 items-start gap-8 lg:mt-3 lg:grid-cols-3 lg:gap-x-8 xl:gap-x-12">
      <div className="order-2 flex h-full flex-col gap-3 lg:order-1 lg:col-span-2">
        <ReviewFilters filters={filters} setFilters={setFilters} />

        {reviews.length === 0 ? (
          <EmptyReviews variant="no-matches" />
        ) : (
          <ul className="order-2 divide-y divide-border rounded-2xl border border-border p-2 pb-4 pt-4 md:p-4 md:pt-6">
            {reviews.map(review => (
              <ReviewItem key={review.id} review={review} />
            ))}
            {isFetchingNextPage && (
              <>
                {Array.from({ length: 3 }, (_, i) => (
                  <ReviewItemSkeleton key={i} />
                ))}
              </>
            )}
            {hasNextPage && (
              <li className="-mb-1 pt-3">
                <Button
                  variant="ghost"
                  size="small"
                  iconAppend="mage:chevron-down"
                  label="Load more reviews"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="w-full justify-start rounded-none p-2 underline underline-offset-4 hover:bg-transparent hover:text-secondary active:bg-transparent active:shadow-none"
                />
              </li>
            )}
          </ul>
        )}
      </div>

      <div className="order-1 self-start lg:sticky lg:top-36 lg:order-2">
        <ReviewSummary summary={summary} />
      </div>
    </section>
  )
}

export default ProductReviews
