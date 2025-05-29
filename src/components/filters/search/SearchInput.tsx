'use client'

import IconButton from '@/components/base/button/IconButton'
import Icon from '@/components/base/Icon'
import { cn } from '@/utils'
import { ComponentPropsWithoutRef } from 'react'

interface SearchInputProps extends ComponentPropsWithoutRef<'input'> {
  value: string
  isExpanded?: boolean
  onClear?: VoidFunction
}

const SearchInput = ({ value, isExpanded = false, onClear, ...props }: SearchInputProps) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 px-4',
        isExpanded
          ? 'bg-transparent hover:bg-transparent'
          : 'overflow-hidden rounded-xl bg-primary-100/40 text-primary-600 transition-all duration-300 ease-in-out hover:bg-primary-100'
      )}
    >
      <Icon icon="solar:rounded-magnifer-linear" className="text-xl" />
      <input
        type="text"
        placeholder="Search by brand, model or name ..."
        value={value}
        className={cn(
          'w-full bg-transparent font-medium placeholder:text-md placeholder:text-primary-600 focus:outline-none',
          isExpanded ? 'py-3.5' : 'py-2.5 text-md'
        )}
        {...props}
      />
      <span
        className={cn('rounded-md bg-primary-200/60 px-1 text-sm font-semibold text-primary-600', {
          'hidden lg:block': isExpanded
        })}
      >
        {isExpanded ? 'ESC' : 'Ctrl+K'}
      </span>
      {!props.readOnly && (
        <IconButton icon="tabler:x" className="text-xl text-primary-600" onClick={onClear} />
      )}
    </div>
  )
}

export default SearchInput
