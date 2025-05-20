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
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary" />
        )}
      </div>

      <button
        ref={buttonRef}
        onClick={cartOpen ? closeCart : openCart}
        aria-label={`${count} item${count !== 1 ? 's' : ''} in cart`}
        className={cn(
          'relative group hidden md:flex items-center gap-1.5 shrink-0 rounded-full font-semibold text-md text-primary-700 select-none cursor-pointer transition-colors duration-300 ease-in-out',
          hasItems && '-ml-1 px-3 py-1.5 bg-primary-100/40 hover:bg-primary-100'
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
