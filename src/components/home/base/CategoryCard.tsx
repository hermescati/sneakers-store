import Link from "@/components/base/Link"
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
            className="group relative aspect-video md:aspect-square flex p-8 items-center lg:items-end justify-center rounded-xl sm:rounded-2xl overflow-clip"
        >
            <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 33vw"
                className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 transition-all duration-300 group-hover:bg-black/25" />
            <div className="z-10 flex py-2 px-6 items-center justify-center rounded-full bg-background font-semibold shadow-xl">
                {name}
            </div>
        </Link>
    )
}

export default CategoryCard