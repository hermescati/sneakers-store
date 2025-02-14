import { cn } from '@/utils'
import { Icon } from '@iconify/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ComponentPropsWithoutRef } from 'react'
import Link from './Link'

// TODO: Find a way to handle icon size
// TODO: Extract the icon only to a new component
// TODO: Create a base Icon component to avoid layout shifting as icons need a bit to load at first time
// TODO: Optimize link button and link component
const btnBase = `
    flex items-center justify-center
    font-semibold whitespace-nowrap
    disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none
    active:outline-none active:ring-2 active:ring-offset-2
    focus:outline-none focus:ring-2 focus:ring-offset-2
    transition ease-in-out duration-300
`

export const buttonVariants = cva(btnBase, {
  variants: {
    variant: {
      solid: 'dark:font-bold',
      outline: '',
      ghost: ''
    },
    intent: {
      primary: '',
      secondary: ''
    },
    size: {
      small: 'py-2 px-4 gap-2 text-md rounded-xl shadow-[0_2px_4px_0]',
      default: 'py-3.5 px-6 gap-3 max-h-[52px] rounded-2xl shadow-[0_4px_8px_0]'
    }
  },
  compoundVariants: [
    {
      variant: 'solid',
      intent: 'primary',
      className: [
        'bg-primary-800 dark:bg-secondary',
        'text-background',
        'hover:bg-primary-900 dark:hover:bg-secondary-400',
        'active:bg-primary-900 dark:active:bg-secondary-400',
        'active:ring-offset-background active:ring-primary-900 dark:active:ring-secondary',
        'focus:ring-offset-background focus:ring-primary-900 dark:focus:ring-secondary',
        'shadow-primary-800/40 dark:shadow-secondary-400/40'
      ]
    },
    {
      variant: 'solid',
      intent: 'secondary',
      className: [
        'bg-secondary dark:bg-primary-900',
        'text-background',
        'hover:bg-secondary-400 dark:hover:bg-primary-800',
        'active:bg-secondary-400 dark:hover:bg-primary-800',
        'active:ring-offset-background active:ring-secondary-400 dark:active:ring-primary-800',
        'focus:ring-offset-background focus:ring-secondary-400 dark:focus:ring-primary-800',
        'shadow-secondary-400/40 dark:shadow-primary-500/40'
      ]
    },
    {
      variant: 'outline',
      intent: 'primary',
      className: [
        'bg-transparent',
        'text-foreground dark:text-secondary',
        'border-2 border-primary-800 dark:border-secondary',
        'hover:bg-primary-100/50 dark:hover:bg-secondary-100/10',
        'active:ring-0 active:ring-offset-0',
        'shadow-none'
      ]
    },
    {
      variant: 'outline',
      intent: 'secondary',
      className: [
        'bg-transparent',
        'text-secondary dark:text-primary-900',
        'border-2 border-secondary dark:border-primary-900',
        'hover:bg-secondary-100/10 dark:hover:bg-primary-800/10',
        'active:ring-0 active:ring-offset-0',
        'shadow-none'
      ]
    },
    {
      variant: 'ghost',
      intent: 'primary',
      className: [
        'bg-transparent',
        'text-foreground',
        'hover:bg-primary-100',
        'active:bg-primary-100',
        'active:ring-0 active:ring-offset-0',
        'shadow-none active:shadow-[inset_0_0px_6px_rgba(var(--primary-400))] dark:active:shadow-[inset_0_0px_8px_rgba(var(--background))]'
      ]
    },
    {
      variant: 'ghost',
      intent: 'secondary',
      className: [
        'bg-transparent',
        'text-secondary',
        'hover:bg-secondary-100/20',
        'active:bg-secondary-100/20',
        'active:ring-0 active:ring-offset-0',
        'shadow-none active:shadow-[inset_0_0px_6px_rgba(var(--primary-300))] dark:active:shadow-[inset_0_0px_8px_rgba(var(--background))]'
      ]
    }
  ],
  defaultVariants: {
    variant: 'solid',
    intent: 'primary',
    size: 'default'
  }
})

export interface ButtonProps
  extends ComponentPropsWithoutRef<"button">,
  VariantProps<typeof buttonVariants> {
  label?: string
  href?: string
  iconAppend?: string
  iconPrepend?: string
}

const Button = ({
  variant,
  intent,
  size,
  label,
  href,
  iconAppend,
  iconPrepend,
  className,
  children,
  ...props
}: ButtonProps) => {
  const buttonClasses = cn(buttonVariants({ variant, intent, size }), className)

  const iconClass = size === "small" ? "text-xl" : "text-2xl"
  const btnContent =
    <>
      {iconPrepend && <Icon className={iconClass} icon={iconPrepend} />}
      {label || children}
      {iconAppend && <Icon className={iconClass} icon={iconAppend} />}
    </>

  return href && !props.disabled ? (
    <Link href={href} className={buttonClasses}>
      {btnContent}
    </Link>
  ) : (
    <button className={buttonClasses} {...props}>
      {btnContent}
    </button>
  )
}

export default Button
