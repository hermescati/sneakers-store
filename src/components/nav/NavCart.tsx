"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import { PRODUCT_LIST } from "@/config";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { createPortal } from "react-dom";
import ShoppingCart from "../cart/ShoppingCart";

const NavCart = () => {
  const [items, setItems] = useState(PRODUCT_LIST);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  const handleItemRemoval = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const cartRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(cartRef, () => setCartOpen(false));

  return (
    <div>
      <Link
        href="/checkout"
        className="flex items-center gap-2 text-primary-500 shrink-0"
        onMouseOver={() => setCartOpen(true)}
      >
        <Icon
          icon="solar:cart-large-minimalistic-linear"
          height="1.5rem"
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
  );
};

export default NavCart;
