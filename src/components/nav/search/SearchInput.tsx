'use client'

import IconButton from '@/components/base/IconButton'
import { useSearchStore } from '@/stores/searchStore'
import { cn } from '@/utils'
import { Icon } from '@iconify/react'
import { ComponentPropsWithoutRef } from 'react'

interface SearchInputProps extends ComponentPropsWithoutRef<'input'> {
    value: string,
    isExpanded?: boolean,
    clearValue: () => void
}

const SearchInput = ({ value, isExpanded = false, clearValue, ...props }: SearchInputProps) => {
    const { expandSearch } = useSearchStore()

    return (
        <div className={cn(
            "flex w-full items-center gap-3 px-4",
            isExpanded
                ? "bg-transparent hover:bg-transparent"
                : "bg-primary-100/40 hover:bg-primary-100 text-primary-600 rounded-xl overflow-hidden transition-all duration-300 ease-in-out"
        )}>
            <Icon icon="solar:rounded-magnifer-linear" className="flex-none text-xl" />
            <input
                type="text"
                placeholder="Search by brand, collection, model or sneaker name ..."
                value={value}
                onFocus={expandSearch}
                className={cn(
                    "w-full focus:outline-none bg-transparent font-medium placeholder:text-md placeholder:text-primary-600",
                    isExpanded ? "py-3.5" : "py-2.5 text-md"
                )}
                {...props}
            />
            {!!value
                ? <IconButton
                    icon="tabler-x"
                    className="p-2 text-xl"
                    onClick={clearValue} />
                : <span className={cn(
                    "px-1 rounded-md bg-primary-100 font-semibold text-sm text-primary-600",
                    { "hidden lg:block": isExpanded })}>
                    {isExpanded ? "ESC" : "Ctrl+K"}
                </span>
            }
        </div>
    )
}

export default SearchInput