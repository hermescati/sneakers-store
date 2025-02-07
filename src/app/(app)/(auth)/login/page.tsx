'use client'

import Button from '@/components/base/Button'
import Input from '@/components/base/Input'
import Link from '@/components/base/Link'
import MainContainer from '@/components/MainContainer'
import { LoginValidationSchema, TLoginValidationSchema } from '@/lib/validators'
import { userLogin } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const LoginForm = () => {
  const router = useRouter()

  const searchParams = useSearchParams()
  const origin = searchParams.get('origin')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TLoginValidationSchema>({
    resolver: zodResolver(LoginValidationSchema)
  })

  const onSubmit = async ({ email, password }: TLoginValidationSchema) => {
    const { code, user } = await userLogin({ email, password })

    if (!user) {
      const errorMessage =
        code === 409
          ? 'Invalid email or password.'
          : 'Something went wrong. Please try again!'
      toast.error(errorMessage)
      return
    }

    toast.success('Signed in successfully.')
    router.refresh()

    origin ? router.push(`/${origin}`) : router.push('/')
  }

  return (
    <MainContainer className="flex h-[90dvh] lg:h-[83dvh] items-center justify-center">
      <section className="flex w-full flex-col justify-center sm:w-[500px]">
        <header className="flex flex-col leading-tight">
          <h2 className="font-bold text-3xl">
            Login
          </h2>
          <h3 className="text-xl lg:text-base text-primary-700">to view all your orders</h3>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-4 py-8'>
            <Input
              {...register('email')}
              type="email"
              label="Email"
              placeholder="you@example.com"
              required
              invalid={!!errors.email}
              error={errors.email?.message}
            />
            <Input
              {...register('password')}
              type="password"
              label="Password"
              placeholder="Password"
              required
              invalid={!!errors.password}
              error={errors.password?.message}
            />
            <Link
              underline
              href="/login"
              className="w-fit -mt-2 font-medium text-md text-primary-600 hover:text-secondary"
            >
              Forgot password?
            </Link>
          </div>
          <Button label="Sign in" className="w-full" />
          <Button
            variant="ghost"
            intent="secondary"
            href="/signup"
            label="Don't have an account"
            className="w-full mt-4 font-medium dark:font-medium hover:underline hover:underline-offset-4" />
        </form>
      </section>
    </MainContainer>
  )
}

const Login = () => {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}

export default Login
