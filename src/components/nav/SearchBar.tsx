'use client'

import useOnEscapeKey from '@/hooks/use-escape-key'
import useOnKeyPress from '@/hooks/use-keypress'
import { useSearch } from '@/hooks/use-search'
import { searchProducts } from '@/services/products'
import { Product } from '@/types/payload'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useDebounceValue } from 'usehooks-ts'
import NoResultsFound from './search/NoResultsFound'
import SearchInput from './search/SearchInput'
import SearchOptions from './search/SearchOptions'
import SearchResults, { SearchItemClickEvent } from './search/SearchResults'

// TODO: Handle enter key to be the same as showing more results
// TODO: Handle router push when showing more results
// TODO: Add animation so the height change is not so sudden
// TODO: Add animation to make the search bar popup when expanded
const SearchBar = () => {
  const router = useRouter()

  const [queryInput, setQueryInput] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [results, setResults] = useState<Product[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { isExpanded, expandSearch, closeSearch } = useSearch()
  const [query] = useDebounceValue(queryInput, 500)

  const searchRef = useRef<HTMLDivElement>(null!)
  useOnKeyPress({ key: 'k', ctrl: true, preventDefault: true }, () => expandSearch())
  useOnEscapeKey(closeSearch)

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true)

      try {
        const response = await searchProducts(query, selectedCategory)
        setResults(response)
      } catch (error) {
        console.error("Error fetching results:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (!query) {
      setResults([])
      return
    }

    fetchResults()
  }, [query, selectedCategory])

  const clearSearch = () => {
    setQueryInput("")
    setSelectedCategory("")
  }

  const onItemClick = (event: SearchItemClickEvent) => {
    setQueryInput(event.query)
    closeSearch()
    router.push(event.href)
  }

  if (!isExpanded) {
    return (
      <SearchInput
        readOnly
        value={queryInput}
        clearValue={clearSearch}
      />
    )
  }

  return (
    <>
      {createPortal(
        <div ref={searchRef} className="w-full">
          <div className="fixed inset-0 bg-black/25 z-40 overscroll-none" onClick={closeSearch} />

          <div className="w-[90%] lg:w-[75%] xl:w-[50%] mx-auto fixed top-6 left-0 right-0 z-40 border border-border shadow-lg bg-background rounded-xl divide-y divide-border overflow-hidden">
            <SearchInput
              autoFocus
              value={queryInput}
              clearValue={clearSearch}
              onChange={(event) => setQueryInput(event.target.value)}
            />

            <div className="flex flex-col gap-2">
              <SearchOptions selectedOption={selectedCategory} onSelect={setSelectedCategory} />

              {!isLoading &&
                <>
                  {!results?.length
                    ? <>{!!query && <NoResultsFound />}</>
                    : <SearchResults results={results} onItemClick={onItemClick} />}
                </>
              }
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default SearchBar