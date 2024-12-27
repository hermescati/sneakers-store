import { cn } from '@/utils'
import { default as NextLink } from 'next/link'
import { ReactNode } from 'react'

interface LinkProps {
  href?: string
  children: ReactNode
  onClick?: () => void
  underline?: boolean
  className?: string
}

const Link = ({
  href,
  className,
  underline,
  children,
  onClick
}: LinkProps) => {
  const baseClass = cn(
    'transition-all ease-in-out duration-150',
    {
      'cursor-pointer': onClick,
      'hover:underline hover:underline-offset-4': underline
    },
    className
  )

  if (href) {
    return (
      <NextLink href={href} className={baseClass}>
        {children}
      </NextLink>
    )
  }

  return (
    <div className={baseClass} onClick={onClick}>
      {children}
    </div>
  )
}

export default Link
