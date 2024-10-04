"use client";

import Button from "@/components/base/Button";
import Input from "@/components/base/Input";
import MainContainer from "@/components/MainContainer";
import {
  LoginValidationSchema,
  TLoginValidationSchema,
} from "../../../lib/validators/login-validator";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isRetailer = searchParams.get("as") === "retailer";
  const origin = searchParams.get("origin");

  const continueAsSeller = () => {
    router.push("?as=retailer");
  };

  const continueAsBuyer = () => {
    router.replace("/login", undefined);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginValidationSchema>({
    resolver: zodResolver(LoginValidationSchema),
  });

  const { mutate: signIn, isLoading } = trpc.auth.login.useMutation({
    onSuccess: async () => {
      toast.success("Signed in successfully");

      if (origin) {
        router.push(`/${origin}`);
        return;
      }

      if (isRetailer) {
        router.push("/admin");
        return;
      }

      router.push("/");
      router.refresh();
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid email or password.");
      }
    },
  });

  const onSubmit = ({ email, password }: TLoginValidationSchema) => {
    signIn({ email, password });
  };

  return (
    <MainContainer>
      <div className="w-full relative flex pt-16 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center sm:w-[500px]">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-xl sm:text-2xl">
              Login to your {isRetailer ? "Retailer." : "Sneakers."} account
            </h2>
            <Link
              href="signup"
              className="text-primary-600 hover:underline hover:underline-offset-4 hover:text-secondary transition-all ease-in-out duration-150"
            >
              Don&apos;t have an account?
            </Link>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 py-6"
          >
            <Input
              {...register("email")}
              label="Email"
              required
              placeholder="you@example.com"
              invalid={errors.email && true}
              error={errors.email?.message}
            />
            <Input
              {...register("password")}
              label="Password"
              required
              type="password"
              placeholder="Password"
              invalid={errors.password && true}
              error={errors.password?.message}
            />
            <Button
              label="Login"
              iconAppend="solar:arrow-right-linear"
              className="mt-4"
            />

            <span className="mt-2">
              <Link
                href=""
                className="text-md text-primary-500 hover:underline hover:underline-offset-4 hover:text-secondary transition-all ease-in-out duration-150"
              >
                Forgot password?
              </Link>
            </span>
          </form>

          <div className="relative flex my-4 items-center justify-center w-full">
            <span className="h-px w-full bg-primary-300" aria-hidden="true" />
            <span className="absolute bg-background px-2 text-sm uppercase text-primary-400">
              or
            </span>
          </div>

          {isRetailer ? (
            <Button
              onClick={continueAsBuyer}
              variant="ghost"
              disabled={isLoading}
              label="Continue as customer"
              className="mt-6"
            />
          ) : (
            <Button
              onClick={continueAsSeller}
              variant="ghost"
              intent="secondary"
              disabled={isLoading}
              label="Continue as seller"
              className="mt-6 underline underline-offset-4"
            />
          )}
        </div>
      </div>
    </MainContainer>
  );
};

export default Page;
