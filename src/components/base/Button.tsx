import { cn } from '@/utils'
import { Icon } from '@iconify/react'
import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'

const btnBase = `
    flex items-center justify-center gap-3
    font-semibold whitespace-nowrap
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
        'active:ring-0',
        'active:ring-offset-0',
        'active:shadow-[inset_0_0px_6px_rgba(0,0,0,0.2)]'
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
        'hover:bg-primary-200',
        'active:bg-primary-200',
        'active:ring-0',
        'active:ring-offset-0',
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
        'active:ring-0',
        'active:ring-offset-0'
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
  loading?: boolean
  icon?: string
  iconAppend?: string
  iconPrepend?: string
}

// TODO: Optimize code and variants
const Button = ({
  className,
  href,
  variant,
  intent,
  size,
  label,
  loading,
  icon,
  iconAppend,
  iconPrepend,
  children,
  ...props
}: ButtonProps) => {
  const buttonClasses = cn(buttonVariants({ variant, intent, size }), className)
  const iconSize = size === 'small' ? 'text-base' : 'text-xl'

  const btnContent = loading ? (
    <>
      <Icon icon="svg-spinners:180-ring" className={iconSize} />
      {label || children}
    </>
  ) : size === 'icon' && icon ? (
    <Icon icon={icon} className={iconSize} />
  ) : (
    <>
      {iconPrepend && <Icon icon={iconPrepend} className={iconSize} />}
      {label || children}
      {iconAppend && <Icon icon={iconAppend} className={iconSize} />}
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
