const ReviewSummarySkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col gap-6">
      <div className="flex items-stretch justify-evenly lg:flex-col lg:gap-y-6 2xl:flex-row">
        {/* Rating */}
        <div className="w-full space-y-1">
          <div className="h-8 w-12 rounded-lg bg-skeleton md:h-16 md:w-24" />
          <div className="h-6 w-32 rounded-md bg-skeleton md:h-5" />
          <div className="h-4 w-16 rounded-md bg-skeleton" />
        </div>

        {/* Recommendation */}
        <div className="flex w-full items-center gap-5">
          <div className="hidden aspect-square h-24 w-24 rounded-full bg-skeleton md:block md:h-28 md:w-28" />
          <div className="flex h-full w-full flex-col justify-between gap-y-1 md:justify-center">
            <div className="h-8 w-12 rounded-md bg-skeleton" />
            <div className="h-3 w-full rounded-full bg-skeleton md:hidden" />
            <div className="h-4 max-w-32 rounded-md bg-skeleton" />
          </div>
        </div>
      </div>

      {/* Distribution */}
      <div className="w-full space-y-2">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="flex items-center gap-5">
            <div className="h-6 w-16 rounded-md bg-skeleton" />
            <div className="h-3 w-full rounded-full bg-skeleton" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewSummarySkeleton
