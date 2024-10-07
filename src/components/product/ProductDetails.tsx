import { Product } from "@/types/payload";
import { formatPrice } from "@/utils";
import { getPriceInfo, getProductInfo } from "@/utils/product";
import BrandLogo from "./BrandLogo";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { regularPrice } = getPriceInfo(product);
  const { brand, model } = getProductInfo(product);

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <div className="flex flex-col lg:gap-2">
        <div className="flex items-center gap-2 text-primary-600 text-md sm:text-base">
          <BrandLogo brand={brand} />
          <h3 className="font-medium">{brand}</h3>
        </div>

        <div className="flex flex-col">
          <h1 className="font-bold text-2xl lg:text-3xl">{model}</h1>
          <h2 className="font-medium text-xl">
            &quot;{product.nickname}&quot;
          </h2>
        </div>
      </div>

      <div className="flex items-baseline gap-1">
        <h1 className="font-semibold text-2xl lg:font-bold">
          {formatPrice(regularPrice)}
        </h1>
        <span>& up</span>
      </div>
    </div>
  );
};

export default ProductDetails;
