'use client'

import Button from '@/components/base/Button'
import Input from '@/components/base/Input'
import Link from '@/components/base/Link'
import MainContainer from '@/components/MainContainer'
import {
  SignUpValidationSchema,
  TSignUpValidationSchema
} from '@/lib/validators'
import { createUser } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const Signup = () => {
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
    try {
      const { code, sentToEmail } = await createUser({
        firstName,
        lastName,
        email,
        password
      })

      switch (code) {
        case 400:
          return toast.error('Something went wrong. Please try again!')
        case 409:
          return toast.warning('This email is already in use. Maybe login?')
        default:
          toast.success(`Verification email sent to ${sentToEmail}`)
          router.replace('/verify?to=' + sentToEmail)
      }
    } catch (error) {
      toast.error('An unexpected error occured. Try again later!')
      console.error(error)
    }
  }

  return (
    <MainContainer className="flex h-[90dvh] lg:h-[83dvh] items-center justify-center">
      <section className="flex w-full flex-col justify-center sm:w-[500px]">
        <header className="flex flex-col leading-tight">
          <h1 className="font-bold text-3xl">
            Create an account
          </h1>
          <span className='text-xl lg:text-base text-primary-700'>
            Already have an account?
            <Link
              href="/login"
              underline
              className="font-semibold text-secondary ml-1"
            >
              Login
            </Link>
          </span>
        </header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 py-8">
            <div className='flex flex-col gap-4 lg:flex-row'>
              <Input
                {...register('firstName')}
                label="First Name"
                placeholder="John"
                required
                invalid={!!errors.firstName}
                error={errors.firstName?.message}
                autoComplete="new-password"
              />
              <Input
                {...register('lastName')}
                label="Last Name"
                placeholder="Doe"
                required
                invalid={!!errors.lastName}
                error={errors.lastName?.message}
                autoComplete="new-password"
              />
            </div>
            <Input
              {...register('email')}
              type="email"
              label="Email"
              placeholder="you@example.com"
              required
              invalid={!!errors.email}
              error={errors.email?.message}
              autoComplete="new-password"
            />
            <Input
              {...register('password')}
              type="password"
              label="Password"
              placeholder="Password"
              required
              invalid={!!errors.password}
              error={errors.password?.message}
              autoComplete="new-password"
            />
            <p className="font-normal text-primary-700 text-md">
              By clicking &#34;Create Account&#34;, you agree to our{' '}
              <Link
                href="/signup"
                className="font-medium underline underline-offset-4 hover:text-secondary"
              >
                Terms and Conditions
              </Link>{' '}
              and{' '}
              <Link
                href="/signup"
                className="font-medium underline underline-offset-4 hover:text-secondary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          <Button label="Create Account" className="w-full" />
        </form>
      </section>
    </MainContainer>
  )
}

export default Signup
