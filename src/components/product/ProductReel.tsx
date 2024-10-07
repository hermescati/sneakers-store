"use client";

import { TQueryValidator } from "@/lib/validators/query-validator";
import { trpc } from "@/trpc/client";
import { Product } from "@/types/payload";
import { Icon } from "@iconify/react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { useMemo } from "react";
import { cn } from "@/utils";

interface ProductReelProps {
  title: string;
  href?: string;
  query: TQueryValidator;
}

const FALLBACK_LIMIT = 4;

const ProductReel = (props: ProductReelProps) => {
  const { title, href, query } = props;

  const { data, isLoading } = trpc.getProducts.useInfiniteQuery(
    {
      limit: query.limit ?? FALLBACK_LIMIT,
      query,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );
  const productData = useMemo(
    () =>
      data?.pages.flatMap((page) =>
        page.products.map((product) => product as unknown as Product)
      ) || [],
    [data]
  );

  const products: (Product | null)[] = useMemo(() => {
    if (productData.length) return productData;
    if (isLoading)
      return new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
    return [];
  }, [productData, isLoading, query.limit]);

  return (
    <section className={cn("flex flex-col gap-4", { "py-4": !!href })}>
      <div className="flex items-center justify-start gap-3">
        <div className="max-w-2xl lg:max-w-4xl">
          {title && <h2 className="font-bold text-xl">{title}</h2>}
        </div>
        {href && (
          <Link href={href}>
            <Icon icon="solar:arrow-right-linear" height="1.5rem" />
          </Link>
        )}
      </div>
      <div className="relative">
        <div className="flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 md:gap-x-8 md:gap-y-6 lg:grid-cols-3 lg:gap-x-6 xl:grid-cols-6">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
