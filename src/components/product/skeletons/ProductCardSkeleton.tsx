const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col gap-3 w-full">
      <div className="relative flex bg-skeleton rounded-2xl aspect-square sm:aspect-video py-[4.2rem]">
        <div className="h-full w-full" />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <span className="h-5 bg-skeleton rounded-md w-3/4" />
        <span className="h-4 bg-skeleton rounded-md w-3/5" />
        <span className="h-5 bg-skeleton rounded-md w-1/4" />
      </div>
    </div>
  )
}

export default ProductCardSkeleton
