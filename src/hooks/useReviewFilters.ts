'use client'

import { ReviewFilters, SortOrder } from '@/types'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { REVIEW_SORT_OPTIONS } from '@/lib/options'

export const useReviewFilters = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const filters: ReviewFilters = useMemo(() => {
    const rating = searchParams.get('rating')
    const sortField = searchParams.get('sort')
    const sortOrder = searchParams.get('order')

    let defaultSort: string | undefined = undefined
    let defaultOrder: SortOrder | undefined = undefined
    if (REVIEW_SORT_OPTIONS.length > 0) {
      const [field, order] = REVIEW_SORT_OPTIONS[0].value.split('|')
      defaultSort = field
      defaultOrder = order as SortOrder
    }

    return {
      rating: rating ? Number(rating) : null,
      sort: sortField ?? defaultSort,
      order: (sortOrder as SortOrder) ?? defaultOrder
    }
  }, [searchParams])

  const setFilters = useCallback(
    ({ rating, sort, order }: Partial<ReviewFilters>) => {
      const params = new URLSearchParams(searchParams.toString())

      if (rating !== undefined) {
        if (rating !== null) params.set('rating', String(rating))
        else params.delete('rating')
      }

      if (sort !== undefined) {
        if (sort) params.set('sort', sort)
        else params.delete('sort')
      }

      if (order !== undefined) {
        if (order) params.set('order', order)
        else params.delete('order')
      }

      router.replace(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams]
  )

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('rating')
    params.delete('sort')
    params.delete('order')
    router.replace(`?${params.toString()}`, { scroll: false })
  }

  return { filters, setFilters, resetFilters }
}
