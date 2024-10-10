import MainContainer from "@/components/MainContainer";
import PaymentStatus from "@/components/PaymentStatus";
import ProductOrder from "@/components/product/ProductOrder";
import { getPayloadClient } from "@/get-payload";
import { getPayloadUser } from "@/lib/payload-utils";
import { Order, Product } from "@/types/payload";
import { formatPrice } from "@/utils";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ThankYouPage = async ({ searchParams }: PageProps) => {
  const orderId = searchParams.orderId;
  const nextCookies = cookies();
  const payload = await getPayloadClient();

  const { user } = await getPayloadUser(nextCookies);
  const { docs: orders } = await payload.find({
    collection: "orders",
    depth: 2,
    where: {
      id: { equals: orderId },
    },
  });

  const [order] = orders as unknown as Order[];
  if (!order) return notFound();

  const orderUserId =
    typeof order.user === "string" ? order.user : order.user.id;

  if (orderUserId !== user?.id) {
    return redirect(`/login?origin=thank-you?orderId=${order.id}`);
  }

  return (
    <MainContainer className="pt-6 pb-12 lg:flex lg:items-center lg:gap-x-32">
      {/* Image */}
      <div className="relative aspect-square hidden lg:block lg:w-[55%]">
        <Image
          fill
          src="/assets/order-completed.png"
          className="h-full w-full object-cover object-center"
          alt="thank you for your order"
        />
      </div>

      <div className="flex flex-col gap-8 lg:w-[45%]">
        {/* Back to Shopping */}
        <Link
          href="/sneakers"
          className="w-fit flex items-center gap-2 py-2 font-medium text-primary-700 hover:text-secondary hover:underline hover:underline-offset-4 transition-all ease-in-out duration-300"
        >
          <Icon icon="solar:arrow-left-linear" height="1.25rem" />
          Continue Shopping
        </Link>

        {/* Status */}
        <PaymentStatus order={order} />

        <span className="h-px w-full bg-primary-300 rounded-full" />

        {/* Order Number */}
        <div className="grid grid-cols-2 gap-4 divide-x divide-primary-300">
          <div className="flex flex-col gap-0.5 font-semibold text-md">
            <div className="w-fit mx-auto">
              <p className="text-primary-500">Order Number</p>
              <p className="text-foreground">{order.id}</p>
            </div>
          </div>
          <div className="flex flex-col gap-0.5 font-semibold text-md">
            <div className="w-fit mx-auto">
              <p className="text-primary-500">Date</p>
              <p className="text-foreground">
                {format(new Date(order.createdAt), "dd MMMM yyyy")}
              </p>
            </div>
          </div>
        </div>

        {/* Products */}
        <ul className="py-5 border-y border-primary-300">
          {(order.products as Product[]).map((product) => (
            <li key={product.id}>
              <ProductOrder product={product} size={10} price={136} />
            </li>
          ))}
        </ul>

        {/* Subtotal */}
        <div className="flex flex-col gap-2 font-semibold text-primary-500">
          <div className="flex items-center justify-between gap-8">
            <span className="">Subtotal</span>
            <span className="">{formatPrice(272)}</span>
          </div>
          <div className="flex items-center justify-between gap-8">
            <span className="">Shipping</span>
            <span className="">{formatPrice(14.99)}</span>
          </div>
          <div className="flex items-center justify-between gap-8">
            <span className="">Tax</span>
            <span className="">{formatPrice(272)}</span>
          </div>
        </div>

        <span className="h-px w-full bg-primary-300 rounded-full" />

        {/* Total */}
        <div className="flex items-center justify-between font-bold text-xl">
          <span className="">Total</span>
          <span className="">{formatPrice(272)}</span>
        </div>
      </div>
    </MainContainer>
  );
};

export default ThankYouPage;
