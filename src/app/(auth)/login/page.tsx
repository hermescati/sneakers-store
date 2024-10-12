'use client'

import Button from '@/components/base/Button'
import Input from '@/components/base/Input'
import MainContainer from '@/components/MainContainer'
import {
  LoginValidationSchema,
  TLoginValidationSchema
} from '@/lib/validators/login-validator'
import { userLogin } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const Page = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const isRetailer = searchParams.get('as') === 'retailer'
  const origin = searchParams.get('origin')

  const continueAsSeller = () => {
    router.push('?as=retailer')
  }

  const continueAsBuyer = () => {
    router.replace('/login', undefined)
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TLoginValidationSchema>({
    resolver: zodResolver(LoginValidationSchema)
  })

  const onSubmit = async ({ email, password }: TLoginValidationSchema) => {
    const response = await userLogin({ email, password })

    if (response.code === 409) {
      toast.error('Invalid email or password.')
      return
    }

    toast.success('Signed in successfully.')

    if (origin) {
      router.push(`/${origin}`)
      return
    }

    if (isRetailer) {
      router.push('/admin')
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <MainContainer className="flex items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center sm:w-[500px]">
        <div className="flex flex-col">
          <h2 className="font-bold text-2xl">
            Login to your {isRetailer ? 'Retailer.' : 'Sneakers.'} account
          </h2>
          <Link
            href="/signup"
            className="w-fit py-1 font-medium text-lg text-primary-500 hover:underline hover:underline-offset-4 hover:text-secondary transition-all ease-in-out duration-150"
          >
            Don&apos;t have an account?
          </Link>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 py-6"
        >
          <Input
            {...register('email')}
            label="Email"
            required
            placeholder="you@example.com"
            invalid={errors.email && true}
            error={errors.email?.message}
          />
          <Input
            {...register('password')}
            label="Password"
            required
            type="password"
            placeholder="Password"
            invalid={errors.password && true}
            error={errors.password?.message}
          />
          <Button
            label="Login"
            iconAppend="solar:login-2-outline"
            className="mt-5"
          />

          <Link
            href=""
            className="w-fit py-2 font-medium text-primary-500 hover:underline hover:underline-offset-4 hover:text-secondary transition-all ease-in-out duration-150"
          >
            Forgot password?
          </Link>
        </form>

        <div className="relative flex my-6 items-center justify-center w-full">
          <span className="h-px w-full bg-primary-300" aria-hidden="true" />
          <span className="absolute bg-background px-2 text-md uppercase text-primary-400">
            or
          </span>
        </div>

        {isRetailer ? (
          <Button
            onClick={continueAsBuyer}
            variant="ghost"
            // disabled={isLoading}
            label="Continue as customer"
            className="mt-6"
          />
        ) : (
          <Button
            onClick={continueAsSeller}
            variant="ghost"
            intent="secondary"
            // disabled={isLoading}
            label="Continue as seller"
            className="mt-6 underline underline-offset-4"
          />
        )}
      </div>
    </MainContainer>
  )
}

export default Page
