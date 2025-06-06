'use client'

import { cn } from '@/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { ComponentPropsWithoutRef, forwardRef, useMemo, useState } from 'react'
import FormControl from './FormControl'
import Icon from '../Icon'

const baseInput = `
    w-full bg-transparent
    has-[:focus-visible]:outline-none
    has-[:disabled]:opacity-40 has-[:disabled]:cursor-not-allowed
    transition ease-in-out duration-300
`

const inputVariants = cva(baseInput, {
  variants: {
    inputSize: {
      small: ['rounded-xl', 'border', 'text-md', 'has-[:focus-visible]:ring'],
      default: ['rounded-2xl', 'border-2', 'text-base', 'has-[:focus-visible]:ring-4']
    },
    invalid: {
      true: ['text-danger', 'border-danger', 'has-[:focus-visible]:ring-danger/20'],
      false: [
        'text-foreground',
        'border-primary-400',
        'has-[:focus-visible]:border-primary-800 dark:has-[:focus-visible]:border-secondary',
        'has-[:focus-visible]:ring-primary-800/20 dark:has-[:focus-visible]:ring-secondary/20'
      ]
    }
  },
  defaultVariants: {
    inputSize: 'default',
    invalid: false
  }
})

export interface InputProps
  extends ComponentPropsWithoutRef<'input'>,
    VariantProps<typeof inputVariants> {
  label?: string
  hint?: string
  error?: string
  iconAppend?: string
  iconPrepend?: string
}

const IconWrapper = ({
  position,
  inputSize,
  icon
}: {
  position: 'prepend' | 'append'
  inputSize: VariantProps<typeof inputVariants>['inputSize']
  icon: string
}) => (
  <div
    className={cn(
      'flex items-center border-primary-400 bg-primary-100/50 px-4',
      position === 'prepend' ? 'border-r' : 'border-l'
    )}
  >
    <Icon
      icon={icon}
      className={cn('text-primary-600', inputSize === 'small' ? 'text-base' : 'text-xl')}
    />
  </div>
)

const PasswordToggleWrapper = ({
  inputSize,
  showPassword,
  toggleHandler
}: {
  inputSize: VariantProps<typeof inputVariants>['inputSize']
  showPassword: boolean
  toggleHandler: () => void
}) => (
  <button
    type="button"
    onClick={toggleHandler}
    className="flex items-center border-l border-primary-400 bg-primary-100 px-4"
    aria-label={showPassword ? 'Hide password' : 'Show password'}
  >
    <Icon
      icon={showPassword ? 'solar:eye-closed-linear' : 'solar:eye-linear'}
      className={cn(
        'text-primary-600 transition-all duration-300 ease-in-out',
        inputSize === 'small' ? 'text-base' : 'text-xl'
      )}
    />
  </button>
)

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      type = 'text',
      inputSize,
      invalid = false,
      required,
      className,
      iconAppend,
      iconPrepend,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const inputType = type === 'password' && showPassword ? 'text' : type
    const inputClasses = inputVariants({ inputSize, invalid, className })

    const PrependIcon = useMemo(
      () =>
        iconPrepend &&
        type !== 'password' &&
        !showPassword && (
          <IconWrapper position="prepend" inputSize={inputSize} icon={iconPrepend as string} />
        ),
      [iconPrepend, inputSize, showPassword, type]
    )

    const AppendIcon = useMemo(
      () =>
        iconAppend &&
        type !== 'password' &&
        !showPassword && (
          <IconWrapper position="append" inputSize={inputSize} icon={iconAppend as string} />
        ),
      [iconAppend, inputSize, showPassword, type]
    )

    const PasswordToggle = useMemo(
      () =>
        type === 'password' && (
          <PasswordToggleWrapper
            inputSize={inputSize}
            showPassword={showPassword}
            toggleHandler={() => setShowPassword(!showPassword)}
          />
        ),
      [showPassword, inputSize, type]
    )

    return (
      <FormControl id={id} invalid={invalid} required={required} {...props}>
        <div className={cn(inputClasses, 'flex w-full overflow-clip')}>
          {PrependIcon}
          <input
            id={id}
            ref={ref}
            type={inputType}
            className={cn(
              'w-full appearance-none bg-transparent px-4 font-medium outline-none placeholder:text-primary-600 disabled:cursor-not-allowed',
              inputSize === 'small' ? 'py-2' : 'py-3'
            )}
            {...props}
          />
          {AppendIcon}
          {PasswordToggle}
        </div>
      </FormControl>
    )
  }
)

Input.displayName = 'Input'
export default Input
