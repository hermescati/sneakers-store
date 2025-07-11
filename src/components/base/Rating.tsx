import { cn } from '@/utils'
import Icon from './Icon'

interface RatingProps {
  rating: number
  maxStars?: number
  className?: string
}

export default function Rating({ rating, maxStars = 5, className = 'text-xl' }: RatingProps) {
  return (
    <div className="flex items-center">
      {Array.from({ length: maxStars }, (_, i) => {
        const isFull = i < Math.floor(rating)
        const isHalf = i === Math.floor(rating) && rating % 1 >= 0.5
        const icon = isFull
          ? 'mingcute:star-fill'
          : isHalf
            ? 'mingcute:star-half-fill'
            : 'mingcute:star-line'

        return (
          <Icon
            key={i}
            icon={icon}
            className={cn(
              'transition-all duration-300',
              isFull || isHalf ? 'text-warning-300 dark:text-warning-600' : 'text-primary-400',
              { glow: isFull },
              className
            )}
          />
        )
      })}
    </div>
  )
}
