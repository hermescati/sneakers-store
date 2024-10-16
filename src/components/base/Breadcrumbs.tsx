import { BreadcrumbItem } from '@/types'
import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'

interface BreadcrumbsProps extends ComponentPropsWithoutRef<'div'> {
  items: BreadcrumbItem[]
}

const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <div className={className}>
      <ol className="flex items-center gap-4">
        {items.map((breadcrumb, index) => (
          <li key={`breadcrumb-${breadcrumb.href}`}>
            <div className="flex items-center font-semibold text-sm sm:text-md">
              {breadcrumb.href ? (
                <Link
                  href={breadcrumb.href}
                  className="text-primary-400 hover:text-foreground cursor-pointer"
                >
                  {breadcrumb.label}
                </Link>
              ) : (
                <p className="text-foreground font-bold">{breadcrumb.label}</p>
              )}
              {index !== items.length - 1 && (
                <span className="w-px h-5 bg-primary-400 ml-4" />
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Breadcrumbs
