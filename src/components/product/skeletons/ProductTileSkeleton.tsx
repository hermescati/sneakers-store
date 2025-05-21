const ProductTileSkeleton = () => {
  return (
    <div className="flex w-full animate-pulse gap-x-6 sm:flex-col">
      <div className="relative flex aspect-square w-2/3 rounded-2xl bg-skeleton sm:w-full lg:aspect-video">
        <div className="h-full w-full" />
      </div>

      <div className="flex w-full flex-col justify-between gap-2 py-2.5 lg:gap-2.5">
        <div className="flex flex-col gap-1">
          <span className="h-6 w-3/4 rounded-md bg-skeleton" />
          <span className="h-5 w-2/5 rounded-md bg-skeleton" />
        </div>

        <div className="flex items-end justify-between align-bottom">
          <span className="h-7 w-1/4 rounded-md bg-skeleton" />

          <div className="flex items-center gap-1">
            <span className="aspect-square h-11 rounded-full bg-skeleton lg:hidden" />
            <span className="hidden h-10 w-36 rounded-xl bg-skeleton lg:block" />
            <span className="aspect-square h-11 rounded-full bg-skeleton md:hidden" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTileSkeleton
