'use client'

import IconButton from '@/components/base/button/IconButton'
import { SIZES } from '@/lib/options'
import { cn } from '@/utils'
import { useRef, useState } from 'react'
import { useMediaQuery, useOnClickOutside } from 'usehooks-ts'
import { Drawer } from 'vaul'

const SizeGuides = () => {
  const [isOpen, setIsOpen] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null!)
  useOnClickOutside(contentRef, () => setIsOpen(false))

  const isMobile = useMediaQuery('(max-width: 1023px)')
  const filteredCategories = SIZES.filter((category) => category.value !== 'kids')

  return (
    <Drawer.Root shouldScaleBackground={isMobile} handleOnly={!isMobile} open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger className="w-fit font-medium text-md text-primary-600 hover:text-secondary hover:underline hover:underline-offset-4 cursor-pointer transition-colors ease-in-out duration-300">
        Size Guides
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-30" />
        <Drawer.Content
          className={cn(
            'fixed z-30 outline-none',
            isMobile
              ? 'inset-x-0 bottom-0 mt-24 flex flex-col max-h-[98%] h-full'
              : 'inset-0 my-16 flex items-center justify-center'
          )}
        >
          <div
            ref={contentRef}
            className={cn(
              'w-full h-full relative flex flex-col p-3 max-w-3xl mx-auto bg-background',
              isMobile ? 'rounded-t-2xl' : 'rounded-2xl pt-5'
            )}
          >
            {isMobile ? (
              <Drawer.Handle className="relative !mx-0 !w-full !flex !items-center !justify-center mb-6 !bg-transparent">
                <div className="mx-auto mt-5 w-24 h-1 bg-primary-200 rounded-full"></div>
              </Drawer.Handle>
            ) : (
              <IconButton
                icon="tabler:x"
                className="absolute top-3 right-3"
                iconClass="text-xl md:text-2xl"
                onClick={() => setIsOpen(false)}
              />
            )}
            <Drawer.Title className="font-semibold text-xl pb-2 mx-2">Size Guides</Drawer.Title>

            <div className="px-2 mt-2 w-full h-full divide-y divide-border overflow-auto">
              <table className="table-fixed w-full">
                <thead className="sticky top-0 bg-primary-900 text-background z-10">
                  <tr className="text-sm md:text-md">
                    {filteredCategories.map((category) => (
                      <th
                        key={category.value}
                        className="px-1 md:px-2 py-2 border-l border-primary-300 dark:border-border text-center font-medium"
                      >
                        {category.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: Math.max(...filteredCategories.map((cat) => cat.sizes.length)) }).map(
                    (_, index) => (
                      <tr
                        key={index}
                        className="border-b border-primary-300 dark:border-border hover:bg-primary-100 transition-all duration-200 ease-in-out"
                      >
                        {filteredCategories.map((category) => (
                          <td
                            key={category.value}
                            className="p-2 border-l last:border-r border-primary-300 dark:border-border text-center font-medium text-md md:text-base text-primary-700"
                          >
                            {category.sizes[index] ?? '-'}
                          </td>
                        ))}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default SizeGuides
