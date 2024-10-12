import { cn } from '@/utils'
import { Icon } from '@iconify/react'
import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'

const btnBase = `
    flex items-center justify-center gap-3
    font-semibold
    disabled:opacity-40 disabled:pointer-events-none
    active:outline-none active:ring active:ring-offset-2
    transition ease-in-out duration-300
`

export const buttonVariants = cva(btnBase, {
  variants: {
    variant: {
      solid: [''],
      outline: [''],
      ghost: ['']
    },
    intent: {
      primary: [''],
      secondary: ['']
    },
    size: {
      small: ['py-2', 'px-4', , 'rounded-xl', 'text-sm'],
      default: ['py-3.5', 'px-6', 'max-h-[52px]', 'rounded-2xl', 'text-base'],
      icon: ['p-2', 'rounded-full', 'text-base']
    }
  },
  compoundVariants: [
    {
      variant: 'solid',
      intent: 'primary',
      className: [
        'bg-primary-800',
        'text-background',
        'hover:bg-primary-900',
        'active:bg-primary-900',
        'active:ring-primary-900',
        'shadow-[0_4px_16px_-2px_rgba(33,36,39,0.50)]'
      ]
    },
    {
      variant: 'solid',
      intent: 'secondary',
      className: [
        'bg-secondary',
        'text-foreground',
        'hover:bg-primary-200',
        'active:bg-secondary',
        'active:ring-secondary',
        'shadow-[0_4px_16px_-2px_rgba(253,132,74,0.25)]'
      ]
    },
    {
      variant: 'outline',
      intent: 'primary',
      className: [
        'bg-transparent',
        'text-foreground',
        'border-2 border-primary-900',
        'hover:bg-primary-900/5',
        'active:bg-primary-900/5',
        'active:ring-primary-900'
      ]
    },
    {
      variant: 'outline',
      intent: 'secondary',
      className: [
        'bg-transparent',
        'text-secondary',
        'border-2 border-secondary',
        'hover:bg-secondary/10',
        'active:bg-secondary/10',
        'active:ring-secondary'
      ]
    },
    {
      variant: 'ghost',
      intent: 'primary',
      className: [
        'bg-transparent',
        'text-foreground',
        'hover:bg-primary-900/5',
        'active:bg-primary-900/5',
        'active:ring-0',
        'active:ring-transparent',
        'active:shadow-[inset_0_0px_6px_rgba(0,0,0,0.2)]'
      ]
    },
    {
      variant: 'ghost',
      intent: 'secondary',
      className: [
        'bg-transparent',
        'text-secondary',
        'hover:bg-secondary/10',
        'active:bg-secondary/10',
        'active:ring-secondary'
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
  extends ComponentPropsWithoutRef<'button'>,
    VariantProps<typeof buttonVariants> {
  label?: string
  href?: string
  icon?: string
  iconAppend?: string
  iconPrepend?: string
}

const Button = ({
  className,
  href,
  variant,
  intent,
  size,
  label,
  icon,
  iconAppend,
  iconPrepend,
  children,
  ...props
}: ButtonProps) => {
  const buttonClasses = cn(buttonVariants({ variant, intent, size }), className)
  const iconSize = size === 'small' ? '1rem' : '1.25rem'

  const btnContent =
    size === 'icon' && icon ? (
      <Icon icon={icon} height={iconSize} />
    ) : (
      <>
        {iconPrepend && <Icon icon={iconPrepend} height={iconSize} />}
        {label || children}
        {iconAppend && <Icon icon={iconAppend} height={iconSize} />}
      </>
    )

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
