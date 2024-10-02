"use client";

import { ProductCategory } from "@/types";
import { cn } from "@/utils";
import Image from "next/image";
import Link from "next/link";

interface NavItemProps {
  category: ProductCategory;
  isActive: boolean;
  isAnyActive: boolean;
  handleOpen: () => void;
}

// TODO: Add a slider
const NavItem = ({
  category,
  isActive,
  isAnyActive,
  handleOpen,
}: NavItemProps) => {
  const handleCategoryClick = () => {
    if (!category.href) {
      handleOpen();
    }
  };

  return (
    <div className="flex">
      <div className="relative flex items-center">
        {category.href ? (
          <Link
            href={category.href}
            className="font-semibold text-md text-primary-600 transition-all ease-in-out hover:text-foreground"
          >
            {category.label}
          </Link>
        ) : (
          <span
            className={cn(
              "font-semibold text-md text-primary-600 transition-all ease-in-out cursor-pointer",
              { "text-foreground": isActive }
            )}
            onClick={handleCategoryClick}
          >
            {category.label}
          </span>
        )}
      </div>

      {isActive && !category.href && (
        <div
          className={cn(
            "absolute inset-x-0 top-full text-sm bg-primary-100 py-4",
            { "animate-in fade-in-10 slide-in-from-top-5": !isAnyActive }
          )}
        >
          <div className="absolute inset-0 top-1/2 shadow" aria-hidden="true" />

          <div className="relative">
            <div className="mx-auto max-w-7xl">
              <div className="flex gap-x-20 py-4">
                <div className="grid grid-cols-5 w-full">
                  <h3 className="font-semibold text-base text-foreground">
                    Models
                  </h3>
                  <div className="col-start-2 col-span-4 grid grid-rows-5 grid-flow-col gap-3">
                    {category.featured?.shoes.map((shoe, index) => (
                      <Link
                        key={index}
                        href={shoe.href as string}
                        className="font-medium text-primary-600 hover:text-foreground"
                      >
                        {shoe.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {category.featured?.popular &&
                category.featured.popular.length > 0 && (
                  <div className="flex flex-col gap-4 py-4">
                    <h3 className="font-semibold text-base text-foreground">
                      Popular
                    </h3>
                    <div className="grid grid-cols-3 gap-x-8">
                      {category.featured.popular.map((shoe) => (
                        <Link
                          key={shoe.value}
                          href={shoe.href as string}
                          className="group relative text-md"
                        >
                          <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-100 group-hover:opacity-75">
                            <Image
                              src={shoe.imageSrc}
                              alt={shoe.label}
                              fill
                              className="object-cover object-center"
                            />
                          </div>
                          <p className="mt-2 block font-semibold">
                            {shoe.label}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavItem;
