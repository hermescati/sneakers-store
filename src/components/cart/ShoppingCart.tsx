import Button from "@/components/base/Button";
import { ICartItem } from "@/types";
import { formatPrice } from "@/utils";
import { Icon } from "@iconify/react";
import CartItem from "./CartItem";

interface CartProps {
  items: ICartItem[];
  onClose: () => void;
  onItemRemove: (index: number) => void;
}

const ShoppingCart = ({ items, onClose, onItemRemove }: CartProps) => {
  const hasItems = items.length > 0;

  const subtotal = items
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  return (
    <div className="absolute z-20 right-[1.5rem] top-[6rem] overflow-clip divide-y-2 divide-primary-200 bg-background rounded-3xl shadow-[0_0_12px_1px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between gap-8 p-5">
        <h4 className="font-bold text-xl">
          {hasItems ? "Added to cart" : "Your shopping cart is empty"}
        </h4>
        <span
          className="p-2 cursor-pointer rounded-full hover:bg-primary-200"
          onClick={onClose}
        >
          <Icon icon="tabler:x" height="1.25rem" />
        </span>
      </div>
      <div className="px-5 py-4 w-[500px]">
        <ul className="flex flex-col gap-4 ">
          {items.map((item, index) => (
            <li key={item.name}>
              <CartItem item={item} onRemove={() => onItemRemove(index)} />
            </li>
          ))}
        </ul>
        {/* TODO: Add empty state */}
      </div>
      <div className="flex flex-col gap-4 p-5 bg-primary-200">
        <div className="flex items-center justify-between">
          <h5 className="font-semibold">Subtotal</h5>
          <h5 className="font-semibold">{formatPrice(subtotal)}</h5>
        </div>
        <div className="flex flex-col gap-2">
          <Button label="Checkout" />
          {hasItems && (
            <Button
              variant="outline"
              label={`View Items (${items.length})`}
              iconAppend="tabler:arrow-right"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
