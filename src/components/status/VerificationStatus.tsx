import { verifyEmail } from '@/services/auth'
import Image from 'next/image'
import Button from '../base/Button'
import StatusIcon from './StatusIcon'

interface VerifyEmailProps {
  token: string
}

const VerificationStatus = async ({ token }: VerifyEmailProps) => {
  const response = await verifyEmail(token)

  if (response.code === 409) {
    return (
      <div className="flex flex-col gap-8 items-center">
        <StatusIcon status="rejected" />
        <div className="flex flex-col gap-1 items-center">
          <h2 className="font-bold text-2xl">There was a problem</h2>
          <p className="text-center font-medium text-primary-700">
            This token is not valid or might be expired. Please try again!
          </p>
        </div>
      </div>
    )
  } else if (response.code === 200) {
    return (
      <div className="flex flex-col items-center justify-center">
        <header className="relative h-96 w-96">
          <Image src="/email-sent.png" alt="email sent image" fill />
        </header>
        <h2 className="-mt-8 font-bold text-2xl">You&apos;re all set!</h2>
        <p className="mt-1 text-center font-medium text-primary-700">
          Thank you for verifying your email.
        </p>
        <Button
          href="/login"
          label="Sign in"
          className="mt-6"
          iconPrepend="solar:login-2-outline"
        />
      </div>
    )
  } else {
    return (
      <div className="flex flex-col gap-8 items-center">
        <StatusIcon status="pending" />
        <div className="flex flex-col gap-1 items-center">
          <h2 className="font-bold text-2xl">Verifying...</h2>
          <p className="text-center font-medium text-primary-700">
            This wont take long. Please wait!
          </p>
        </div>
      </div>
    )
  }
}

export default VerificationStatus
