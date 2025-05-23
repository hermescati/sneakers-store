'use client'

import Button from '@/components/base/button/Button'
import IconButton from '@/components/base/button/IconButton'
import { SIZES } from '@/lib/options'
import { Product } from '@/types/payload'
import { cn } from '@/utils'
import { useRef, useState } from 'react'
import { useMediaQuery, useOnClickOutside } from 'usehooks-ts'
import { Drawer } from 'vaul'
import GuidesTable from './GuidesTable'
import SizeBox from './SizeBox'

interface SizeDrawerProps {
  product: Product
  onSelect: (selectedSize: number) => void
}

const SizeDrawer = ({ product, onSelect }: SizeDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showGuide, setShowGuide] = useState(false)
  const [selectedSize, setSelectedSize] = useState<number | null>(null)

  const isTablet = useMediaQuery('(min-width: 768px)')

  const modalRef = useRef<HTMLDivElement>(null!)
  useOnClickOutside(modalRef, () => handleOnClose())

  const sizeCategory = SIZES.find(cat => cat.value === product.size_category)

  const handleOnClose = () => {
    setShowGuide(false)
    setIsOpen(false)
  }

  const handleAddToCart = () => {
    if (!selectedSize) return
    onSelect(selectedSize)
    setIsOpen(false)
    setSelectedSize(null)
  }

  return (
    <Drawer.Root
      shouldScaleBackground={!isTablet}
      direction="bottom"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Drawer.Trigger asChild>
        <div>
          <IconButton
            icon="solar:bag-4-outline"
            className="border border-border lg:hidden"
            onClick={e => {
              e.preventDefault()
              setIsOpen(prev => !prev)
            }}
          />
          <Button
            variant="outline"
            intent="primary"
            size="small"
            label="Add to cart"
            iconPrepend="solar:bag-4-outline"
            iconClass="text-xl"
            className="hidden border border-border py-2 hover:border-primary-900 hover:bg-primary-900 hover:text-background dark:border-border dark:hover:bg-secondary dark:hover:text-foreground lg:flex"
            onClick={e => {
              e.preventDefault()
              setIsOpen(prev => !prev)
            }}
          />
        </div>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-30 bg-black/40" />
        <Drawer.Content
          className={cn(
            'z-30 flex h-full outline-none',
            isTablet
              ? 'fixed inset-0 flex-col items-center justify-center'
              : 'fixed inset-x-0 bottom-0 mt-24 max-h-[96%] rounded-t-2xl bg-background'
          )}
          onClick={e => e.stopPropagation()}
        >
          <div
            ref={modalRef}
            className={cn(
              'relative flex flex-col gap-2 p-5 pb-0',
              isTablet
                ? 'mx-auto w-full max-w-xl rounded-2xl border border-border bg-background shadow-lg'
                : 'mx-auto h-full w-full max-w-3xl'
            )}
          >
            {!isTablet && (
              <Drawer.Handle className="relative !mx-0 mb-2 !flex !w-full !items-center !justify-center !bg-transparent">
                <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-primary-200"></div>
              </Drawer.Handle>
            )}

            <Drawer.Title asChild>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Choose Your Size</h2>
                  <p className="text-md font-medium text-primary-600">
                    Select a size before adding it to your cart.
                  </p>
                </div>
                {isTablet && (
                  <IconButton
                    icon="tabler:x"
                    className="absolute right-2.5 top-2.5"
                    onClick={handleOnClose}
                  />
                )}
              </div>
            </Drawer.Title>

            <span className="my-3 h-px w-full border-t border-border" />

            <div className="flex items-center justify-between">
              <p className="font-semibold">{sizeCategory?.label}</p>
              <button
                className="text-md font-medium text-primary-600 transition-colors duration-300 hover:text-secondary hover:underline hover:underline-offset-4"
                onClick={() => setShowGuide(prev => !prev)}
              >
                {showGuide ? 'Hide' : 'Show'} Guides
              </button>
            </div>

            <Drawer.Description asChild>
              <div className="h-full w-full overflow-y-auto md:max-h-[500px]">
                {showGuide ? (
                  <GuidesTable />
                ) : (
                  <ul className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5">
                    {sizeCategory?.sizes?.map(size => (
                      <SizeBox
                        key={size}
                        size={size}
                        disabled={!product.stock.find(s => s.size === size)}
                        selected={selectedSize === size}
                        onSizeSelect={setSelectedSize}
                      />
                    ))}
                  </ul>
                )}
              </div>
            </Drawer.Description>

            <div
              className={cn(showGuide ? 'py-1' : 'border-t border-border py-3', {
                'mb-2': isTablet
              })}
            >
              {!showGuide && (
                <Button
                  variant="solid"
                  intent="primary"
                  size="small"
                  iconPrepend="solar:bag-4-outline"
                  label="Add to cart"
                  className="w-full px-6 py-3 text-md"
                  disabled={!selectedSize}
                  onClick={handleAddToCart}
                />
              )}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default SizeDrawer
