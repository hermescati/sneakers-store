import Icon from '@/components/base/Icon'

interface EmptyReviewsProps {
  variant?: 'no-reviews' | 'no-matches'
}

const EmptyReviews = ({ variant = 'no-reviews' }: EmptyReviewsProps) => {
  if (variant === 'no-matches') {
    return (
      <div className="flex h-72 flex-col items-center justify-center p-8 text-center lg:h-full">
        <Icon
          icon="solar:star-fall-bold"
          className="mb-4 text-5xl text-primary-300 dark:text-secondary-300"
        />
        <h3 className="text-lg font-semibold lg:text-xl">No matching reviews</h3>
        <p className="font-medium text-primary-600 dark:text-primary-700">
          Try adjusting your filters to discover what others are saying
        </p>
      </div>
    )
  }

  return (
    <div className="flex min-h-72 flex-col items-center justify-center p-8 text-center 2xl:min-h-96">
      <Icon
        icon="solar:star-fall-bold"
        className="mb-4 text-5xl text-primary-300 dark:text-secondary-300"
      />
      <h3 className="text-lg font-semibold lg:text-xl">No reviews yet</h3>
      <p className="font-medium text-primary-600 dark:text-primary-700">
        Grab a pair and be the first to drop your thoughts
      </p>
    </div>
  )
}

export default EmptyReviews
