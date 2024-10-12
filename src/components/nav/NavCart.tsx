'use client'

import { useCart } from '@/hooks/use-cart'
import { Icon } from '@iconify/react'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useOnClickOutside } from 'usehooks-ts'
import ShoppingCart from '../cart/ShoppingCart'

const NavCart = () => {
  const { items, cartOpen, openCart, closeCart } = useCart()

  const cartRef = useRef<HTMLDivElement>(null!)
  useOnClickOutside(cartRef, closeCart)

  return (
    <>
      <div
        className="group flex items-center gap-3 shrink-0 cursor-pointer"
        onClick={() => openCart()}
      >
        <Icon
          icon="solar:cart-large-minimalistic-linear"
          height="1.5rem"
          aria-hidden="true"
          className="text-primary-500 group-hover:text-primary-700 transition-all ease-in-out duration-300"
        />
        <span className="w-2 font-semibold text-primary-700 group-hover:text-foreground transition-all ease-in-out duration-300">
          {items.length}
        </span>
      </div>
      {cartOpen &&
        createPortal(
          <div ref={cartRef}>
            <ShoppingCart />
          </div>,
          document.body
        )}
    </>
  )
}

export default NavCart
