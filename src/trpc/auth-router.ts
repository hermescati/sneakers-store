import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getPayloadClient } from "../get-payload";
import { LoginValidationSchema } from "../lib/validators/login-validator";
import { SignUpValidationSchema } from "../lib/validators/signup-validator";
import { publicProcedure, router } from "./trpc";

export const authRouter = router({
  createUser: publicProcedure
    .input(SignUpValidationSchema)
    .mutation(async ({ input }) => {
      const { firstName, lastName, email, password } = input;
      const payload = await getPayloadClient();

      const { docs: users } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (users.length !== 0) throw new TRPCError({ code: "CONFLICT" });

      await payload.create({
        collection: "users",
        data: {
          firstName,
          lastName,
          email,
          password,
          role: "user",
        },
      });

      return { success: true, sentToEmail: email };
    }),

  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input;
      const payload = await getPayloadClient();

      const isVerified = await payload.verifyEmail({
        collection: "users",
        token,
      });

      if (!isVerified) throw new TRPCError({ code: "UNAUTHORIZED" });

      return { success: true };
    }),

  login: publicProcedure
    .input(LoginValidationSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res } = ctx;

      const payload = await getPayloadClient();

      try {
        await payload.login({
          collection: "users",
          data: {
            email,
            password,
          },
          res,
        });

        return { success: true };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),
});
