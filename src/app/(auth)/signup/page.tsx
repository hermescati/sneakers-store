'use client'

import Button from '@/components/base/Button'
import Input from '@/components/base/Input'
import MainContainer from '@/components/MainContainer'
import {
  SignUpValidationSchema,
  TSignUpValidationSchema
} from '@/lib/validators/signup-validator'
import { createUser } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const Page = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TSignUpValidationSchema>({
    resolver: zodResolver(SignUpValidationSchema)
  })

  const onSubmit = async ({
    firstName,
    lastName,
    email,
    password
  }: TSignUpValidationSchema) => {
    const { code, sentToEmail } = await createUser({
      firstName,
      lastName,
      email,
      password
    })

    if (code === 400) {
      toast.error('Something went wrong. Please try again.')
      return
    }

    if (code === 409) {
      toast.info('This email is already in use. Maybe login?')
      return
    }

    toast.success(`Verification email sent to ${sentToEmail}`)
    router.replace('/verify?to=' + sentToEmail)
  }

  return (
    <MainContainer className="flex items-center justify-center">
      <div className="w-full relative flex my-auto flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center sm:w-[500px]">
          <div className="flex flex-col">
            <h2 className="font-bold text-2xl">
              Looks like you&#39;re new here.
            </h2>
            <Link
              href="/login"
              className="w-fit py-1 font-medium text-lg text-primary-500 hover:underline hover:underline-offset-4 hover:text-secondary transition-all ease-in-out duration-150"
            >
              Already have an account? Login
            </Link>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 py-6"
          >
            <Input
              {...register('firstName')}
              label="First Name"
              required
              placeholder="John"
              invalid={errors.firstName && true}
              error={errors.firstName?.message}
            />
            <Input
              {...register('lastName')}
              label="Last Name"
              required
              placeholder="Doe"
              invalid={errors.lastName && true}
              error={errors.lastName?.message}
            />
            <Input
              {...register('email')}
              label="Email"
              required
              placeholder="you@example.com"
              invalid={errors.email && true}
              error={errors.email?.message}
              autoComplete="new-password"
            />
            <Input
              {...register('password')}
              label="Password"
              required
              type="password"
              placeholder="Password"
              invalid={errors.password && true}
              error={errors.password?.message}
              autoComplete="new-password"
            />
            <p className="font-medium text-primary-600 text-md">
              By clicking &#34;Create Account&#34;, you agree to our{' '}
              <Link
                href="/"
                className="underline underline-offset-4 hover:text-secondary transition-all ease-in-out duration-150"
              >
                Terms and Conditions
              </Link>{' '}
              and{' '}
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
              className="mt-5"
            />
          </form>
        </div>
      </div>
    </MainContainer>
  )
}

export default Page
