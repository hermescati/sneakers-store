'use client'

import routes from '@/lib/routes'
import { ForgotPassSchema, ForgotPassSchemaObject } from '@/lib/validators'
import { forgotPassword } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Button from '../base/button/Button'
import Input from '../base/input/Input'
import Link from '../base/Link'
import toast from '../base/toast/Toast'

interface ForgotPassFormProps {
  onBack: VoidFunction
}

const ForgotPassForm = ({ onBack }: ForgotPassFormProps) => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPassSchema>({
    resolver: zodResolver(ForgotPassSchemaObject)
  })

  const onSubmit = async (inputData: ForgotPassSchema) => {
    try {
      const { code, message, data: sentToEmail } = await forgotPassword(inputData)

      if (code === 200) {
        return router.replace(`${routes.auth.reset}?to=${sentToEmail}`)
      }
      toast.error(message)
    } catch (error) {
      toast.error('An unexpected error occured. Try again later.')
    }
  }

  return (
    <>
      <header>
        <h1 className="font-bold text-2xl">Forgot your Password?</h1>
        <p className="font-medium text-primary-600">
          No worries! It happens. Enter your email address below and we&apos;ll send you a link
          shortly to reset your password.
        </p>
      </header>

      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('email')}
          type="email"
          label="Email"
          placeholder="e.g. you@example.com"
          required
          invalid={!!errors.email}
          error={errors.email?.message}
        />
        <Button label="Send Link" />
        <p className="font-medium text-primary-600">
          Remembered your password?{' '}
          <Link
            underline
            onClick={onBack}
            className="font-semibold text-secondary dark:text-foreground"
          >
            Back to Login
          </Link>
        </p>
      </form>
    </>
  )
}

export default ForgotPassForm
