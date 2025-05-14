'use client'

import { forgotPassword } from '@/services/auth'
import { cn } from '@/utils'
import Link from '../base/Link'
import toast from '../base/toast/Toast'
import Icon from '../base/Icon'

interface EmailSentProps {
  to: string
  variant: 'reset' | 'verify'
}

const EmailSent = ({ to, variant }: EmailSentProps) => {
  const handleResendEmail = async () => {
    try {
      const { code, message } = await forgotPassword({ email: to })

      if (code === 200) return toast.success(message)

      toast.error(message)
    } catch (error) {
      toast.error('Error during password reset email resend:')
    }
  }

  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <span className="rounded-full p-5 bg-warning-400/15 dark:bg-warning-600/10">
        <Icon icon="streamline:mail-send-envelope-solid" className="text-4xl text-warning" />
      </span>
      <div className="flex flex-col items-center justify-center">
        <h2 className="font-bold text-2xl">Check your email!</h2>
        <p className="mt-2 text-center font-medium text-primary-600 max-w-md">
          We&apos;ve sent a {variant === 'reset' ? 'password reset' : 'verification'} link to{' '}
          <span className={cn({ 'font-semibold text-foreground': to })}>{to || 'your email'}.</span>{' '}
          Please check your inbox.
        </p>
        {variant === 'reset' && !!to && (
          <p className="mt-6 text-center font-medium text-primary-600">
            Didn&apos;t receive the email?{' '}
            <Link underline onClick={handleResendEmail} className="font-semibold text-secondary">
              Resend
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}

export default EmailSent
