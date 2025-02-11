const DiscoverySkeleton = () => {
  const items = Array.from({ length: 6 })

  return (
    <ul className="animate-pulse grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {items.map((_, index) => (
        <li
          key={index}
          className="aspect-square sm:aspect-video flex flex-col py-6 items-center justify-center rounded-xl sm:rounded-2xl bg-skeleton"
        />
      ))}
    </ul>
  )
}

export default DiscoverySkeleton
