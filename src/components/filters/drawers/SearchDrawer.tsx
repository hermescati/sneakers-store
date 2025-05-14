'use client'

import Button from '@/components/base/button/Button'
import Icon from '@/components/base/Icon'
import useOnKeyPress from '@/hooks/useOnKeyPress'
import { SIZING_CATEGORY_OPTIONS } from '@/lib/options'
import routes from '@/lib/routes'
import { discoverProducts } from '@/services/products'
import { SelectOption } from '@/types'
import { Product } from '@/types/payload'
import { cn } from '@/utils'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useDebounceValue, useOnClickOutside } from 'usehooks-ts'
import { Drawer } from 'vaul'
import NoResultsFound from '../search/NoResultsFound'
import SearchInput from '../search/SearchInput'
import SearchResultItem from '../search/SearchResultItem'

const SearchDrawer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounceValue(query, 500)
  const [selectedCategory, setSelectedCategory] = useState<SelectOption | null>(null)
  const [results, setResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null!)
  useOnClickOutside(contentRef, () => setIsOpen(false))

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
        const { data } = await discoverProducts(
          debouncedQuery.trim(),
          selectedCategory?.value as Product['size_category']
        )
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
    router.push(`${routes.products.home}?query=${debouncedQuery}`)
    setQuery('')
    setIsOpen(prev => !prev)
  }

  return (
    <Drawer.Root direction="top" handleOnly open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger className="w-full outline-none">
        <div className="lg:hidden">
          <Icon icon="solar:rounded-magnifer-linear" className="text-2xl text-primary-700" />
        </div>
        <div className="hidden lg:block">
          <SearchInput value={query} onFocus={e => e.preventDefault()} readOnly />
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-30" />
        <Drawer.Content className="fixed inset-0 z-30 outline-none">
          <div
            ref={contentRef}
            className="max-w-3xl mt-6 mx-4 md:mx-auto rounded-2xl border border-border bg-background shadow-lg"
          >
            <Drawer.Title></Drawer.Title>

            <div className="relative h-full w-full divide-y divide-border">
              <SearchInput
                autoFocus
                isExpanded
                value={query}
                onClear={handleOnClear}
                onChange={e => setQuery(e.target.value)}
              />

              <div className="flex flex-col gap-4 h-full">
                <div className="flex flex-col gap-1.5 m-4">
                  <span className="font-medium text-md text-primary-600">
                    I&apos;m searching for
                  </span>
                  <ul className="flex flex-flex-wrap items-center gap-1.5">
                    {SIZING_CATEGORY_OPTIONS.map(option => (
                      <li
                        key={option.value}
                        className={cn(
                          'px-4 py-1.5 border border-border hover:bg-primary-100 rounded-full font-medium text-md cursor-pointer transition-all',
                          {
                            'border-primary-900 bg-primary-900 hover:bg-primary-900 text-background cursor-default':
                              selectedCategory?.value === option.value
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
                ) : (
                  results.length > 0 && (
                    <div className="flex flex-col gap-1.5 h-full overflow-y-auto">
                      <p className="px-4 font-medium text-md text-primary-600">Results</p>
                      <ul className="divide-y divide-border border-t border-border">
                        {results.map(product => (
                          <SearchResultItem
                            key={product.id}
                            product={product}
                            onClick={() => router.push(routes.products.product(product.slug))}
                          />
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </div>

              {results.length > 0 && (
                <Button
                  variant="ghost"
                  size="small"
                  label="Show more results"
                  className="w-full py-3 rounded-none hover:underline"
                  onClick={handleOnSubmit}
                />
              )}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default SearchDrawer
