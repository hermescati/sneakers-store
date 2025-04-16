import routes from '@/lib/routes'
import { cn } from '@/utils'
import Link from 'next/link'

interface LogoProps {
  className?: string
}

const Logo = ({ className = '' }: LogoProps) => {
  return (
    <Link
      href={routes.home}
      className={cn('font-bold text-xl text-foreground', className)}
      aria-label="Home - Sneakers"
    >
      Sneakers.
    </Link>
  )
}

export default Logo
