import { TRPCError } from "@trpc/server";
import type Stripe from "stripe";
import { z } from "zod";
import { getPayloadClient } from "../get-payload";
import { stripe } from "../lib/stripe";
import { Product } from "../types/payload";
import {
  formatCategory,
  getProductInfo,
  getProductPrice,
} from "../utils/product";
import { privateProcedure, router } from "./trpc";

export const paymentRouter = router({
  createSession: privateProcedure
    .input(
      z.object({
        selectedProducts: z.array(
          z.object({
            productId: z.string(),
            selectedSize: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      const { selectedProducts } = input;
      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

      if (!selectedProducts.length) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const payload = await getPayloadClient();

      const { docs } = await payload.find({
        collection: "products",
        where: {
          id: {
            in: selectedProducts.map((p) => p.productId),
          },
        },
      });

      const products = docs as unknown as Product[];

      selectedProducts.forEach((selection) => {
        const product = products.find((p) => p.id === selection.productId);

        if (!product) return;

        const selectedSize = product.available_sizes.find(
          (size) => size.size === selection.selectedSize
        );

        if (selectedSize) {
          const { brand, model } = getProductInfo(product);
          const category = formatCategory(product.category);

          const productPrice = getProductPrice(selectedSize);

          line_items.push({
            price_data: {
              currency: "USD",
              product_data: {
                name: `${brand} ${model} - ${product.nickname}`,
                description: `(US ${category}): ${selectedSize.size}`,
              },
              unit_amount: Math.round(productPrice * 100),
            },
            quantity: 1,
          });
        }
      });

      const order = await payload.create({
        collection: "orders",
        data: {
          _isPaid: false,
          products: selectedProducts.map((p) => p.productId),
          user: user.id,
        },
      });

      line_items.push({
        price_data: {
          currency: "USD",
          product_data: {
            name: "Processing Fee",
          },
          unit_amount: 1293,
        },
        quantity: 1,
      });

      try {
        const stripeSession = await stripe.checkout.sessions.create({
          success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
          cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
          payment_method_types: ["card"],
          shipping_options: [
            { shipping_rate: `${process.env.STRIPE_STANDART_DELIVERY}` },
            { shipping_rate: `${process.env.STRIPE_EXPRESS_DELIVERY}` },
          ],
          mode: "payment",
          metadata: {
            userId: user.id,
            orderId: order.id,
          },
          line_items,
          automatic_tax: { enabled: true },
        });

        return { url: stripeSession.url };
      } catch (err) {
        console.error(err);
        return { url: null };
      }
    }),

  orderStatus: privateProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ input }) => {
      const { orderId } = input;

      const payload = await getPayloadClient();
      const { docs: orders } = await payload.find({
        collection: "orders",
        where: {
          id: { equals: orderId },
        },
      });

      if (!orders.length) throw new TRPCError({ code: "NOT_FOUND" });

      const [order] = orders;

      return { isPaid: order._isPaid };
    }),
});
