import Button from "@/components/base/Button";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/utils";
import { getCartTotal } from "@/utils/product";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CartItem from "./CartItem";

const ShoppingCart = () => {
  const router = useRouter();

  const { items, removeItem, closeCart } = useCart();
  const hasItems = items.length > 0;

  const cartTotal = getCartTotal(items);

  const handleViewItems = () => {
    closeCart();
    router.push("/cart");
  };

  // TODO: Add a mobile friendly version for the cart
  return (
    <div className="fixed hidden lg:flex flex-col z-20 right-[1rem] top-[5.5rem] overflow-clip divide-y-2 divide-primary-300 bg-background rounded-3xl shadow-[0_0_12px_1px_rgba(0,0,0,0.25)] max-h-[calc(100vh-6.5rem)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-8 p-5">
        <h4 className="font-bold text-xl">
          {hasItems ? "Added to cart" : "Your cart is empty"}
        </h4>
        <Button
          variant="ghost"
          size="icon"
          icon="tabler:x"
          onClick={() => closeCart()}
        />
      </div>

      {/* Products */}
      <div className="flex-1 w-[500px] overflow-y-auto">
        {!hasItems ? (
          <div className="flex flex-col gap-2 items-center justify-center py-8">
            <Image
              src="/assets/empty-cart.png"
              alt="empty cart illustration"
              width={200}
              height={200}
            />
            <Link
              href="/sneakers"
              className="font-semibold hover:underline underline-offset-4 "
            >
              Add items to your cart to checkout
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-primary-200 overflow-y-auto">
            {items.map((item) => (
              <li key={item.product.nickname}>
                <CartItem
                  product={item.product}
                  size={item.size}
                  onRemove={() => removeItem(item.product.id, item.size)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Total */}
      <div className="flex flex-col gap-4 p-5 bg-primary-200">
        <div className="flex items-center justify-between">
          <h5 className="font-semibold">Subtotal</h5>
          <h5 className="font-semibold">{formatPrice(cartTotal)}</h5>
        </div>
        <div className="flex flex-col gap-2">
          <Button label="Checkout" />
          {hasItems && (
            <Button
              variant="outline"
              label={`View Items (${items.length})`}
              iconAppend="tabler:arrow-right"
              onClick={handleViewItems}
              className="hover:underline hover:underline-offset-4"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
