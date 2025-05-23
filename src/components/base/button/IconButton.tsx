import { cn } from '@/utils'
import { ComponentPropsWithoutRef } from 'react'
import Icon from '../Icon'
import Link from '../Link'

export interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
  icon: string
  href?: string
  iconClass?: string
}

const IconButton = ({ icon, href, iconClass, className, ...props }: IconButtonProps) => {
  const btnIconBase = `
        flex items-center justify-center
        w-fit h-fit aspect-square p-2.5 rounded-full
        text-primary-700 text-2xl whitespace-nowrap
        bg-transparent hover:bg-primary-100/50 active:bg-primary-100/50
        disabled:opacity-40 disabled:pointer-events-none
        active:outline-none active:ring-0
        transition ease-in-out duration-300
        shadow-none active:shadow-[inset_0_0px_4px_rgba(var(--primary-300))] dark:active:shadow-[inset_0_0px_8px_rgba(var(--background))]
    `

  if (href)
    return (
      <Link href={href} className={cn(btnIconBase, className)}>
        <Icon icon={icon} className={iconClass} />
      </Link>
    )

  return (
    <button className={cn(btnIconBase, className)} {...props}>
      <Icon icon={icon} className={iconClass} />
    </button>
  )
}

export default IconButton
