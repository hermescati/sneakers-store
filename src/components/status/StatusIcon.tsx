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
            'bg-yellow-100/25': status === 'pending',
            'bg-success/5': status === 'completed',
            'bg-danger/5': status === 'rejected'
          }
        )}
      >
        <div
          className={cn(
            'p-5 rounded-full transition-colors ease-in-out duration-300',
            {
              'bg-yellow-200/50': status === 'pending',
              'bg-success/15': status === 'completed',
              'bg-danger/10': status === 'rejected'
            }
          )}
        >
          <Icon
            icon={renderIcon()}
            className={cn(
              'text-6xl transition-colors ease-in-out duration-300',
              {
                'text-yellow-500 animate-spin-180': status === 'pending',
                'text-green-500': status === 'completed',
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
