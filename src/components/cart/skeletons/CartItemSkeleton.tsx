const CartItemSkeleton = () => {
  return (
    <div className="animate-pulse flex items-center gap-3 py-4 lg:px-5 w-full">
      {/* Image */}
      <div className="aspect-video bg-zinc-200/75 rounded-xl w-36 h-18" />

      <div className="w-full flex justify-between gap-x-4 lg:gap-x-6">
        <div className="flex flex-col gap-1 w-full">
          {/* Name */}
          <div className="h-4 bg-zinc-200/75 rounded w-3/4"></div>

          {/* Nickname */}
          <div className="hidden lg:block h-4 bg-zinc-200/75 rounded w-3/5"></div>

          {/* Size */}
          <div className="h-4 bg-zinc-200/75 rounded w-1/3"></div>

          {/* Mobile Price */}
          <div className="h-4 lg:hidden bg-zinc-200/75 rounded w-1/3"></div>
        </div>

        {/* Mobile Remove Action */}
        <div className="self-start w-11 h-9 lg:hidden rounded-full bg-zinc-200/75"></div>

        <div className="hidden lg:flex flex-col justify-between items-end w-full">
          {/* Price */}
          <div className="h-4 bg-zinc-200/75 rounded w-1/3"></div>

          {/* Remove Action */}
          <div className="h-4 bg-zinc-200/75 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  )
}

export default CartItemSkeleton
