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
      <div className="flex flex-col gap-6 items-center">
        <StatusIcon status="pending" />
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-2xl">Verifying...</h2>
          <p className="text-center font-medium text-primary-600 max-w-md">
            This wont take long. Please wait!
          </p>
        </div>
      </div>
    )
  }

  if (response.code === 200) {
    return (
      <div className="flex flex-col gap-6 items-center">
        <StatusIcon status="completed" />
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-2xl">You&apos;re all set!</h2>
          <p className="text-center font-medium text-primary-600 max-w-md">
            Thank you for verifying your email.
          </p>
        </div>
        <Button
          href={routes.auth.login}
          label="Sign in"
          className='mt-2'
          iconPrepend="solar:login-2-outline"
        />
      </div>
    )
  }

  if (response.code === 403) {
    return (
      <div className="flex flex-col gap-8 items-center">
        <StatusIcon status="rejected" />
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-2xl">There was a problem</h2>
          <p className="text-center font-medium text-primary-600 max-w-">
            This token is not valid or might be expired. Please try again!
          </p>
        </div>
      </div>
    )
  }
}

export default VerificationStatus
