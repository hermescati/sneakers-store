"use client";

import { useCart } from "@/hooks/use-cart";
import { ProductSize } from "@/types";
import { Product } from "@/types/payload";
import { cn, formatPrice } from "@/utils";
import {
  getMinimalPrice,
  getProductInfo,
  getProductPrice,
  getThumbnailImage,
} from "@/utils/product";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../base/Button";
import ProductSkeleton from "../skeletons/ProductSkeleton";
import BrandLogo from "./BrandLogo";

interface ProductCardProps {
  product: Product | null;
  index: number;
  selectedSize?: ProductSize;
}

const ProductCard = ({ product, index, selectedSize }: ProductCardProps) => {
  const { removeItem } = useCart();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isLoaded) return <ProductSkeleton />;

  const { brand, model } = getProductInfo(product);
  const { regularPrice, discountedPrice } = getMinimalPrice(product);
  const selectedSizePrice = selectedSize ? getProductPrice(selectedSize) : null;
  const thumbnail = getThumbnailImage(product);

  return (
    <Link
      href={`/sneakers/${product.id}`}
      className={cn("invisible h-full w-full cursor-pointer group", {
        "visible animate-in fade-in-5": isLoaded,
      })}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="relative px-5 bg-zinc-100 rounded-2xl aspect-square sm:aspect-auto">
          {selectedSize && (
            <Button
              variant="ghost"
              size="icon"
              iconPrepend="tabler:x"
              className="absolute left-2 top-2 z-10"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeItem(product.id, selectedSize);
              }}
            />
          )}
          <Image
            alt={`${product.nickname} thumbnail`}
            src={thumbnail}
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
            {!!selectedSize && !!selectedSizePrice ? (
              <p className="font-semibold text-primary-800">
                {formatPrice(selectedSizePrice)}
              </p>
            ) : discountedPrice ? (
              <div className="flex gap-2 items-baseline">
                <p className="font-semibold text-primary-800">
                  {formatPrice(discountedPrice)}
                </p>
                <p className="text-md text-primary-600 line-through">
                  {formatPrice(regularPrice)}
                </p>
              </div>
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
