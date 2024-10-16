'use client'

import Button from '@/components/base/Button'
import Input from '@/components/base/Input'
import Link from '@/components/base/Link'
import MainContainer from '@/components/MainContainer'
import { LoginValidationSchema, TLoginValidationSchema } from '@/lib/validators'
import { userLogin } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const Page = () => {
  const router = useRouter()

  const searchParams = useSearchParams()
  const origin = searchParams.get('origin')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
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
    <MainContainer className="flex items-center justify-center">
      <section className="mx-auto flex w-full flex-col justify-center sm:w-[500px]">
        <header className="flex flex-col">
          <h1 className="font-bold text-4xl lg:text-3xl">Sneakers.</h1>
          <h3 className="font-medium text-xl text-primary-600">
            Sign in to your account
          </h3>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 py-12 lg:py-10"
        >
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
            href="/"
            className="w-fit py-1 -mt-2 text=primary-600 hover:text-secondary"
          >
            Forgot password?
          </Link>
          <Button label="Sign in" loading={isSubmitting} className="mt-6" />
        </form>

        <Link
          href="/signup"
          underline
          className="place-self-center w-fit py-1 -mt-4 font-medium text-primary-700 hover:text-secondary"
        >
          Don&apos;t have an account?
        </Link>
      </section>
    </MainContainer>
  )
}

export default Page
