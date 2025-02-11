'use client'

import ShoppingCart from '@/components/cart/ShoppingCart'
import useOnEscapeKey from '@/hooks/use-escape-key'
import { useCart } from '@/stores/useCart'
import { Icon } from '@iconify/react'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useOnClickOutside } from 'usehooks-ts'

const NavCart = () => {
  const { items, isOpen: cartOpen, open: openCart, close: closeCart } = useCart()

  const cartRef = useRef<HTMLDivElement>(null!)
  const buttonRef = useRef<HTMLButtonElement>(null!)

  useOnClickOutside(cartRef, (event) => {
    if (buttonRef.current && buttonRef.current.contains(event.target as Node))
      return
    closeCart()
  })
  useOnEscapeKey(closeCart)

  return (
    <>
      <button
        ref={buttonRef}
        onClick={cartOpen ? closeCart : openCart}
        className="group p-2 flex items-center gap-1 shrink-0 cursor-pointer text-primary-700 hover:text-foreground transition-all ease-in-out duration-300"
      >
        <Icon
          icon="solar:cart-large-minimalistic-linear"
          aria-hidden="true"
          className="text-2xl"
        />
        <span className="w-3 font-medium select-none">
          {items.length > 9 ? "+9" : items.length}
        </span>
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
