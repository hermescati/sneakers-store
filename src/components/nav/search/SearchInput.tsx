'use client'

import Button from '@/components/base/Button'
import { useSearch } from '@/hooks/use-search'
import { cn } from '@/utils'
import { Icon } from '@iconify/react'
import { ComponentPropsWithoutRef } from 'react'

interface SearchInputProps extends ComponentPropsWithoutRef<'input'> {
    value: string,
    clearValue: () => void
}

const SearchInput = ({ value, clearValue, ...props }: SearchInputProps) => {
    const { isExpanded, expandSearch } = useSearch()

    return (
        <div className={cn(
            "flex w-full items-center gap-3 px-4",
            isExpanded
                ? "bg-transparent hover:bg-transparent text-primary-900"
                : "bg-primary-100/50 hover:bg-primary-200/50 text-primary-600 rounded-xl overflow-hidden transition-all duration-300 ease-in-out"
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
                ? <Button
                    variant="ghost"
                    size="icon"
                    icon="tabler:x"
                    className="p-1.5 text-primary-600"
                    onClick={clearValue} />
                : <span className={cn(
                    "px-1 border border-primary-200 rounded-md bg-primary-200 font-semibold text-sm text-primary-600/70",
                    { "hidden lg:block": isExpanded })}>
                    {isExpanded ? "ESC" : "Ctrl+K"}
                </span>
            }
        </div>
    )
}

export default SearchInput