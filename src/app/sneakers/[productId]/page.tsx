import Breadcrumbs, { BreadcrumbItem } from "@/components/base/Breadcrumbs";
import ImageSlider from "@/components/ImageSlider";
import MainContainer from "@/components/MainContainer";
import ProductDetails from "@/components/product/ProductDetails";
import ProductInfo from "@/components/product/ProductInfo";
import ProductReel from "@/components/product/ProductReel";
import ProductSizes from "@/components/product/ProductSizes";
import { getPayloadClient } from "@/get-payload";
import { Product } from "@/types/payload";
import { getProductInfo } from "@/utils/product";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    productId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { productId } = params;

  const payload = await getPayloadClient();
  const { docs: products } = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      id: { equals: productId },
    },
  });

  const [product] = products as unknown as Product[];
  if (!product) return notFound();

  const { brand, model } = getProductInfo(product);

  const validUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Sneakers", href: "/sneakers" },
    { label: `${brand} Shoes`, href: `/sneakers?brand=${brand}` },
    { label: `${model}`, href: `/sneakers?brand=${brand}&model=${model}` },
    { label: `${product.nickname}` },
  ];

  return (
    <MainContainer className="flex flex-col gap-8 py-6">
      <div className="flex flex-col gap-y-6 lg:flex-row lg:gap-x-10">
        {/* Left Column */}
        <div className="flex flex-col gap-4 lg:w-[60%] xl:w-2/3">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbs} className="hidden sm:block" />

          {/* Product Details */}
          <div className="lg:hidden">
            <ProductDetails product={product} />
          </div>

          {/* Image Slider */}
          <ImageSlider urls={validUrls} />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4 lg:w-[40%] lg:justify-between xl:w-1/3 xl:gap-8">
          {/* Product Details */}
          <div className="hidden lg:block">
            <ProductDetails product={product} />
          </div>

          {/* Available Sizes */}
          <ProductSizes
            category={product.category}
            availableSizes={product.available_sizes}
          />
        </div>
      </div>

      <ProductInfo product={product} />

      <ProductReel
        query={{ sort: "desc", limit: 6 }}
        title="Related Sneakers"
      />
    </MainContainer>
  );
};

export default Page;
