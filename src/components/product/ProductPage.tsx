"use client";

import { ProductSize } from "@/types";
import { Product } from "@/types/payload";
import { getProductInfo, validateImage } from "@/utils/product";
import { useState } from "react";
import Breadcrumbs, { BreadcrumbItem } from "../base/Breadcrumbs";
import ImageSlider from "../ImageSlider";
import ProductDetails from "./ProductDetails";
import ProductInfo from "./ProductInfo";
import ProductReel from "./ProductReel";
import ProductSizes from "./ProductSizes";

const ProductPage = ({ product }: { product: Product }) => {
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);

  const { brand, model } = getProductInfo(product);
  const imageUrls = product.images
    .map(({ image }) => validateImage(image))
    .filter(Boolean) as string[];

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Sneakers", href: "/sneakers" },
    { label: `${brand} Shoes`, href: `/sneakers?brand=${brand}` },
    { label: `${model}`, href: `/sneakers?brand=${brand}&model=${model}` },
    { label: `${product.nickname}` },
  ];

  return (
    <>
      <div className="flex flex-col gap-y-6 lg:flex-row lg:gap-x-10">
        <div className="flex flex-col gap-4 lg:w-[60%] xl:w-2/3">
          <Breadcrumbs items={breadcrumbs} className="hidden sm:block" />

          <div className="lg:hidden">
            <ProductDetails product={product} selectedSize={selectedSize} />
          </div>

          <ImageSlider urls={imageUrls} />
        </div>

        <div className="flex flex-col gap-4 lg:w-[40%] lg:justify-between xl:w-1/3 xl:gap-8">
          <div className="hidden lg:block">
            <ProductDetails product={product} selectedSize={selectedSize} />
          </div>

          <ProductSizes
            product={product}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
        </div>
      </div>

      <ProductInfo product={product} />

      <ProductReel
        query={{ sort: "desc", limit: 6 }}
        title="Related Sneakers"
      />
    </>
  );
};

export default ProductPage;
