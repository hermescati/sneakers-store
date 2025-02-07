import { Order } from '@/types/payload'
import { cn } from '@/utils'
import { Icon } from '@iconify/react'

const StatusIcon = ({ status }: { status: Order['status'] | null }) => {
  const renderIcon = () => {
    if (!status) return ''
    if (status === 'pending') return 'solar:hourglass-bold-duotone'
    if (status === 'completed') return 'solar:check-circle-bold'
    if (status === 'rejected') return 'solar:close-circle-bold'
    return ''
  }

  return (
    <div className="flex justify-center items-center">
      <div
        className={cn(
          'w-fit p-10 rounded-full transition-colors ease-in-out duration-300',
          {
            'bg-warning-400/10 dark:bg-warning-600/10': status === 'pending',
            'bg-success-400/10 dark:bg-success-600/10': status === 'completed',
            'bg-danger-400/10 dark:bg-danger-600/10': status === 'rejected'
          }
        )}
      >
        <div
          className={cn(
            'p-5 rounded-full transition-colors ease-in-out duration-300',
            {
              'bg-warning-400/30 dark:bg-warning-400/20': status === 'pending',
              'bg-success-400/30 dark:bg-success-400/20': status === 'completed',
              'bg-danger-400/30 dark:bg-danger-400/20': status === 'rejected'
            }
          )}
        >
          <Icon
            icon={renderIcon()}
            className={cn(
              'text-6xl transition-colors ease-in-out duration-300',
              {
                'text-warning animate-spin-180': status === 'pending',
                'text-success': status === 'completed',
                'text-danger': status === 'rejected'
              }
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default StatusIcon
