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
      <Drawer.Trigger className="w-fit py-2 lg:pb-0 font-medium text-md leading-none hover:text-secondary hover:underline hover:underline-offset-2 outline-none transition-colors ease-in-out duration-300">
        Can&apos;t find your size? Get notified!
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-30" />
        <Drawer.Content className="fixed inset-0 z-30 flex items-center justify-center outline-none">
          <div
            ref={contentRef}
            className="relative px-6 pb-6 pt-5 mx-4 rounded-2xl border border-border bg-background shadow-lg"
          >
            <Drawer.Title className="font-semibold text-xl">Notify Me</Drawer.Title>
            <IconButton
              icon="tabler:x"
              className="absolute top-3 right-3"
              iconClass="text-xl md:text-2xl"
              onClick={() => setIsOpen(false)}
            />
            <Drawer.Description className="mt-1.5 text-md text-primary-700 leading-snug">
              Enter your email and size to be notified when it&apos;s back in stock.
            </Drawer.Description>

            <div className="flex flex-col gap-y-4 mt-6">
              <Input type="email" label="Email" placeholder="e.g. you@example.com" />
              <Input
                type="number"
                label="Size (US)"
                placeholder="e.g. 9.5"
                min={3.5}
                max={18}
                step={0.5}
              />
              <Button label="Notify me" iconPrepend="gravity-ui:bell-dot" className="w-full mt-2" />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default NotifyForm
