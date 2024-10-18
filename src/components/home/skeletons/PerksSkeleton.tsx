const PerksSkeleton = () => {
  const perks = Array.from({ length: 4 })

  return (
    <section className="border-y border-primary-300 py-8">
      <ul className="animate-pulse grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-12 xl:gap-y-0 xl:gap-20">
        {perks.map((_, index) => (
          <li
            key={index}
            className="flex flex-col gap-2 xl:gap-3 items-start xl:items-center"
          >
            <div className="flex xl:flex-col items-center gap-x-3 xl:gap-y-3 w-full">
              <span className="w-8 h-8 rounded-full bg-zinc-200/75"></span>
              <div className="h-5 bg-zinc-200/75 rounded w-2/4"></div>
            </div>

            <div className="flex flex-col gap-1 w-full xl:items-center">
              <div className="h-4 bg-zinc-200/75 rounded w-4/5"></div>
              <div className="h-4 bg-zinc-200/75 rounded w-4/5"></div>
              <div className="h-4 bg-zinc-200/75 rounded w-3/5"></div>
              <div className="h-4 bg-zinc-200/75 rounded w-2/5"></div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PerksSkeleton
