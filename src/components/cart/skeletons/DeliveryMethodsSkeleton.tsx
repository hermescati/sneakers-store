const DeliveryMethodsSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-bold">Delivery Options</h3>

      <div className="animate-pulse grid sm:grid-cols-2 items-center gap-3">
        {/* First Method */}
        <div className="w-full flex flex-col gap-1 items-start justify-between px-3 py-3.5 rounded-xl border border-zinc-300">
          {/* Name */}
          <div className="h-5 bg-zinc-200/75 rounded w-2/4"></div>

          {/* Estimate Time */}
          <div className="h-4 bg-zinc-200/75 rounded w-3/5"></div>

          {/* Price */}
          <div className="mt-2.5 h-5 bg-zinc-200/75 rounded w-1/4"></div>
        </div>

        {/* Second Method */}
        <div className="w-full flex flex-col gap-1 items-start justify-between px-3 py-3.5 rounded-xl border border-zinc-300">
          {/* Name */}
          <div className="h-5 bg-zinc-200/75 rounded w-2/4"></div>

          {/* Estimate Time */}
          <div className="h-4 bg-zinc-200/75 rounded w-3/5"></div>

          {/* Price */}
          <div className="mt-2.5 h-5 bg-zinc-200/75 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryMethodsSkeleton
