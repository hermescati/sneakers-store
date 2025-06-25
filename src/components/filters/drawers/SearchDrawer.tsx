'use client'

import Button from '@/components/base/button/Button'
import IconButton from '@/components/base/button/IconButton'
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
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounceValue(query, 500)
  const [selectedCategory, setSelectedCategory] = useState<SelectOption | null>(null)
  const [results, setResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null!)
  useOnClickOutside(contentRef, () => setIsOpen(false))

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
      <div className="lg:hidden">
        <Drawer.Trigger className="outline-none" asChild>
          <IconButton icon="solar:rounded-magnifer-linear" />
        </Drawer.Trigger>
      </div>
      <div className="hidden w-full lg:block">
        <Drawer.Trigger className="w-full outline-none">
          <SearchInput value={query} onFocus={e => e.preventDefault()} readOnly />
        </Drawer.Trigger>
      </div>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-30 bg-black/40" />
        <Drawer.Content className="fixed inset-0 z-30 outline-none">
          <div
            ref={contentRef}
            className="mx-4 mt-6 max-w-3xl rounded-2xl border border-border bg-background shadow-lg md:mx-auto"
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

              <div className="flex h-full flex-col gap-4">
                <div className="m-4 flex flex-col gap-1.5">
                  <span className="text-md font-medium text-primary-600">
                    I&apos;m searching for
                  </span>
                  <ul className="flex-flex-wrap flex items-center gap-1.5">
                    {SIZING_CATEGORY_OPTIONS.map(option => (
                      <button
                        key={option.value}
                        className={cn(
                          'rounded-full border border-border px-4 py-1.5 text-md font-medium transition-all hover:bg-primary-100',
                          {
                            'border-primary-900 bg-primary-900 text-background hover:bg-primary-900':
                              selectedCategory?.value === option.value
                          }
                        )}
                        onClick={() => handleCategorySelect(option)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </ul>
                </div>

                {!isLoading && debouncedQuery && results.length === 0 ? (
                  <NoResultsFound />
                ) : (
                  results.length > 0 && (
                    <div className="flex h-full flex-col gap-1.5 overflow-y-auto">
                      <p className="px-4 text-md font-medium text-primary-600">Results</p>
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
                  className="w-full rounded-none py-3 hover:underline"
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
