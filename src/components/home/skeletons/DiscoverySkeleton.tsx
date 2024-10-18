const DiscoverySkeleton = () => {
  const items = Array.from({ length: 6 })

  return (
    <section className="flex flex-col gap-4 lg:gap-x-6">
      <h2 className="font-bold text-xl">Discover More</h2>

      <ul className="animate-pulse grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-x-6 gap-y-4">
        {items.map((_, index) => (
          <ul
            key={index}
            className="aspect-square md:aspect-video xl:aspect-square bg-zinc-200/75 rounded-2xl"
          ></ul>
        ))}
      </ul>

      <div className="animate-pulse grid md:grid-cols-2 gap-x-6 gap-y-4">
        <div className="relative aspect-video lg:aspect-square bg-zinc-200/75 rounded-2xl"></div>

        <div className="relative aspect-video lg:aspect-square bg-zinc-200/75 rounded-2xl"></div>
      </div>
    </section>
  )
}

export default DiscoverySkeleton
