interface CartItemSkeletonProps {
  compact?: boolean
}

const CartItemSkeleton = ({ compact = false }: CartItemSkeletonProps) => {
  if (compact) {
    return (
      <div className="flex animate-pulse items-center gap-4 py-4 lg:px-5">
        <span className="aspect-[4/3] w-32 rounded-xl bg-skeleton" />

        <div className="flex w-full items-stretch justify-between gap-x-4 lg:gap-x-4">
          <div className="flex w-full flex-col gap-2.5">
            <div className="flex flex-col gap-1">
              <span className="h-5 w-3/4 rounded-md bg-skeleton" />
              <span className="h-4 w-1/3 rounded-md bg-skeleton" />
            </div>
            <span className="h-5 w-1/5 rounded-md bg-skeleton" />
          </div>

          <div className="flex h-fit">
            <span className="h-8 w-8 rounded-full bg-skeleton" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full animate-pulse flex-col gap-3">
      <div className="relative flex aspect-square rounded-2xl bg-skeleton py-[4.2rem] sm:aspect-video">
        <span className="h-full w-full" />
      </div>

      <div className="flex w-full flex-col gap-2">
        <span className="h-5 w-3/4 rounded-md bg-skeleton" />
        <span className="h-4 w-1/3 rounded-md bg-skeleton" />
        <span className="h-5 w-1/5 rounded-md bg-skeleton" />
      </div>
    </div>
  )
}

export default CartItemSkeleton
