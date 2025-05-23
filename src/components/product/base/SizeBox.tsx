'use client'

import Icon from '@/components/base/Icon'
import { cn } from '@/utils'
import { ComponentPropsWithoutRef } from 'react'

interface SizeBoxProps extends ComponentPropsWithoutRef<'button'> {
  size: number
  selected?: boolean
  onSizeSelect: (size: number) => void
}

const SizeBox = ({ size, selected = false, onSizeSelect, ...props }: SizeBoxProps) => {
  return (
    <button
      {...props}
      onClick={() => onSizeSelect(size)}
      className={cn(
        'relative rounded-md px-4 py-4 text-md font-bold transition-all duration-300 ease-in-out',
        selected
          ? 'bg-gradient-to-r from-secondary-500 to-secondary-700 text-background'
          : 'bg-primary-100 text-foreground hover:bg-primary-200',
        { 'cursor-not-allowed opacity-40': props.disabled }
      )}
    >
      US {size}
      {selected && (
        <Icon icon="solar:check-circle-bold" className="absolute right-1 top-1 text-background" />
      )}
    </button>
  )
}

export default SizeBox
