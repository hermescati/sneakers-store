import Link from "@/components/base/Link"
import BrandLogo from "@/components/product/base/BrandLogo"
import { cn } from "@/utils"
import { Icon } from '@iconify/react'

export interface DiscoverCardItem {
    name: string
    href: string
    icon?: string
}

const DiscoverCard = ({ name, href, icon }: DiscoverCardItem) => {
    return (
        <Link
            href={href}
            className={cn(
                "aspect-square flex flex-col items-center justify-center rounded-xl bg-primary-100 hover:bg-primary-300/60 transition-all ease-in-out duration-300",
                { "text-secondary": name === "On Sale" }
            )}
        >
            {!icon ? (
                <BrandLogo brand={name} className="text-4xl" />
            ) : (
                <Icon icon={icon} className="text-4xl" />
            )}
            <div className="mt-2 font-semibold">{name}</div>
        </Link>
    )
}

export default DiscoverCard