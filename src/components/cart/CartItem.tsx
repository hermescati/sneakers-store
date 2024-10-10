import { ProductSize } from "@/types";
import { Product } from "@/types/payload";
import { formatPrice } from "@/utils";
import {
  formatCategory,
  getProductInfo,
  getProductPrice,
  getThumbnailImage,
} from "@/utils/product";
import Image from "next/image";
import Button from "../base/Button";

interface CartItemProps {
  product: Product;
  size: ProductSize;
  onRemove: () => void;
}

const CartItem = ({ product, size, onRemove }: CartItemProps) => {
  const { brand, model } = getProductInfo(product);
  const category = formatCategory(product.category);
  const price = getProductPrice(size);
  const imageUrl = getThumbnailImage(product);

  return (
    <div className="flex items-center gap-4 lg:gap-3 py-4 lg:py-3 lg:px-4">
      <div className="aspect-video">
        <Image
          alt={product.nickname}
          src={imageUrl}
          height={80}
          width={200}
          className="h-full w-full object-contain rounded-md"
        />
      </div>
      <div className="flex w-full justify-between gap-x-4 lg:gap-x-6">
        {/* Product Info */}
        <div className="flex flex-col">
          <h5 className="font-semibold">{product.nickname}</h5>
          <div className="hidden lg:flex items-center gap-1 text-primary-600 text-md">
            <span>{brand}</span>-<span>{model}</span>
          </div>
          <div className="text-primary-600 text-md">
            {category} (US) - {size.size}
          </div>
          <h5 className="lg:hidden mt-2 font-semibold">{formatPrice(price)}</h5>
        </div>

        {/* Actions */}
        <div className="hidden lg:flex flex-col justify-between items-end">
          <h5 className="font-semibold">{formatPrice(price)}</h5>
          <span
            className="font-medium text-md text-primary-600 hover:text-danger hover:underline hover:underline-offset-4 cursor-pointer transition-all ease-in-out duration-300"
            onClick={onRemove}
          >
            Remove
          </span>
        </div>
        {/* TODO: Find a hook to use media queries in order to not render this on certain devices */}
        <div className="flex lg:hidden flex-col justify-between items-end">
          <Button
            variant="ghost"
            size="icon"
            icon="tabler:x"
            onClick={onRemove}
            className="text-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
