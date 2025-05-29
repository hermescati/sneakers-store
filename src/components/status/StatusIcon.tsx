import { Order } from '@/types/payload'
import { cn } from '@/utils'
import Icon from '../base/Icon'

const StatusIcon = ({ status }: { status: Order['status'] | null }) => {
  const renderIcon = () => {
    if (!status) return ''
    if (status === 'pending') return 'solar:hourglass-bold-duotone'
    if (status === 'completed') return 'solar:check-circle-bold'
    if (status === 'rejected') return 'solar:close-circle-bold'
    return ''
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn('w-fit rounded-full p-10 transition-colors duration-300 ease-in-out', {
          'bg-warning-400/10 dark:bg-warning-600/10': status === 'pending',
          'bg-success-400/10 dark:bg-success-600/10': status === 'completed',
          'bg-danger-400/10 dark:bg-danger-600/10': status === 'rejected'
        })}
      >
        <div
          className={cn('rounded-full p-5 transition-colors duration-300 ease-in-out', {
            'bg-warning-400/30 dark:bg-warning-400/20': status === 'pending',
            'bg-success-400/30 dark:bg-success-400/20': status === 'completed',
            'bg-danger-400/30 dark:bg-danger-400/20': status === 'rejected'
          })}
        >
          <Icon
            icon={renderIcon()}
            className={cn('text-6xl transition-colors duration-300 ease-in-out', {
              'animate-spin-180 text-warning': status === 'pending',
              'text-success': status === 'completed',
              'text-danger': status === 'rejected'
            })}
          />
        </div>
      </div>
    </div>
  )
}

export default StatusIcon
