const ProductCardSkeleton = () => {
  return (
    <div className="flex w-full animate-pulse flex-col gap-3">
      <div className="relative flex aspect-square rounded-2xl bg-skeleton sm:aspect-video">
        <div className="h-full w-full" />
      </div>

      <div className="flex w-full flex-col gap-2">
        <span className="h-5 w-3/4 rounded-md bg-skeleton" />
        <span className="h-4 w-3/5 rounded-md bg-skeleton" />
        <span className="h-5 w-1/4 rounded-md bg-skeleton" />
      </div>
    </div>
  )
}

export default ProductCardSkeleton
