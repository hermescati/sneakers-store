import { cn } from '@/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'
import Icon from '../Icon'

const btnBase = `
    flex items-center justify-center
    font-semibold whitespace-nowrap
    disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none
    active:outline-none active:ring-2 active:ring-offset-2
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    transition duration-300 ease-in-out
`

export const buttonVariants = cva(btnBase, {
  variants: {
    variant: {
      solid: [
        'text-background dark:font-bold',
        'active:ring-offset-background',
        'focus-visible:ring-offset-background'
      ],
      outline: [
        'border-2',
        'bg-transparent',
        'active:ring-0 active:ring-offset-0',
        'focus-visible:ring-offset-0',
        '!shadow-none'
      ],
      ghost: [
        'bg-transparent',
        'active:ring-0 active:ring-offset-0',
        'focus-visible:ring-offset-0',
      ]
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
        'bg-primary-900 dark:bg-secondary',
        'hover:bg-primary-800 dark:hover:bg-secondary-400',
        'active:bg-primary-800 dark:active:bg-secondary-400',
        'active:ring-primary-900 dark:active:ring-secondary',
        'focus-visible:ring-primary-900 dark:focus-visible:ring-secondary',
        'shadow-primary-900/40 dark:shadow-secondary-400/40'
      ]
    },
    {
      variant: 'solid',
      intent: 'secondary',
      className: [
        'bg-secondary dark:bg-primary-900',
        'hover:bg-secondary-400 dark:hover:bg-primary-800',
        'active:bg-secondary-400 dark:hover:bg-primary-800',
        'active:ring-secondary-400 dark:active:ring-primary-800',
        'focus-visible:ring-secondary-400 dark:focus-visible:ring-primary-800',
        'shadow-secondary-400/40 dark:shadow-primary-500/40'
      ]
    },
    {
      variant: 'outline',
      intent: 'primary',
      className: [
        'text-foreground dark:text-secondary',
        'hover:bg-primary-100/50 dark:hover:bg-secondary-100/10',
        'border-primary-800 dark:border-secondary',
        'focus-visible:ring-primary-800 dark:focus-visible:ring-secondary',
      ]
    },
    {
      variant: 'outline',
      intent: 'secondary',
      className: [
        'text-secondary dark:text-primary-900',
        'hover:bg-secondary-100/10 dark:hover:bg-primary-800/10',
        'border-secondary dark:border-primary-900',
        'focus-visible:ring-secondary dark:focus-visible:ring-primary-900',
      ]
    },
    {
      variant: 'ghost',
      intent: 'primary',
      className: [
        'text-foreground',
        'hover:bg-primary-100',
        'active:bg-primary-100',
        'focus-visible:ring-primary-800 dark:focus-visible:ring-secondary',
        'shadow-none active:shadow-[inset_0_0px_6px_rgba(var(--primary-400))] dark:active:shadow-[inset_0_0px_8px_rgba(var(--background))]'
      ]
    },
    {
      variant: 'ghost',
      intent: 'secondary',
      className: [
        'text-secondary',
        'hover:bg-secondary-100/20',
        'active:bg-secondary-100/20',
        'focus-visible:ring-secondary dark:focus-visible:ring-primary-900',
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
  iconClass?: string
}

const Button = ({
  variant,
  intent,
  size,
  label,
  href,
  iconAppend,
  iconPrepend,
  iconClass,
  className,
  children,
  ...props
}: ButtonProps) => {
  const buttonClasses = cn(buttonVariants({ variant, intent, size }), className)
  const iconSize = iconClass || (size === "small" ? "text-lg" : "text-2xl")

  const btnContent =
    <>
      {iconPrepend && <Icon className={iconSize} icon={iconPrepend} />}
      {label || children}
      {iconAppend && <Icon className={iconSize} icon={iconAppend} />}
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
