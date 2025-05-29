'use client'

import routes from '@/lib/routes'
import { verifyUser } from '@/services/auth'
import { BaseResponse } from '@/types'
import { useEffect, useState } from 'react'
import Button from '../base/button/Button'
import StatusIcon from './StatusIcon'

interface VerifyEmailProps {
  token: string
}

const VerificationStatus = ({ token }: VerifyEmailProps) => {
  const [response, setResponse] = useState<BaseResponse>()

  useEffect(() => {
    const verify = async () => {
      const result = await verifyUser(token)
      setResponse(result)
    }

    verify()
  }, [token])

  if (!response) {
    return (
      <div className="flex flex-col items-center gap-6">
        <StatusIcon status="pending" />
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold">Verifying...</h2>
          <p className="max-w-md text-center font-medium text-primary-600">
            This wont take long. Please wait!
          </p>
        </div>
      </div>
    )
  }

  if (response.code === 200) {
    return (
      <div className="flex flex-col items-center gap-6">
        <StatusIcon status="completed" />
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold">You&apos;re all set!</h2>
          <p className="max-w-md text-center font-medium text-primary-600">
            Thank you for verifying your email.
          </p>
        </div>
        <Button
          href={routes.auth.login}
          label="Sign in"
          className="mt-2"
          iconPrepend="solar:login-2-outline"
        />
      </div>
    )
  }

  if (response.code === 403) {
    return (
      <div className="flex flex-col items-center gap-8">
        <StatusIcon status="rejected" />
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold">There was a problem</h2>
          <p className="max-w- text-center font-medium text-primary-600">
            This token is not valid or might be expired. Please try again!
          </p>
        </div>
      </div>
    )
  }
}

export default VerificationStatus
