import { cn } from '@/utils'

interface ProgressBarProps {
  percentage: number
  shape?: 'linear' | 'circle'
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
  inactiveColor?: string
  activeColor?: string
  textColor?: string
}

const ProgressBar = ({
  percentage,
  shape = 'linear',
  size = 'md',
  children,
  inactiveColor = 'bg-primary-100',
  activeColor = 'bg-primary-800 dark:bg-secondary-500',
  textColor = 'text-primary-800 dark:text-secondary-500'
}: ProgressBarProps) => {
  const clampedPercentage = Math.min(100, Math.max(0, percentage))

  const sizeConfig = {
    sm: {
      height: 'h-2',
      radius: 30,
      strokeWidth: 8,
      textSize: 'text-sm'
    },
    md: {
      height: 'h-2.5',
      radius: 40,
      strokeWidth: 10,
      textSize: 'text-base'
    },
    lg: {
      height: 'h-3',
      radius: 50,
      strokeWidth: 14,
      textSize: 'text-lg'
    }
  }

  const config = sizeConfig[size]

  if (shape === 'linear') {
    return (
      <div
        className={cn('w-full overflow-clip rounded-full', inactiveColor, config.height)}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clampedPercentage}
      >
        <div
          className={cn('rounded-full', activeColor, config.height)}
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
    )
  }

  const normalizedRadius = config.radius - config.strokeWidth / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const dashOffset = circumference - (circumference * clampedPercentage) / 100

  return (
    <div
      className="relative"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clampedPercentage}
    >
      <svg height={config.radius * 2} width={config.radius * 2}>
        <circle
          stroke={`rgba(var(--${inactiveColor.split('bg-')[1]}))`}
          fill="transparent"
          strokeWidth={config.strokeWidth}
          r={normalizedRadius}
          cx={config.radius}
          cy={config.radius}
        />
        <circle
          stroke={`rgba(var(--${activeColor.split('bg-')[1]}))`}
          fill="transparent"
          strokeWidth={config.strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={config.radius}
          cy={config.radius}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          transform={`rotate(-90 ${config.radius} ${config.radius})`}
        />
      </svg>
      <div className={cn('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', textColor)}>
        {children || (
          <p className={cn('font-bold', config.textSize)}>{clampedPercentage.toFixed(0)}%</p>
        )}
      </div>
    </div>
  )
}

export default ProgressBar
