"use client";

import { trpc } from "@/trpc/client";
import { Order } from "@/types/payload";
import { cn } from "@/utils";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PaymentStatus = ({ order }: { order: Order }) => {
  const router = useRouter();

  const { data } = trpc.payment.orderStatus.useQuery(
    { orderId: order.id },
    {
      enabled: order._isPaid === false,
      refetchInterval: (data) => (data?.isPaid ? false : 1000),
    }
  );

  useEffect(() => {
    if (data?.isPaid) router.refresh();
  }, [data?.isPaid, router]);

  const isSuccessful = order._isPaid;

  return (
    <div className="flex flex-col gap-6 lg:gap-12">
      {/* Icon*/}
      <div className="flex justify-center items-center">
        <div
          className={cn(
            "w-fit p-10 rounded-full transition-colors ease-in-out duration-300",
            isSuccessful ? "bg-success/5" : "bg-yellow-100/25"
          )}
        >
          <div
            className={cn(
              "p-5 rounded-full transition-colors ease-in-out duration-300",
              isSuccessful ? "bg-success/15" : "bg-yellow-200/50"
            )}
          >
            <Icon
              icon={
                isSuccessful
                  ? "solar:check-circle-bold"
                  : "solar:hourglass-bold-duotone"
              }
              className={cn(
                "text-6xl transition-colors ease-in-out duration-300",
                isSuccessful
                  ? "text-green-500"
                  : "text-yellow-500 animate-spin-180"
              )}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <div
          className={cn(
            "flex w-fit items-center justify-center py-2 px-4 rounded-full font-bold text-md transition-colors ease-in-out duration-300",
            isSuccessful
              ? "bg-success/10 text-green-500"
              : "bg-yellow-200/20 text-yellow-500"
          )}
        >
          {isSuccessful ? "Payment Successful" : "Pending Payment"}
        </div>
        <h1 className="text-3xl font-bold">Thank you for your order!</h1>
        {isSuccessful ? (
          <p className="text-base text-primary-600">
            Your order is confirmed, and we&apos;re just as excited as you are!.
            We&apos;ve sent your receipt and order details to your email{" "}
            {typeof order.user !== "string" && (
              <span className="font-semibold text-gray-900">
                {order.user.email}
              </span>
            )}
            .
          </p>
        ) : (
          <p className="text-base text-primary-600">
            We appreciate your order, and we&apos;re currently processing it. So
            hang tight and we&apos;ll send you the confirmation details very
            soon!
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;
