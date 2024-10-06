import Image from "next/image";

const ProductSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col gap-2 w-full">
      {/* Image Skeleton */}
      <div className="bg-gray-200 rounded-2xl">
        <Image
          alt="skeleton"
          src="/skeleton"
          width={400}
          height={250}
          loading="eager"
          className="opacity-0 h-full w-full object-cover object-center mix-blend-multiply"
        />
      </div>

      {/* Content Skeleton */}
      <div className="flex flex-col gap-2 w-full">
        {/* Title Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>

        {/* Brand and Model Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>

        {/* Price Skeleton */}
        <div className="h-5 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
