"use client";

import { Product } from "@/types/payload";
import { useEffect, useState } from "react";
import ProductSkeleton from "../skeletons/ProductSkeleton";
import { cn, formatPrice } from "@/utils";
import Link from "next/link";
import Image from "next/image";
import BrandLogo from "./BrandLogo";
import { Icon } from "@iconify/react";

interface ProductCardProps {
  product: Product | null;
  index: number;
  showWishlist?: boolean;
}

const ProductCard = ({
  product,
  index,
  showWishlist = false,
}: ProductCardProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isLoaded) return <ProductSkeleton />;

  const coverImage = () => {
    const firstImage = product.images[0].image;
    return typeof firstImage === "string"
      ? firstImage
      : (firstImage.sizes?.thumbnail?.url as string);
  };

  const getPriceInfo = () => {
    const minPriceInfo = product.available_sizes.reduce(
      (min, size) => {
        const regularPrice = size.price ?? Infinity;
        const discountedPrice = size.discount
          ? regularPrice * (1 - size.discount)
          : regularPrice;

        if (discountedPrice < min.discountedPrice) {
          return { regularPrice, discountedPrice };
        }

        return min;
      },
      { regularPrice: Infinity, discountedPrice: Infinity }
    );

    return {
      regularPrice: minPriceInfo.regularPrice,
      discountedPrice:
        minPriceInfo.discountedPrice !== minPriceInfo.regularPrice
          ? minPriceInfo.discountedPrice
          : null,
    };
  };

  const getProductInfo = () => {
    const brand =
      typeof product.brand === "string" ? product.brand : product.brand.name;
    const model =
      typeof product.model === "string" ? product.model : product.model.name;

    return { brand, model };
  };

  const { regularPrice, discountedPrice } = getPriceInfo();
  const { brand, model } = getProductInfo();

  return (
    <Link
      href={`/sneakers/${product.id}`}
      className={cn("invisible h-full w-full cursor-pointer group", {
        "visible animate-in fade-in-5": isLoaded,
      })}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="relative px-5 bg-zinc-100 rounded-2xl aspect-square sm:aspect-auto">
          {showWishlist && (
            <Icon
              icon="solar:bookmark-bold-duotone"
              height="1.25rem"
              className="absolute inset-0 top-3 left-3 text-secondary"
            />
          )}
          <Image
            alt={`${product.nickname} cover`}
            src={coverImage()}
            width={400}
            height={300}
            loading="eager"
            className="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col w-full">
          <h3 className="font-semibold text-primary-800 line-clamp-1 sm:text-base">
            {product.nickname}
          </h3>
          <span className="flex items-center gap-2 text-primary-500">
            <BrandLogo brand={brand} />
            <p className="text-md">{model}</p>
          </span>
          <span className="flex items-baseline gap-2 mt-1">
            {discountedPrice ? (
              <>
                <p className="font-semibold text-primary-800">
                  {formatPrice(discountedPrice)}
                </p>
                <p className="text-sm text-primary-600 line-through">
                  {formatPrice(regularPrice)}
                </p>
              </>
            ) : (
              <p className="font-semibold text-primary-800">
                {formatPrice(regularPrice)}
              </p>
            )}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
