"use client";

import Button from "@/components/base/Button";
import CartList from "@/components/cart/CartList";
import CartTotal from "@/components/cart/CartTotal";
import EmptyCart from "@/components/cart/EmptyCart";
import MainContainer from "@/components/MainContainer";
import ProductReel from "@/components/product/ProductReel";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/utils";
import { useEffect, useState } from "react";

const Page = () => {
  const { items, clearCart } = useCart();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const hasItems = isMounted && !!items.length;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <MainContainer className="flex flex-col gap-8 py-6 lg:gap-12 lg:py-8">
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
        <div
          className={cn(
            "flex flex-col gap-4",
            hasItems ? "lg:col-span-7 xl:col-span-8" : "lg:col-span-12"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
              {hasItems && (
                <h3 className="font-semibold text-primary-500">
                  {items.length} item(s)
                </h3>
              )}
            </div>
            {hasItems && (
              <Button
                variant="ghost"
                label="Remove all"
                iconPrepend="tabler:trash"
                className="text-primary-600 underline underline-offset-4 hover:text-danger"
                onClick={() => clearCart()}
              />
            )}
          </div>

          {/* Products List */}
          {hasItems && <CartList />}

          {/* Empty State */}
          {!hasItems && <EmptyCart />}
        </div>

        {/* Checkout Section*/}
        {hasItems && <CartTotal />}
      </div>

      <ProductReel title="You May Also Like" query={{ limit: 6 }} />
    </MainContainer>
  );
};

export default Page;
