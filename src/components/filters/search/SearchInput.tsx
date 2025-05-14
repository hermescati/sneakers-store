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
          : 'bg-primary-100/40 hover:bg-primary-100 text-primary-600 rounded-xl overflow-hidden transition-all duration-300 ease-in-out'
      )}
    >
      <Icon icon="solar:rounded-magnifer-linear" className="text-xl" />
      <input
        type="text"
        placeholder="Search by brand, model or name ..."
        value={value}
        className={cn(
          'w-full focus:outline-none bg-transparent font-medium placeholder:text-md placeholder:text-primary-600',
          isExpanded ? 'py-3.5' : 'py-2.5 text-md'
        )}
        {...props}
      />
      <span
        className={cn('px-1 rounded-md bg-primary-100 font-semibold text-sm text-primary-600', {
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
