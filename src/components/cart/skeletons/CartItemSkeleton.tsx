interface CartItemSkeletonProps {
  compact?: boolean
}

const CartItemSkeleton = ({ compact = false }: CartItemSkeletonProps) => {
  if (compact) {
    return (
      <div className="animate-pulse flex items-center gap-4 py-4 lg:px-5">
        <span className="aspect-[4/3] bg-skeleton rounded-xl w-32" />

        <div className="flex w-full items-stretch justify-between gap-x-4 lg:gap-x-4">
          <div className="flex flex-col gap-2.5 w-full">
            <div className="flex flex-col gap-1">
              <span className="h-5 bg-skeleton rounded-md w-3/4" />
              <span className="h-4 bg-skeleton rounded-md w-1/3" />
            </div>
            <span className="h-5 bg-skeleton rounded-md w-1/5" />
          </div>

          <div className="flex h-fit">
            <span className="w-8 h-8 bg-skeleton rounded-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-pulse flex flex-col gap-3 w-full">
      <div className="relative flex bg-skeleton rounded-2xl aspect-square sm:aspect-video py-[4.2rem]">
        <span className="h-full w-full" />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <span className="h-5 bg-skeleton rounded-md w-3/4" />
        <span className="h-4 bg-skeleton rounded-md w-1/3" />
        <span className="h-5 bg-skeleton rounded-md w-1/5" />
      </div>
    </div>
  )
}

export default CartItemSkeleton
