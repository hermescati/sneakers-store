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
            <div className="flex items-center text-sm font-medium sm:text-md">
              {breadcrumb.href ? (
                <Link
                  href={breadcrumb.href}
                  className="cursor-pointer text-primary-500 hover:text-foreground"
                >
                  {breadcrumb.label}
                </Link>
              ) : (
                <p className="font-semibold text-foreground">{breadcrumb.label}</p>
              )}
              {index !== items.length - 1 && <span className="ml-4 h-5 w-px bg-border" />}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Breadcrumbs
