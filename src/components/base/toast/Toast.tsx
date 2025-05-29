'use client'

import { cn } from '@/utils'
import { toast as sonnerToast } from 'sonner'
import Icon from '../Icon'

interface ToastProps {
  id: string | number
  title?: string
  description: string
  icon: string
  variant?: 'warning' | 'error' | 'success' | 'default'
  dismissable?: boolean
  action?: {
    label: string
    onClick: VoidFunction
  }
}

const variantStyles = {
  warning: {
    container: 'bg-warning-50 ring-warning-100 dark:bg-warning-50/25 dark:ring-warning-50',
    title: 'text-warning-700 dark:text-warning-500',
    description: 'text-warning-600 dark:text-warning-700',
    action:
      'bg-warning-200/50 hover:bg-warning-200 text-warning-600 dark:bg-warning-100/25 dark:hover:bg-warning-100/50 dark:text-warning-700',
    icon: 'text-warning-600 dark:text-warning-700'
  },
  error: {
    container: 'bg-danger-50 ring-danger-100 dark:bg-danger-50/25 dark:ring-danger-50',
    title: 'text-danger-700 dark:text-danger-500',
    description: 'text-danger-600 dark:text-danger-700',
    action:
      'bg-danger-200/50 hover:bg-danger-200 text-danger-600 dark:bg-danger-100/25 dark:hover:bg-danger-100/50 dark:text-danger-700',
    icon: 'text-danger-600 dark:text-danger-700'
  },
  success: {
    container: 'bg-success-50 ring-success-100 dark:bg-success-50/25 dark:ring-success-50',
    title: 'text-success-700 dark:text-success-500',
    description: 'text-success-600 dark:text-success-700',
    close: '',
    action:
      'bg-success-200/50 hover:bg-success-200 text-success-600 dark:bg-success-100/25 dark:hover:bg-success-100/50 dark:text-success-700',
    icon: 'text-success-600 dark:text-success-700'
  },
  default: {
    container: 'bg-white ring-black/5',
    title: 'text-gray-900',
    description: 'text-gray-500',
    action: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100',
    icon: ''
  }
}

const Toast = (props: ToastProps) => {
  const { id, title, description, icon, action, variant = 'default', dismissable = false } = props
  const styles = variantStyles[variant] || variantStyles.default
  const showIcon = !title && !action

  return (
    <div className="relative rounded-lg bg-background shadow-lg">
      {dismissable && (
        <span className="absolute -left-1.5 -top-1.5 flex h-[1.15rem] w-[1.15rem] rounded-full bg-background">
          <button
            className={cn(
              'flex h-[1.15rem] w-[1.15rem] items-center justify-center rounded-full ring-1',
              styles.container
            )}
            onClick={() => sonnerToast.dismiss(id)}
          >
            <Icon icon="tabler-x" className={cn('text-sm', styles.icon)} />
          </button>
        </span>
      )}
      <div
        className={cn(
          'flex w-full items-center gap-2 rounded-lg p-4 ring-1 md:w-[356px]',
          styles.container
        )}
      >
        {showIcon && <Icon icon={icon} className={`text-xl ${styles.icon}`} />}
        <div className="flex flex-1 items-center">
          <div className="w-full leading-snug">
            {title && <p className={cn('text-md font-bold', styles.title)}>{title}</p>}
            <p className={cn('text-md font-semibold', styles.description)}>{description}</p>
          </div>
        </div>
        {action && (
          <div className="ml-5 shrink-0">
            <button
              className={cn(
                'rounded-md px-3 py-1 text-sm font-semibold transition-colors duration-300 ease-in-out',
                styles.action
              )}
              onClick={() => action.onClick()}
            >
              {action.label}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const customToast = (toastProps: Omit<ToastProps, 'id'>) => {
  return sonnerToast.custom(id => <Toast id={id} {...toastProps} />)
}
const toast = (toastProps: Omit<ToastProps, 'id'>) => customToast(toastProps)

toast.warning = (description: string, options?: Omit<ToastProps, 'id' | 'description' | 'icon'>) =>
  toast({
    description,
    variant: 'warning',
    icon: 'solar:danger-triangle-bold',
    ...options
  })

toast.error = (description: string, options?: Omit<ToastProps, 'id' | 'description' | 'icon'>) =>
  toast({
    description,
    variant: 'error',
    icon: 'solar:danger-circle-bold',
    ...options
  })

toast.success = (description: string, options?: Omit<ToastProps, 'id' | 'description' | 'icon'>) =>
  toast({
    description,
    variant: 'success',
    icon: 'solar:check-circle-bold',
    ...options
  })

export default toast
