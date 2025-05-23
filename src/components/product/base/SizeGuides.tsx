'use client'

import IconButton from '@/components/base/button/IconButton'
import { cn } from '@/utils'
import { useRef, useState } from 'react'
import { useMediaQuery, useOnClickOutside } from 'usehooks-ts'
import { Drawer } from 'vaul'
import GuidesTable from './GuidesTable'

const SizeGuides = () => {
  const [isOpen, setIsOpen] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null!)
  useOnClickOutside(contentRef, () => setIsOpen(false))

  const isMobile = useMediaQuery('(max-width: 1023px)')

  return (
    <Drawer.Root
      shouldScaleBackground={isMobile}
      handleOnly={!isMobile}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Drawer.Trigger className="w-fit cursor-pointer text-md font-medium text-primary-600 transition-colors duration-300 ease-in-out hover:text-secondary hover:underline hover:underline-offset-4">
        Size Guides
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-30 bg-black/40" />
        <Drawer.Content
          className={cn(
            'fixed z-30 outline-none',
            isMobile
              ? 'inset-x-0 bottom-0 mt-24 flex h-full max-h-[98%] flex-col'
              : 'inset-0 my-16 flex items-center justify-center'
          )}
        >
          <div
            ref={contentRef}
            className={cn(
              'relative mx-auto flex h-full w-full max-w-3xl flex-col bg-background p-3',
              isMobile ? 'rounded-t-2xl' : 'rounded-2xl pt-5'
            )}
          >
            {isMobile ? (
              <Drawer.Handle className="relative !mx-0 mb-6 !flex !w-full !items-center !justify-center !bg-transparent">
                <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-primary-200"></div>
              </Drawer.Handle>
            ) : (
              <IconButton
                icon="tabler:x"
                className="absolute right-3 top-3"
                iconClass="text-xl md:text-2xl"
                onClick={() => setIsOpen(false)}
              />
            )}
            <Drawer.Title className="mx-2 pb-2 text-xl font-semibold">Size Guides</Drawer.Title>

            <div className="mt-2 h-full w-full divide-y divide-border overflow-auto px-2">
              <GuidesTable />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default SizeGuides
