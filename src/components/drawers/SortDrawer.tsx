'use client'

import { SORT_OPTIONS } from "@/lib/options"
import { ProductFilters, SortOrder } from "@/types"
import { cn } from "@/utils"
import { Icon } from '@iconify/react'
import { useMemo, useState } from "react"
import { Drawer } from 'vaul'
import Button from "../base/button/Button"

interface SortDrawerMobileProps {
    sort: ProductFilters['sort']
    order: ProductFilters['order']
    updateFilters: (newFilters: Partial<ProductFilters>) => void
}

const SortDrawer = ({
    sort,
    order,
    updateFilters
}: SortDrawerMobileProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const activeSortLabel = useMemo(() => {
        return SORT_OPTIONS.find(({ value }) => {
            const [field, dir] = value.split('|')
            return field === sort && (dir ? dir === order : true)
        })?.label ?? 'Sort'
    }, [sort, order])

    const handleSortSelection = (value: string) => {
        const [field, dir] = value.split('|')
        updateFilters({ sort: field, order: dir as SortOrder })

        setTimeout(() => {
            setIsOpen(false)
        }, 300)
    }

    return (
        <Drawer.Root shouldScaleBackground open={isOpen} onOpenChange={setIsOpen}>
            <Drawer.Trigger asChild>
                <Button
                    variant='ghost'
                    size='small'
                    label={activeSortLabel}
                    iconAppend='solar:sort-outline'
                    className='w-full justify-between gap-4 py-3.5 pl-6 rounded-none hover:bg-transparent' />
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40 z-30" />
                <Drawer.Content className="flex flex-col fixed bottom-0 inset-x-0 z-30 mt-24 max-h-[96%] bg-background rounded-t-2xl outline-none">
                    <div className="max-w-lg w-full mx-auto h-full relative flex flex-col p-3">
                        <Drawer.Handle className="relative !mx-0 !w-full !flex !items-center !justify-center mb-6 !bg-transparent">
                            <div className="mx-auto mt-5 w-24 h-1 bg-primary-200 rounded-full"></div>
                        </Drawer.Handle>
                        <Drawer.Title className="font-semibold text-xl pb-2 mx-3 border-b border-border">Sort By</Drawer.Title>

                        <div className="px-3 h-full divide-y divide-border space-y-2">
                            <ul className="pt-2">
                                {SORT_OPTIONS.map(({ value, label, icon }) => {
                                    const isSelected = value === (order ? `${sort}|${order}` : sort)
                                    return (
                                        <li
                                            key={value}
                                            className={cn(
                                                'flex items-center justify-between gap-4 py-4 cursor-pointer rounded-xl font-medium transition-all duration-300 ease-in-out',
                                                { 'font-semibold bg-primary-100 px-4': isSelected }
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
                                variant='ghost'
                                size='small'
                                disabled={!sort}
                                className='w-full py-3 justify-end rounded-lg hover:bg-transparent active:underline active:underline-offset-4 active:ring-0 active:ring-offset-0 focus:ring-0 focus:ring-offset-0 shadow-none active:shadow-none'
                                onClick={() => updateFilters({ sort: undefined, order: undefined })}>
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
