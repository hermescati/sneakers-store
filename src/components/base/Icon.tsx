'use client'

import { cn } from '@/utils'
import dynamic from 'next/dynamic'
import { ComponentPropsWithoutRef, useEffect, useState } from 'react'

interface IconProps extends ComponentPropsWithoutRef<'span'> {
  icon?: string
  className?: string
  children?: React.ReactNode
}
const DEFAULT_ICON_SIZE = 'h-5'

const IconifyIcon = dynamic(() => import('@iconify/react').then(mod => mod.Icon), { ssr: false })

const Icon = ({ icon, className, children, ...props }: IconProps) => {
  const [isMounted, setIsMounted] = useState(false)

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

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <span
      className={cn(
        'relative flex aspect-square items-center justify-center',
        iconSize(),
        className
      )}
      {...props}
    >
      {isMounted &&
        (children ? (
          children
        ) : icon ? (
          <IconifyIcon icon={icon} className={cn('shrink-0', className)} />
        ) : null)}
    </span>
  )
}

export default Icon
