import Link from '@/components/base/Link'
import Image from 'next/image'

export interface CategoryCardItem {
  name: string
  href: string
  imageSrc: string
  imageAlt: string
}

const CategoryCard = ({ name, href, imageSrc, imageAlt }: CategoryCardItem) => {
  return (
    <Link
      href={href}
      underline={false}
      className="group relative flex aspect-video items-center justify-center overflow-clip rounded-xl p-8 sm:rounded-2xl md:aspect-square lg:items-end"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 33vw"
        className="h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 transition-all duration-300 group-hover:bg-black/25" />
      <div className="z-10 flex items-center justify-center rounded-full bg-background px-6 py-2 font-semibold shadow-xl">
        {name}
      </div>
    </Link>
  )
}

export default CategoryCard
