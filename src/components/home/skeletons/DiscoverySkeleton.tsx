const DiscoverySkeleton = () => {
  const items = Array.from({ length: 6 })

  return (
    <ul className="grid animate-pulse grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {items.map((_, index) => (
        <li
          key={index}
          className="flex aspect-square flex-col items-center justify-center rounded-xl bg-skeleton py-6 sm:aspect-video sm:rounded-2xl"
        />
      ))}
    </ul>
  )
}

export default DiscoverySkeleton
