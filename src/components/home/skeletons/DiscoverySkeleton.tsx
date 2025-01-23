const DiscoverySkeleton = () => {
  const items = Array.from({ length: 6 })

  return (
    <ul className="animate-pulse grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {items.map((_, index) => (
        <ul
          key={index}
          className="aspect-square bg-zinc-200/75 rounded-2xl"
        ></ul>
      ))}
    </ul>
  )
}

export default DiscoverySkeleton
