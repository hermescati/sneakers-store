'use client'

import useOnKeyPress from '@/hooks/useOnKeyPress'
import { SIZING_CATEGORY_OPTIONS } from '@/lib/options'
import { discoverProducts } from '@/services/products'
import { SelectOption } from '@/types'
import { Product } from '@/types/payload'
import { cn } from '@/utils'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import { Drawer } from 'vaul'
import Button from '../base/button/Button'
import SearchInput from '../filters/base/SearchInput'
import SearchItem from '../filters/base/SearchItem'
import NoResultsFound from '../nav/search/NoResultsFound'

const SearchDrawer = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [debouncedQuery] = useDebounceValue(query, 500)
    const [selectedCategory, setSelectedCategory] = useState<SelectOption | null>(null)
    const [results, setResults] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()
    useOnKeyPress({ key: 'k', ctrl: true, preventDefault: true }, () => setIsOpen(true))
    useOnKeyPress({ key: 'Enter' }, () => {
        if (debouncedQuery.trim() !== '' && results.length > 0) handleOnSubmit()
    })

    useEffect(() => {
        const fetchResults = async () => {
            if (!debouncedQuery) {
                setResults([])
                return
            }

            setIsLoading(true)
            try {
                const { data } = await discoverProducts(debouncedQuery.trim(), selectedCategory?.value as Product['size_category'])
                setResults(data || [])
            } catch (error) {
                console.error('Error fetching results:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchResults()
    }, [debouncedQuery, selectedCategory])

    const handleCategorySelect = (option: SelectOption) => {
        setSelectedCategory(prev => (prev?.value === option.value ? null : option))
    }

    const handleOnClear = () => {
        setSelectedCategory(null)
        setQuery('')
    }

    const handleOnSubmit = () => {
        router.push(`/sneakers?query=${debouncedQuery}`)
        setQuery('')
        setIsOpen((prev) => !prev)
    }

    return (
        <Drawer.Root direction='top' handleOnly open={isOpen} onOpenChange={setIsOpen}>
            <Drawer.Trigger className='w-full outline-none'>
                <div className="lg:hidden">
                    <span className='flex items-center justify-center p-2.5 rounded-full bg-transparent hover:bg-primary-100/50 transition ease-in-out duration-300'>
                        <Icon icon='solar:rounded-magnifer-linear' className='text-xl text-primary-700' />
                    </span>
                </div>
                <div className="hidden lg:block">
                    <SearchInput
                        value={query}
                        onFocus={(e) => e.preventDefault()}
                        readOnly
                    />
                </div>
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className='fixed inset-0 bg-black/40 z-30' />
                <Drawer.Content className='max-w-3xl mx-auto fixed top-5 inset-x-5 z-30 mb-96 max-h-[75dvh] outline-none'>
                    <div className='w-full h-full flex flex-col border border-border relative bg-background rounded-xl shadow-lg overflow-hidden'>
                        <Drawer.Title></Drawer.Title>

                        <div className='relative h-full w-full divide-y divide-border'>
                            <SearchInput
                                autoFocus
                                isExpanded
                                value={query}
                                onClear={handleOnClear}
                                onChange={(e) => setQuery(e.target.value)} />

                            <div className='flex flex-col gap-4 h-full'>
                                <div className='flex flex-col gap-1.5 m-4'>
                                    <span className='font-medium text-md text-primary-600'>I&apos;m searching for</span>
                                    <ul className='flex flex-flex-wrap items-center gap-1.5'>
                                        {SIZING_CATEGORY_OPTIONS.map((option) => (
                                            <li
                                                key={option.value}
                                                className={cn(
                                                    'px-4 py-1.5 border border-border hover:bg-primary-100 rounded-full font-medium text-md cursor-pointer transition-all',
                                                    {
                                                        'border-primary-900 bg-primary-900 hover:bg-primary-900 text-background cursor-default':
                                                            selectedCategory?.value === option.value,
                                                    }
                                                )}
                                                onClick={() => handleCategorySelect(option)}
                                            >
                                                {option.label}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {!isLoading && debouncedQuery && results.length === 0 ? (
                                    <NoResultsFound />
                                ) : results.length > 0 && (
                                    <div className='flex flex-col gap-1.5 h-full overflow-y-auto'>
                                        <p className='px-4 font-medium text-md text-primary-600'>Results</p>
                                        <ul className='divide-y divide-border border-t border-border'>
                                            {results.map((product) => (
                                                <SearchItem
                                                    key={product.id}
                                                    product={product}
                                                    onClick={() => router.push(`/sneakers/${product.slug}`)}
                                                />
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {results.length > 0 && (
                                <Button
                                    variant='ghost'
                                    size='small'
                                    label='Show more results'
                                    className='w-full py-3 rounded-none hover:underline'
                                    onClick={handleOnSubmit} />
                            )}
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}

export default SearchDrawer
