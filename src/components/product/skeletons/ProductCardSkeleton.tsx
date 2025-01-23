const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col gap-3 w-full">
      <div className="relative flex bg-zinc-200/75 rounded-2xl aspect-square sm:aspect-video py-[4.2rem]">
        <div className="h-full w-full" />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <div className="h-5 bg-zinc-200/75 rounded w-3/4"></div>
        <div className="h-4 bg-zinc-200/75 rounded w-3/5"></div>
        <div className="h-[1.45rem] bg-zinc-200/75 rounded w-1/4"></div>
      </div>
    </div>
  )
}

export default ProductCardSkeleton
