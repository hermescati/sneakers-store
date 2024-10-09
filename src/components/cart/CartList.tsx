"use client";

import { useCart } from "@/hooks/use-cart";
import { cn } from "@/utils";
import ProductCard from "../product/ProductCard";
import CartItem from "./CartItem";

const CartList = () => {
  const { items, removeItem } = useCart();

  return (
    <>
      <h2 className="sr-only">Items in your shopping cart</h2>
      <ul
        className={cn("lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-6", {
          "divide-y divide-primary-200 border-b border-t border-primary-200 lg:divide-y-0 lg:border-none":
            !!items.length,
        })}
      >
        {items.map(({ product, size }, index) => (
          <li key={product.id}>
            <div className="hidden lg:block">
              <ProductCard
                product={product}
                index={index}
                selectedSize={size}
              />
            </div>
            <div className="lg:hidden">
              <CartItem
                product={product}
                size={size}
                onRemove={() => removeItem(product.id, size)}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CartList;
