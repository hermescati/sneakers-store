const ReviewItemSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col gap-2 px-2 py-6 first:pt-0 last:pb-2">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="h-10 w-10 rounded-full bg-skeleton" />

          {/* Name and date */}
          <div className="space-y-1.5">
            <div className="h-4 w-24 rounded bg-skeleton" />
            <div className="h-3 w-16 rounded-full bg-skeleton" />
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="h-5 w-5 rounded-md bg-skeleton" />
          <div className="h-5 w-12 rounded-md bg-skeleton" />
        </div>
      </div>

      {/* Comment */}
      <div className="space-y-2">
        <div className="h-4 w-1/6 rounded-md bg-skeleton" />
        <div className="h-4 w-full rounded-md bg-skeleton" />
        <div className="h-4 w-5/6 rounded-md bg-skeleton" />
        <div className="h-4 w-4/6 rounded-md bg-skeleton" />
      </div>
    </div>
  )
}

export default ReviewItemSkeleton
