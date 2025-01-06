'use client'

import useOnEscapeKey from '@/hooks/use-escape-key';
import { useSearch } from '@/hooks/use-search';
import { searchProducts } from '@/services/products';
import { Product } from '@/types/payload';
import { capitalizeFirstLetter, cn, getProductInfo, getThumbnailImage } from '@/utils';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDebounceValue } from 'usehooks-ts';
import Button from '../base/Button';
import Link from '../base/Link';
import useOnKeyPress from '@/hooks/use-keypress';

const SearchBar = () => {
  const [queryInput, setQueryInput] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [results, setResults] = useState<Product[]>()

  const { isExpanded, expandSearch, closeSearch } = useSearch()
  const [query, setQuery] = useDebounceValue(queryInput, 500)

  const searchRef = useRef<HTMLDivElement>(null!)
  useOnEscapeKey(closeSearch)
  useOnKeyPress({ key: 'k', ctrl: true, preventDefault: true }, () => expandSearch())

  useEffect(() => {
    const fetchResults = async () => {
      const response = await searchProducts(query, selectedCategory)
      setResults(response)
    }

    if (!query) {
      setResults([])
      return
    }

    fetchResults()
  }, [query, selectedCategory])

  const searchOptions = [
    { value: "mens", label: "Mens" },
    { value: "womens", label: "Womens" },
    { value: "kids", label: "Kids" }
  ]

  if (!isExpanded) {
    return (
      <div className="flex w-full items-center gap-3 px-4 bg-primary-100/50 hover:bg-primary-200/50 text-primary-600 rounded-xl overflow-hidden transition-all duration-300 ease-in-out">
        <Icon icon="solar:rounded-magnifer-linear" className="flex-none text-xl" />
        <input
          type="text"
          readOnly
          placeholder="Search by brand, collection, model or sneaker name ..."
          value={queryInput}
          onFocus={expandSearch}
          className="w-full py-2.5 focus:outline-none bg-transparent font-medium text-md placeholder:text-md placeholder:text-primary-600"
        />
        {!!queryInput
          ? <Button
            variant="ghost"
            size="icon"
            icon="tabler:x"
            className="p-1.5 text-primary-600"
            onClick={() => setQueryInput("")} />
          : <span className="px-1 border border-primary-200 rounded-md bg-primary-200 font-semibold text-sm">Ctrl+K</span>
        }
      </div>
    )
  }

  return (
    <>
      {createPortal(
        <div ref={searchRef} className="w-full">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-20 z-40 overscroll-none" onClick={closeSearch} />

          <div className="w-[90%] lg:w-[75%] xl:w-[50%] mx-auto fixed top-6 left-0 right-0 z-40 border border-primary-200 shadow-lg bg-background rounded-xl divide-y divide-primary-300 overflow-hidden">

            {/* Input Field */}
            <div className="flex w-full items-center gap-3 px-4 bg-transparent hover:bg-transparent text-primary-900">
              <Icon icon="solar:rounded-magnifer-linear" className="flex-none text-xl" />
              <input
                type="text"
                placeholder="Search by brand, collection, model or sneaker name ..."
                value={queryInput}
                autoFocus
                onChange={(event) => setQueryInput(event.target.value)}
                className="w-full py-3.5 focus:outline-none bg-transparent font-medium placeholder:text-md placeholder:text-primary-600"
              />
              {!!queryInput && <Button
                variant="ghost"
                size="icon"
                icon="tabler:x"
                className="p-1.5 text-primary-600"
                onClick={() => setQueryInput("")} />}
              <span className="hidden lg:block px-1 border border-primary-200 rounded-md bg-primary-200 font-semibold text-sm">ESC</span>
            </div>

            {/* Search Options */}
            <div className="flex flex-col gap-2">

              {/* Navigation */}
              <div className="flex flex-col gap-1.5 m-4">
                <span className="font-semibold text-md text-primary-600">I'm searching for</span>
                <ul className="flex items-center gap-1">
                  {searchOptions.map((option) =>
                    <li
                      key={option.value}
                      className={cn(
                        "w-fit px-3 py-1 border border-primary-400 hover:bg-primary-200 rounded-full font-semibold text-md cursor-pointer transition-all duration-300 ease-in-out",
                        { "border-primary-900 bg-primary-900 hover:bg-primary-900 text-background cursor-default": selectedCategory === option.value }
                      )}
                      onClick={() => {
                        if (selectedCategory === option.value)
                          setSelectedCategory("")

                        setSelectedCategory(option.value)
                      }}>
                      {option.label}
                    </li>
                  )}
                </ul>
              </div>

              {/* Results */}
              {results?.length ?
                <div className="flex flex-col">
                  <span className="ml-4 mb-1 font-semibold text-md text-primary-600">Results</span>

                  <ul className="max-h-96 overflow-y-none overscroll-contain border-y border-primary-200 divide-y divide-primary-100">
                    {/* Results */}
                    {results.map((result) => {
                      const { brand, model } = getProductInfo(result)
                      const thumbnail = getThumbnailImage(result)

                      return (
                        <div
                          key={result.id}
                          className="flex items-center justify-between gap-4 py-1.5 px-4 cursor-pointer hover:bg-primary-200/50 transition-all duration-300 ease-in-out"
                          onClick={() => {
                            setQueryInput(result.nickname as string)
                            closeSearch()
                          }}
                        >
                          {/* Image */}
                          <div className="aspect-video">
                            <Image
                              alt={result.name!}
                              src={thumbnail}
                              height={80}
                              width={120}
                              className="h-full w-full object-contain rounded-md"
                            />
                          </div>

                          <div className="flex flex-col w-full">
                            <div className="flex items-center gap-2 font-medium text-sm text-primary-500">
                              <span>{brand}</span>
                              <span>&gt;</span>
                              <span>{model}</span>
                              <span>&gt;</span>
                              <span>{capitalizeFirstLetter(result.size_category!)}</span>
                            </div>
                            <span className="font-semibold text-md text-primary-800">{result.nickname}</span>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            icon="mage:chevron-right"
                            className="text-primary-500" />
                        </div>
                      )
                    })}
                  </ul>

                  <Link
                    underline
                    className="flex justify-center items-center py-3 font-medium text-md text-primary-600 hover:text-secondary cursor-pointer transition-all duration-300 ease-in-out">
                    Show more results ...
                  </Link>
                </div> :
                <>
                  {query &&
                    <div className="flex flex-col lg:flex-row gap-y-2 gap-x-8 pb-8 items-center justify-center">
                      <Image
                        src="/no-results-found.png"
                        alt="no results found"
                        width={200}
                        height={200} />
                      <div className="flex flex-col">
                        <h5 className="mt-2 font-medium">Oops, no results found!</h5>
                        <span className="text-md text-primary-600">We couldn't find what you're looking for</span>
                      </div>
                    </div>}
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