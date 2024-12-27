'use client'

import { Product } from '@/types/payload';
import { cn } from '@/utils';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Button from '../base/Button';
import { searchProducts } from '@/services/products';

const SearchBar = () => {
  const [ query, setQuery ] = useState("")
  const [ selectedCategory, setSelectedCategory ] = useState("")
  const [ isExpanded, setIsExpanded ] = useState(false)
  const [ results, setResults ] = useState<Partial<Product>[]>()

  useEffect(() => {
    const fetchResults = async () => {
      const response = await searchProducts(query, selectedCategory)
      setResults(response)
    }

    if (query || selectedCategory) fetchResults()
  }, [query, selectedCategory])

  const searchOptions = [
    { value: "mens", label: "Mens" },
    { value: "womens", label: "Womens" },
    { value: "kids", label: "Kids" }
  ]

  return (
    <div className="relative w-full transition-all duration-300 ease-in-out">
      {/* Backdrop */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setIsExpanded(false)} />
      )}

      <div
        className={cn(isExpanded 
          ? "w-6/12 mx-auto fixed top-6 left-0 right-0 z-40 shadow-lg bg-background rounded-xl divide-y divide-primary-300 overflow-hidden" 
          : "relative")}>
        
        {/* Input Field */}
        <div className={cn(
          "flex items-center gap-3 px-4 bg-primary-100 text-primary-600 rounded-xl overflow-hidden", 
          { "bg-transparent text-primary-900": isExpanded }
          )}>
            
          <Icon icon="solar:rounded-magnifer-linear" className="flex-none text-xl"/>
          <input
            type="text"
            placeholder="Search by brand, collection, model or sneaker name ..."
            value={query}
            onFocus={() => setIsExpanded(true)}
            onChange={(event) => setQuery(event.target.value)}
            className={cn(
              "w-full py-2.5 focus:outline-none bg-transparent font-medium placeholder:text-md placeholder:text-primary-600", 
              { "py-3.5": isExpanded }
            )}
          />
          {!!query && <Button 
            variant="ghost" 
            size="icon" 
            icon="tabler:x" 
            className="p-1.5 text-primary-600"
            onClick={() => setQuery("")} />}
        </div>

        {/* Search Options */}
        {isExpanded && 
          <div className="flex flex-col">

            {/* Navigation */}
            <div className="flex flex-col gap-1 m-4">
              <span className="font-semibold text-md text-primary-600">I'm searching for</span>
              <ul className="flex items-center gap-1">
                {searchOptions.map((option) =>
                  <li
                    key={option.value}
                    className={cn(
                      "w-fit px-3 py-1 border border-primary-400 rounded-full font-semibold text-md cursor-pointer",
                      { "border-primary-900 bg-primary-900 text-background cursor-default": selectedCategory === option.value }
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

            {results?.length && 
            <div className="max-h-80 overflow-y-auto">
              <span className="ml-4 font-semibold text-md text-primary-600">Results</span>
              
              <ul className="divide-y divide-primary-300">
                {/* Results */}
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center justify-between gap-4 p-4 cursor-pointer hover:bg-primary-200"
                    onClick={() => {
                      setQuery(result.nickname as string);
                      setIsExpanded(false);
                    }}
                  >
                    {/* Image */}
                    <Image
                      width={65}
                      height={40}
                      src={result.images?.length ? result.images[0].image as string : ""}
                      alt={result.nickname!}
                      className="aspect-video object-fill"/>
                    <div className="flex flex-col w-full">
                      <div className="flex items-center gap-2 font-medium text-md text-primary-500">
                        <span>{result.brand?.toString()}</span>
                        <span>&gt;</span>
                        <span>{result.model?.toString()}</span>
                        <span>&gt;</span>
                        <span>{result.size_category}</span>
                      </div>
                      <span className="font-semibold">{result.nickname}</span>
                    </div>
                  </div>
                ))}
              </ul>
            </div>}
          </div>
        }
      </div>
    </div>
  );
};

export default SearchBar;