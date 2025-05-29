'use client'

import Button from '@/components/base/button/Button'
import IconButton from '@/components/base/button/IconButton'
import Input from '@/components/base/input/Input'
import { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { Drawer } from 'vaul'

const NotifyForm = () => {
  const [isOpen, setIsOpen] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null!)
  useOnClickOutside(contentRef, () => setIsOpen(false))

  return (
    <Drawer.Root handleOnly open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger className="w-fit py-2 text-md font-medium leading-none outline-none transition-colors duration-300 ease-in-out hover:text-secondary hover:underline hover:underline-offset-2 lg:pb-0">
        Can&apos;t find your size? Get notified!
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-30 bg-black/40" />
        <Drawer.Content className="fixed inset-0 z-30 flex items-center justify-center outline-none">
          <div
            ref={contentRef}
            className="relative mx-4 rounded-2xl border border-border bg-background px-6 pb-6 pt-5 shadow-lg"
          >
            <Drawer.Title className="text-xl font-semibold">Notify Me</Drawer.Title>
            <IconButton
              icon="tabler:x"
              className="absolute right-3 top-3"
              iconClass="text-xl md:text-2xl"
              onClick={() => setIsOpen(false)}
            />
            <Drawer.Description className="mt-1.5 text-md leading-snug text-primary-700">
              Enter your email and size to be notified when it&apos;s back in stock.
            </Drawer.Description>

            <div className="mt-6 flex flex-col gap-y-4">
              <Input type="email" label="Email" placeholder="e.g. you@example.com" />
              <Input
                type="number"
                label="Size (US)"
                placeholder="e.g. 9.5"
                min={3.5}
                max={18}
                step={0.5}
              />
              <Button label="Notify me" iconPrepend="gravity-ui:bell-dot" className="mt-2 w-full" />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default NotifyForm
