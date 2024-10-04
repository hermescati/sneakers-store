"use client";

import Button from "@/components/base/Button";
import Input from "@/components/base/Input";
import MainContainer from "@/components/MainContainer";
import {
  SignUpValidationSchema,
  TSignUpValidationSchema,
} from "@/lib/validators/signup-validator";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpValidationSchema>({
    resolver: zodResolver(SignUpValidationSchema),
  });

  const router = useRouter();

  const { mutate, isLoading } = trpc.auth.createUser.useMutation({
    onError: (err) => {
      if (err.data?.code === "CONFLICT") {
        toast.error("This email is already in use. Maybe login?");
        return;
      }

      toast.error("Something went wrong. Please try again.");
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(`Verification email sent to ${sentToEmail}`);
      router.replace("/verify?to=" + sentToEmail);
    },
  });

  const onSubmit = ({
    firstName,
    lastName,
    email,
    password,
  }: TSignUpValidationSchema) => {
    mutate({ firstName, lastName, email, password });
  };

  return (
    <MainContainer>
      <div className="w-full relative flex pt-16 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center sm:w-[500px]">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-xl sm:text-2xl">
              Looks like you&#39;re new here.
            </h2>
            <Link
              href="login"
              className="text-primary-600 hover:underline hover:underline-offset-4 hover:text-secondary transition-all ease-in-out duration-150"
            >
              Already have an account? Login
            </Link>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 py-6"
          >
            <Input
              {...register("firstName")}
              label="First Name"
              required
              placeholder="John"
              invalid={errors.firstName && true}
              error={errors.firstName?.message}
            />
            <Input
              {...register("lastName")}
              label="Last Name"
              required
              placeholder="Doe"
              invalid={errors.lastName && true}
              error={errors.lastName?.message}
            />
            <Input
              {...register("email")}
              label="Email"
              required
              placeholder="you@example.com"
              invalid={errors.email && true}
              error={errors.email?.message}
              autoComplete="new-password"
            />
            <Input
              {...register("password")}
              label="Password"
              required
              type="password"
              placeholder="Password"
              invalid={errors.password && true}
              error={errors.password?.message}
              autoComplete="new-password"
            />
            <p className="font-medium text-primary-500 text-sm md:text-md">
              By clicking &#34;Create Account&#34;, you agree to our{" "}
              <Link
                href="/"
                className="underline underline-offset-4 hover:text-secondary transition-all ease-in-out duration-150"
              >
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link
                className="underline underline-offset-4 hover:text-secondary transition-all ease-in-out duration-150"
                href="/"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <Button
              label="Create Account"
              iconAppend="solar:arrow-right-linear"
              className="mt-4"
            />
          </form>
        </div>
      </div>
    </MainContainer>
  );
};

export default Page;
