"use client";

import { formatPrice } from "@/utils";
import Button from "../base/Button";
import { useCart } from "@/hooks/use-cart";
import { getCartTotal } from "@/utils/product";

const ESTIMATED_DELIVERY = 35;

const CartTotal = () => {
  const { items } = useCart();
  const cartTotal = getCartTotal(items);

  return (
    <section className="lg:col-span-5 xl:col-span-4">
      <div className="sticky top-[11.5rem] self-start max-h-screen overflow-y-auto flex flex-col gap-4 p-5 lg:p-8 bg-primary-100 rounded-2xl md:rounded-3xl border border-primary-300 shadow-[0_0_8px_1px_rgba(0,0,0,0.10)]">
        <h4 className="font-bold text-2xl">Order Summary</h4>
        <span className="bg-primary-300 h-px w-full rounded-full" />

        <div className="flex flex-col gap-3">
          {/* Subtotal */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700">Subtotal</span>
            <span className="font-semibold">{formatPrice(cartTotal)}</span>
          </div>

          {/* Delivery */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700">
              Estimated Delivery
            </span>
            <span className="font-semibold">
              {formatPrice(ESTIMATED_DELIVERY)}
            </span>
          </div>
        </div>

        {/* Total */}
        <span className="bg-primary-300 h-px w-full rounded-full" />
        <div className="flex items-center justify-between font-bold text-lg">
          <div>Total</div>
          <div>{formatPrice(cartTotal + ESTIMATED_DELIVERY)}</div>
        </div>
        <Button label="Checkout" href="/checkout" />
      </div>
    </section>
  );
};

export default CartTotal;
