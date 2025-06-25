'use client'

import Icon from '@/components/base/Icon'
import Select from '@/components/base/input/Select'
import { REVIEW_SORT_OPTIONS } from '@/lib/options'
import { SortOrder, ReviewFilters as TReviewFilters } from '@/types'
import { cn } from '@/utils'
import { useRef, useEffect, useState } from 'react'

interface ReviewFiltersProps {
  filters: TReviewFilters
  setFilters: (filters: TReviewFilters) => void
}

const ReviewFilters = ({ filters, setFilters }: ReviewFiltersProps) => {
  const [showLeftFade, setShowLeftFade] = useState(false)
  const [showRightFade, setShowRightFade] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const el = scrollRef.current
      if (!el) return
      setShowLeftFade(el.scrollLeft > 0)
      setShowRightFade(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
    }
    handleScroll()
    const el = scrollRef.current
    if (el) {
      el.addEventListener('scroll', handleScroll)
      window.addEventListener('resize', handleScroll)
    }
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-end">
      <div className="relative md:w-2/3 lg:w-[70%]">
        <div
          className={cn(
            'pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-background to-transparent transition-opacity duration-300 ease-linear dark:from-zinc-900',
            showLeftFade ? 'opacity-100' : 'opacity-0'
          )}
        />
        <div
          className={cn(
            'pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-background to-transparent transition-opacity duration-300 ease-linear dark:from-zinc-900',
            showRightFade ? 'opacity-100' : 'opacity-0'
          )}
        />
        <div ref={scrollRef} className="no-scrollbar flex gap-2 overflow-x-auto">
          <button
            className={cn(
              'inline-flex items-center justify-center rounded-full border border-border px-5 py-2 text-md font-semibold transition-all hover:bg-primary-100',
              {
                'border-primary-900 bg-primary-900 text-background hover:bg-primary-900':
                  filters.rating === null || filters.rating === undefined
              }
            )}
            onClick={() => setFilters({ ...filters, rating: null })}
          >
            All
          </button>
          {Array.from({ length: 5 }, (_, i) => 1 + i).map(star => (
            <button
              key={star}
              className={cn(
                'inline-flex items-center justify-center gap-0.5 rounded-full border border-border py-2 pl-3 pr-4 text-md font-semibold transition-all hover:bg-primary-100',
                {
                  'border-primary-900 bg-primary-900 text-background hover:bg-primary-900':
                    filters.rating === star
                }
              )}
              onClick={() => setFilters({ ...filters, rating: star })}
            >
              <Icon
                icon="mingcute:star-fill"
                className="text-xl text-warning-300 dark:text-warning-600"
              />
              <p className="mt-0.5">{star}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 md:w-1/3 lg:w-full">
        <Select
          id="reviews-sort"
          placeholder="Sort By"
          options={REVIEW_SORT_OPTIONS}
          selected={
            filters.sort
              ? filters.order
                ? [`${filters.sort}|${filters.order}`]
                : [filters.sort]
              : []
          }
          position="bottom-right"
          onChange={([selected]) => {
            const [field, order] = selected.split('|')
            setFilters({ sort: field, order: order as SortOrder })
          }}
        />
      </div>
    </div>
  )
}

export default ReviewFilters
