'use client'

import Button from '@/components/base/button/Button'
import Icon from '@/components/base/Icon'
import { SORT_OPTIONS } from '@/lib/options'
import { ProductFilters, SortOrder } from '@/types'
import { cn } from '@/utils'
import { useMemo, useState } from 'react'
import { Drawer } from 'vaul'

interface SortDrawerMobileProps {
  sort: ProductFilters['sort']
  order: ProductFilters['order']
  updateFilters: (newFilters: Partial<ProductFilters>) => void
}

const SortDrawer = ({ sort, order, updateFilters }: SortDrawerMobileProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const activeSortLabel = useMemo(() => {
    return (
      SORT_OPTIONS.find(({ value }) => {
        const [field, dir] = value.split('|')
        return field === sort && (dir ? dir === order : true)
      })?.label ?? 'Sort'
    )
  }, [sort, order])

  const handleSortSelection = (value: string) => {
    const [field, dir] = value.split('|')
    updateFilters({ sort: field, order: dir as SortOrder })

    setTimeout(() => {
      setIsOpen(false)
    }, 300)
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger asChild>
        <Button
          variant="ghost"
          size="small"
          label={activeSortLabel}
          iconAppend="solar:sort-outline"
          iconClass="text-xl"
          className="w-full justify-between gap-4 rounded-none py-3.5 pl-6 hover:bg-transparent"
        />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-30 bg-black/40" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-30 mt-24 flex max-h-[96%] flex-col rounded-t-2xl bg-background outline-none">
          <div className="relative mx-auto flex h-full w-full max-w-lg flex-col p-3">
            <Drawer.Handle className="relative !mx-0 mb-6 !flex !w-full !items-center !justify-center !bg-transparent">
              <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-primary-200"></div>
            </Drawer.Handle>
            <Drawer.Title className="mx-3 border-b border-border pb-2 text-xl font-semibold">
              Sort By
            </Drawer.Title>

            <div className="h-full space-y-2 divide-y divide-border px-3">
              <ul className="pt-2">
                {SORT_OPTIONS.map(({ value, label, icon }) => {
                  const isSelected = value === (order ? `${sort}|${order}` : sort)
                  return (
                    <li
                      key={value}
                      className={cn(
                        'flex cursor-pointer items-center justify-between gap-4 rounded-xl py-4 font-medium transition-all duration-300 ease-in-out',
                        { 'bg-primary-100 px-4 font-semibold': isSelected }
                      )}
                      onClick={() => handleSortSelection(value)}
                    >
                      <p className="leading-none">{label}</p>
                      {icon && <Icon icon={icon} className="text-xl" />}
                    </li>
                  )
                })}
              </ul>
              <Button
                variant="ghost"
                size="small"
                disabled={!sort}
                className="w-full justify-end rounded-lg py-3 shadow-none hover:bg-transparent focus:ring-0 focus:ring-offset-0 active:underline active:underline-offset-4 active:shadow-none active:ring-0 active:ring-offset-0"
                onClick={() => updateFilters({ sort: undefined, order: undefined })}
              >
                Clear
              </Button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default SortDrawer
