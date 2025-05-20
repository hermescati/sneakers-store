import Icon from '@/components/base/Icon'
import Link from '@/components/base/Link'
import { FooterItem } from '@/types'
import { cn } from '@/utils'

interface FooterLinkProps {
  item: FooterItem
  isSocial?: boolean
}

const FooterLink = ({ item, isSocial = false }: FooterLinkProps) => {
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

export default FooterLink
