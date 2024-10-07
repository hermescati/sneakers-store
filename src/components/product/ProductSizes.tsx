"use client";

import { Product } from "@/types/payload";
import { cn } from "@/utils";
import { formatCategory } from "@/utils/product";
import { useState } from "react";
import Button from "../base/Button";

interface SizeBoxProps {
  size: number;
  stock: number;
  selected: boolean;
  onSelect: () => void;
}

interface ProductSizeProps {
  category: Product["category"];
  availableSizes: Product["available_sizes"];
}

const SizeBox = ({ size, stock, selected, onSelect }: SizeBoxProps) => {
  const baseStyle = `
    flex items-center justify-center p-4 lg:max-w-12 lg:max-h-12
    rounded-xl border border-primary-300 
    bg-background 
    font-semibold text-primary-700
    hover:border-primary-400
    cursor-pointer transition-color ease-in-out duration-300
  `;

  return (
    <div
      onClick={onSelect}
      className={cn(baseStyle, {
        "opacity-40 cursor-not-allowed": !stock,
        "border-none bg-primary-900 text-background shadow-[0_2px_16px_-2px_rgba(33,36,39,0.50)]":
          selected,
      })}
    >
      {size}
    </div>
  );
};

const ProductSizes = ({ category, availableSizes }: ProductSizeProps) => {
  // TODO: Update the type of the selectedSize to be an object so it can update the price accordingly
  const [selectedSize, setSelectedSize] = useState<string>();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-4 p-5 bg-primary-100 rounded-2xl md:rounded-3xl border border-primary-300 shadow-[0_0_8px_1px_rgba(0,0,0,0.10)]">
        <h4 className="font-semibold w-full">{`Select Sizes (US ${formatCategory(category)})`}</h4>
        <hr className="border-primary-300 rounded-full" />

        <ul className="grid grid-cols-5 gap-2 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-6 2xl:grid-cols-7 2xl:gap-1.5">
          {availableSizes.map((item) => (
            <SizeBox
              key={item.id}
              size={item.size}
              stock={item.stock}
              selected={item.id === selectedSize}
              onSelect={() => setSelectedSize(item.id as string)}
            />
          ))}
        </ul>

        <div className="flex flex-col gap-2">
          <Button
            label="Add to cart"
            disabled={!selectedSize}
            iconPrepend="solar:cart-large-minimalistic-linear"
          />
          <Button
            variant="ghost"
            label="Wishlist sneaker"
            iconPrepend="solar:heart-outline"
          />
        </div>
      </div>

      {/* TODO: Implement a modal that when this is clicked, shows the markup below */}
      <span className="w-fit py-2 text-md underline underline-offset-4 cursor-pointer font-medium hover:text-secondary">
        Can't find your size? Get notified!
      </span>

      {/* <div className="flex flex-col md:flex-row lg:flex-col items-center gap-y-2 gap-x-2">
          <Input type="email" placeholder="Email address" />
          <div className="flex flex-col sm:flex-row lg:flex-col 2xl:flex-row items-center gap-2 w-full">
            <div className="w-full md:w-1/2 lg:w-full">
              <Input
                type="number"
                placeholder="Size (US)"
                min={3.5}
                max={16}
                step={0.5}
              />
            </div>
            <Button
              label="Notify me"
              iconPrepend="gravity-ui:bell-dot"
              className="w-full md:w-1/2 lg:w-full"
            />
          </div>
        </div> */}
    </div>
  );
};

export default ProductSizes;
