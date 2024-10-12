import { ActionStatus } from '@/types'
import { cn } from '@/utils'
import { Icon } from '@iconify/react'

const StatusIcon = ({ status }: { status: ActionStatus }) => {
  const renderIcon = () => {
    if (status === 'success') return 'solar:check-circle-bold'
    if (status === 'failed') return 'solar:close-circle-bold'
    return 'solar:hourglass-bold-duotone'
  }

  return (
    <div className="flex justify-center items-center">
      <div
        className={cn(
          'w-fit p-10 rounded-full transition-colors ease-in-out duration-300',
          {
            'bg-success/5': status === 'success',
            'bg-yellow-100/25': status === 'pending',
            'bg-danger/5': status === 'failed'
          }
        )}
      >
        <div
          className={cn(
            'p-5 rounded-full transition-colors ease-in-out duration-300',
            {
              'bg-success/15': status === 'success',
              'bg-yellow-200/50': status === 'pending',
              'bg-danger/10': status === 'failed'
            }
          )}
        >
          <Icon
            icon={renderIcon()}
            className={cn(
              'text-6xl transition-colors ease-in-out duration-300',
              {
                'text-green-500': status === 'success',
                'text-yellow-500 animate-spin-180': status === 'pending',
                'text-danger': status === 'failed'
              }
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default StatusIcon
