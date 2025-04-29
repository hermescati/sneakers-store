import { cn } from '@/utils'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ComponentPropsWithoutRef } from 'react'

interface IconProps extends ComponentPropsWithoutRef<'span'> {
  icon?: string
  src?: string
  alt?: string
  className?: string
}

const IconifyIcon = dynamic(() =>
  import('@iconify/react').then((mod) => mod.Icon)
)

const Icon = ({ icon, src, alt, className, ...props }: IconProps) => {
  const DEFAULT_ICON_SIZE = 'h-5'

  const iconSize = () => {
    if (!className) return DEFAULT_ICON_SIZE

    if (className.includes('text-xs')) return 'h-2.5'
    if (className.includes('text-sm')) return 'h-3.5'
    if (className.includes('text-md')) return 'h-4'
    if (className.includes('text-base')) return 'h-[1.125rem]'
    if (className.includes('text-lg')) return DEFAULT_ICON_SIZE
    if (className.includes('text-xl')) return 'h-6'
    if (className.includes('text-2xl')) return 'h-7'
    if (className.includes('text-3xl')) return 'h-9'
    if (className.includes('text-4xl')) return 'h-11'

    return DEFAULT_ICON_SIZE
  }

  return (
    <span
      className={cn(
        'relative flex aspect-square items-center justify-center',
        iconSize()
      )}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || `alt-${src}`}
          fill
          className={cn('object-contain', className)}
        />
      ) : (
        <IconifyIcon icon={icon!} className={cn('shrink-0', className)} />
      )}
    </span>
  )
}

export default Icon
