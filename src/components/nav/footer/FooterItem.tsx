import Icon from '@/components/base/Icon'
import Link from '@/components/base/Link'
import { FooterItem as TFooterItem } from '@/types'
import { cn } from '@/utils'

interface FooterItemProps {
  item: TFooterItem
  isSocial?: boolean
}

const FooterItem = ({ item, isSocial = false }: FooterItemProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold text-xl">{item.header}</h2>

      <ul className={cn('flex', isSocial ? 'items-center gap-4' : 'flex-col gap-2')}>
        {item.links.map((link, index) => (
          <li key={`${link.name}-${index}`}>
            <Link href={link.href} underline className="font-semibold text-primary-700">
              {link.icon ? <Icon icon={link.icon} className="text-lg" /> : link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FooterItem
