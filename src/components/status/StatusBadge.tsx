import { Order } from '@/types/payload'
import { cn } from '@/utils'

const StatusBadge = ({ status }: { status: Order['status'] | null }) => {
  const paymentStatus = () => {
    switch (status) {
      case 'pending':
        return 'Pending Payment'
      case 'rejected':
        return 'Payment Rejected'
      case 'completed':
        return 'Payment Successful'
      default:
        return ''
    }
  }

  return (
    <div
      className={cn(
        'flex w-fit items-center justify-center py-2 px-4 rounded-full font-bold text-md transition-colors ease-in-out duration-300',
        {
          'bg-yellow-200/20 text-yellow-500': status === 'pending',
          'bg-success/10 text-green-500': status === 'completed',
          'bg-danger/10 text-danger': status === 'rejected'
        }
      )}
    >
      {paymentStatus()}
    </div>
  )
}

export default StatusBadge
