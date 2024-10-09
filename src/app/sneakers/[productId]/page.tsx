import MainContainer from "@/components/MainContainer";
import ProductPage from "@/components/product/ProductPage";
import { getPayloadClient } from "@/get-payload";
import { Product } from "@/types/payload";
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

  return (
    <MainContainer className="flex flex-col gap-8 py-6">
      <ProductPage product={product} />
    </MainContainer>
  );
};

export default Page;
