import { ICartItem } from "@/types";
import { formatPrice } from "@/utils";
import Image from "next/image";

interface CartItemProps {
  item: ICartItem;
  onRemove: () => void;
}

const CartItem = ({ item, onRemove }: CartItemProps) => {
  return (
    <div className="flex items-center gap-4">
      <Image
        alt={item.name}
        src="/assets/jordan/air-jordan-1.png"
        height={80}
        width={120}
        className="aspect-video object-cover rounded-md"
      />
      <div className="flex w-full justify-between gap-8">
        <div className="flex flex-col">
          <h5 className="font-semibold line-clamp-1 mb-1">{item.name}</h5>
          <span className="text-primary-600 text-sm">{item.model}</span>
          <span className="text-primary-600 text-sm">
            Size (US) - {item.size}
          </span>
        </div>
        <div className="flex flex-col justify-between items-end">
          <h5 className="font-semibold">{formatPrice(item.price)}</h5>
          <span
            className="text-primary-600 text-sm underline hover:text-danger cursor-pointer transition-all ease-in-out duration-300"
            onClick={onRemove}
          >
            Remove
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
