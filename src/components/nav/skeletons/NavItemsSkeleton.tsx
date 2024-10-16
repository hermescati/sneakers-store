const NavItemsSkeleton = () => {
  const navItems = Array.from({ length: 10 })

  return (
    <div className="animate-pulse flex gap-12 justify-between h-full py-4">
      {navItems.map((_, index) => (
        <div key={index} className="h-4 bg-zinc-200/75 rounded w-full"></div>
      ))}
    </div>
  )
}

export default NavItemsSkeleton
