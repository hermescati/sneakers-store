import Icon from '@/components/base/Icon'
import Link from '@/components/base/Link'
import BrandLogo from '@/components/product/base/BrandLogo'
import { cn } from '@/utils'

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
        'flex aspect-square flex-col items-center justify-center rounded-xl bg-primary-100 py-6 transition-all duration-300 ease-in-out hover:bg-primary-300/50 sm:aspect-video sm:rounded-2xl',
        { 'text-secondary': name === 'On Sale' }
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
