import { Product } from "@/types/payload";
import { formatPrice } from "@/utils";
import {
  formatCategory,
  getProductInfo,
  getThumbnailImage,
} from "@/utils/product";
import Image from "next/image";

interface ProductOrderProps {
  product: Product;
  size: number;
  price: number;
}

const ProductOrder = ({ product, size, price }: ProductOrderProps) => {
  const { brand, model } = getProductInfo(product);
  const category = formatCategory(product.category);
  const imageUrl = getThumbnailImage(product);

  return (
    <div className="flex items-center gap-6">
      <div className="aspect-square">
        <Image
          alt={product.nickname}
          src={imageUrl}
          height={80}
          width={120}
          className="h-full w-full object-contain rounded-md"
        />
      </div>
      <div className="flex w-full justify-between gap-x-6">
        {/* Product Info */}
        <div className="flex flex-col">
          <h5 className="font-semibold">{product.nickname}</h5>
          <div className="lg:flex items-center gap-1 text-primary-600 text-md">
            <span>{brand}</span> - <span>{model}</span>
          </div>
          <div className="text-primary-600 text-md">
            {category} (US) - {size}
          </div>
        </div>

        <h5 className="font-semibold">{formatPrice(price)}</h5>
      </div>
    </div>
  );
};

export default ProductOrder;
