'use client'

import Icon from '@/components/base/Icon'
import ProgressBar from '@/components/base/ProgressBar'
import Rating from '@/components/base/Rating'
import { ProductReviewSummary } from '@/types'
import ReviewSummarySkeleton from '../skeletons/ReviewSummarySkeleton'

interface ReviewSummaryProps {
  summary?: ProductReviewSummary
}

const ReviewSummary = ({ summary }: ReviewSummaryProps) => {
  if (!summary) return <ReviewSummarySkeleton />

  const recommendedPercent =
    summary.totalReviews > 0 ? (summary.recommendedCount / summary.totalReviews) * 100 : 0

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-stretch justify-evenly lg:flex-col lg:gap-y-6 2xl:flex-row">
        <div className="w-full space-y-0.5">
          <div className="flex items-baseline gap-1">
            <h1 className="text-3xl font-bold leading-none md:text-6xl 2xl:text-7xl">
              {summary?.avgRating.toFixed(1)}
            </h1>
            <span className="hidden items-center gap-1 text-xl font-bold text-secondary md:flex">
              <p>/ 5</p>
            </span>
          </div>
          <Rating rating={summary?.avgRating} className="text-2xl" />
          <p className="font-medium text-primary-600 dark:text-primary-700">
            ({summary?.totalReviews} reviews)
          </p>
        </div>

        <div className="flex w-full items-center gap-5">
          <div className="hidden md:block">
            <ProgressBar
              percentage={recommendedPercent}
              shape="circle"
              size="lg"
              activeColor="bg-secondary-500"
              textColor="text-secondary-300"
            >
              <Icon icon="solar:medal-ribbons-star-bold" className="text-3xl" />
            </ProgressBar>
          </div>
          <div className="flex h-full w-full flex-col justify-between gap-y-1 md:justify-center">
            <span className="inline-flex items-baseline gap-1">
              <p className="text-3xl font-bold leading-none">{summary.recommendedCount}</p>
              <p className="font-medium text-primary-600">out of {summary.totalReviews}</p>
            </span>
            <div className="md:hidden">
              <ProgressBar percentage={recommendedPercent} size="md" />
            </div>
            <p className="font-medium leading-snug text-primary-600 dark:text-primary-700 md:text-primary-800 md:dark:text-foreground">
              sneakerheads say yes
            </p>
          </div>
        </div>
      </div>

      <div className="w-full space-y-2">
        {Array.from({ length: 5 }, (_, i) => 5 - i).map(star => {
          const count = summary?.ratingCounts[star] || 0
          const percentage = summary?.totalReviews > 0 ? (count / summary?.totalReviews) * 100 : 0

          return (
            <div key={star} className="flex items-center gap-8">
              <span className="inline-flex w-10 items-center gap-1.5 text-lg font-semibold">
                <Icon
                  icon="mingcute:star-fill"
                  className="text-xl text-warning-300 dark:text-warning-600"
                />
                {star.toFixed(1)}
              </span>
              <ProgressBar percentage={percentage} size="md" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ReviewSummary
