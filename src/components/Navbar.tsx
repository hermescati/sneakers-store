"use client";

import { PRODUCT_LIST } from "@/config";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./base/Button";
import Input from "./base/Input";
import ShoppingCart from "./cart/ShoppingCart";
import MainContainer from "./MainContainer";
import NavCategories from "./nav/NavCategories";

const Navbar = () => {
  const loggedUser = null;

  const [items, setItems] = useState(PRODUCT_LIST);
  const [cartOpen, setCartOpen] = useState(false);

  const handleItemRemoval = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const cartRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(cartRef, () => setCartOpen(false));

  return (
    <div className="sticky z-10 top-0 inset-x-0">
      <header className="relative bg-background ">
        <MainContainer>
          <div className="flex gap-20 py-6 items-center">
            {/* TODO: Mobile nav */}
            <div className="flex">
              <Link href="/">
                <h2 className="font-bold text-xl text-foreground">Sneakers.</h2>
              </Link>
            </div>
            <div className="flex-1">
              <Input />
            </div>
            <div className="flex items-center">
              <div className="relative hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-x-8">
                {loggedUser ? null : (
                  <div className="flex gap-2">
                    <Button variant="ghost" href="/login" label="Login" />
                    <Button href="/signup" label="Sign up" />
                  </div>
                )}
                <span className="h-8 w-px bg-gray-200" aria-hidden="true" />
                <Link
                  href="/checkout"
                  className="flex items-center gap-2 text-primary-500 shrink-0"
                  onMouseOver={() => setCartOpen(true)}
                >
                  <Icon
                    icon="solar:cart-large-minimalistic-linear"
                    height="2rem"
                    aria-hidden="true"
                  />
                  <span className="font-semibold text-primary-700 w-2">
                    {items.length}
                  </span>
                </Link>
                {cartOpen &&
                  createPortal(
                    <div ref={cartRef}>
                      <ShoppingCart
                        items={items}
                        onClose={() => setCartOpen(false)}
                        onItemRemove={handleItemRemoval}
                      />
                    </div>,
                    document.body
                  )}
              </div>
            </div>
          </div>
          <div className="hidden z-50 lg:block lg:self-stretch">
            <NavCategories />
          </div>
        </MainContainer>
      </header>
    </div>
  );
};

export default Navbar;
