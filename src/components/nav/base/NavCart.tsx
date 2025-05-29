'use client'

import Icon from '@/components/base/Icon'
import IconButton from '@/components/base/button/IconButton'
import ShoppingCart from '@/components/cart/ShoppingCart'
import useOnKeyPress from '@/hooks/useOnKeyPress'
import routes from '@/lib/routes'
import { useCartStore } from '@/stores/cartStore'
import { cn } from '@/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useOnClickOutside } from 'usehooks-ts'

const NavCart = () => {
  const { items, isOpen: cartOpen, open: openCart, close: closeCart } = useCartStore()

  const cartRef = useRef<HTMLDivElement>(null!)
  const buttonRef = useRef<HTMLButtonElement>(null!)

  useOnKeyPress({ key: 'Escape' }, closeCart)
  useOnClickOutside(cartRef, event => {
    if (buttonRef.current && buttonRef.current.contains(event.target as Node)) return
    closeCart()
  })

  const count = items.length
  const hasItems = count > 0
  const countText = count > 9 ? '+9' : count.toString()

  return (
    <>
      <div className="relative md:hidden">
        <IconButton href={routes.cart} icon="solar:bag-4-outline" />
        {items.length > 0 && (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-secondary" />
        )}
      </div>

      <button
        ref={buttonRef}
        onClick={cartOpen ? closeCart : openCart}
        aria-label={`${count} item${count !== 1 ? 's' : ''} in cart`}
        className={cn(
          'group relative hidden shrink-0 cursor-pointer select-none items-center gap-1.5 rounded-full text-md font-semibold text-primary-700 transition-colors duration-300 ease-in-out md:flex',
          hasItems && '-ml-1 bg-primary-100/40 px-3 py-2 hover:bg-primary-100'
        )}
      >
        <Icon icon="solar:bag-4-outline" aria-hidden="true" className="text-2xl" />
        <AnimatePresence initial={false}>
          {hasItems && (
            <motion.span
              key="badge"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              className="inline-flex origin-center"
            >
              <motion.span
                key={countText}
                animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 1] }}
                transition={{ times: [0, 0.4, 1], duration: 0.35, ease: 'easeOut' }}
                className="font-bold"
              >
                {countText}
              </motion.span>
              <span className="ml-[0.2rem]">item{count !== 1 ? 's' : ''}</span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {cartOpen &&
        createPortal(
          <div ref={cartRef} className="relative max-w-screen-3xl">
            <ShoppingCart />
          </div>,
          document.body
        )}
    </>
  )
}

export default NavCart
