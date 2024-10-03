"use client";

import Button from "@/components/base/Button";
import Input from "@/components/base/Input";
import {
  SignUpValidationSchema,
  TSignUpValidationSchema,
} from "@/lib/validation-schemas/sign-up-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpValidationSchema>({
    resolver: zodResolver(SignUpValidationSchema),
  });

  const onSubmit = ({ email, password }: TSignUpValidationSchema) => {
    console.log({ email }, { password });
  };

  return (
    <>
      <div className="w-full relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <h2 className="font-bold text-xl text-foreground">Sneakers.</h2>
            <h2 className="text-2xl font-bold">Create an account</h2>

            <Link href="login">Already have an account? Login</Link>

            <div className="grid container gap-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                  <Input
                    {...register("email")}
                    label="Email"
                    placeholder="you@example.com"
                    invalid={errors.email && true}
                    invalidMessage={errors.email?.message}
                  />
                  <Input
                    {...register("password")}
                    label="Password"
                    placeholder="password"
                    invalid={errors.password && true}
                    invalidMessage={errors.password?.message}
                  />
                  <Button label="Sign up" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
