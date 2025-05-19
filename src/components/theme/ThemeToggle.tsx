'use client'

import useOnKeyPress from '@/hooks/useOnKeyPress'
import { cn } from '@/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import IconButton from '../base/button/IconButton'

const ThemeToggle = ({ headless = false }: { headless?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, resolvedTheme, setTheme } = useTheme()

  const switchRef = useRef<HTMLDivElement>(null!)
  useOnClickOutside(switchRef, () => setIsOpen(false))
  useOnKeyPress({ key: 'Escape' }, () => setIsOpen(false))

  const themeOptions: { value: string; icon: string }[] = [
    { value: 'light', icon: 'solar:sun-linear' },
    { value: 'dark', icon: 'solar:moon-stars-outline' },
    { value: 'system', icon: 'solar:devices-outline' }
  ]

  const activeIndex = themeOptions.findIndex(({ value }) => value === theme)
  const resolvedThemeIcon = themeOptions.find(({ value }) => value === resolvedTheme)
    ?.icon as string

  return (
    <div ref={switchRef} className="relative">
      {!headless && (
        <IconButton
          icon={resolvedThemeIcon}
          className="p-2 hover:text-foreground hover:bg-transparent active:bg-transparent active:shadow-none"
          iconClass="text-2xl"
          onClick={() => setIsOpen(prev => !prev)}
        />
      )}

      <AnimatePresence>
        {(headless || isOpen) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn('z-20 rounded-full border border-border bg-background overflow-hidden', {
              'absolute top-full left-1/2 !-translate-x-1/2 shadow-md': !headless
            })}
          >
            <div className="relative w-full flex items-center">
              <motion.div
                initial={{ x: `${activeIndex * 100}%` }}
                animate={{ x: `${activeIndex * 100}%` }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="absolute top-0 left-0 w-1/3 h-full rounded-full shadow-[0_0_0_1px_theme(colors.border)]"
              />

              {themeOptions.map(({ value, icon }) => (
                <IconButton
                  key={value}
                  icon={icon}
                  onClick={() => setTheme(value)}
                  className={cn('text-xl', {
                    'text-foreground': value === theme
                  })}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ThemeToggle
