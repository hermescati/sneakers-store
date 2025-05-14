import { cn } from '@/utils'
import { default as NextLink } from 'next/link'
import { ComponentPropsWithoutRef } from 'react'

interface LinkProps extends ComponentPropsWithoutRef<'a'> {
  underline?: boolean
}

const Link = ({ href, className, underline, children, onClick, ...props }: LinkProps) => {
  const baseClass = cn(
    'transition-all ease-in-out duration-300',
    {
      'cursor-pointer': onClick,
      'hover:underline hover:underline-offset-4': underline
    },
    className
  )

  if (href) {
    return (
      <NextLink href={href} className={baseClass} {...props}>
        {children}
      </NextLink>
    )
  }

  return (
    <a className={baseClass} onClick={onClick} {...props}>
      {children}
    </a>
  )
}

export default Link
