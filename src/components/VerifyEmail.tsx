"use client";

import { trpc } from "@/trpc/client";
import Image from "next/image";
import Button from "./base/Button";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <h3 className="font-semibold text-xl">There was a problem.</h3>
        <p className="text-sm">
          This token is not valid or might be expired. Please try again.
        </p>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative mb-4 h-60 w-60 text-foreground">
          <Image src="/assets/email-sent.png" alt="email sent image" fill />
        </div>
        <h3 className="font-semibold text-2xl">You&apos;re all set!</h3>
        <p className="text-center mt-1">Thank you for verifying your email.</p>
        <Button href="login" label="Login" className="mt-4" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <h3 className="font-semibold text-xl">Verifying...</h3>
        <p className="text-sm">This wont take long.</p>
      </div>
    );
  }
};

export default VerifyEmail;
