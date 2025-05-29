'use client'

import routes from '@/lib/routes'
import { RegistrationSchema, RegistrationSchemaObject } from '@/lib/validators'
import { createUser } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Button from '../base/button/Button'
import Input from '../base/input/Input'
import Link from '../base/Link'
import toast from '../base/toast/Toast'

const RegistrationForm = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegistrationSchema>({
    resolver: zodResolver(RegistrationSchemaObject),
    mode: 'onBlur'
  })

  const onSubmit = async (inputData: RegistrationSchema) => {
    try {
      const { code, message, data: sentToEmail } = await createUser(inputData)

      if (code === 409) {
        return toast.warning(message)
      }
      if (code === 201) {
        return router.replace(`${routes.auth.verify}?to=${sentToEmail}`)
      }

      toast.error(message)
    } catch (error) {
      toast.error('An unexpected error occured. Try again later')
    }
  }

  return (
    <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('name')}
        label="Full name"
        placeholder="e.g. Spaceman Spiff"
        required
        invalid={!!errors.name}
        error={errors.name?.message}
        autoComplete="new-password"
        tabIndex={1}
      />
      <Input
        {...register('email')}
        type="email"
        label="Email"
        placeholder="e.g. you@example.com"
        required
        invalid={!!errors.email}
        error={errors.email?.message}
        autoComplete="new-password"
        tabIndex={2}
      />
      <Input
        {...register('password')}
        type="password"
        label="Password"
        placeholder="e.g. ••••••••••"
        required
        hint="At least 8 characters, 1 uppercase, 1 number, 1 special character"
        invalid={!!errors.password}
        error={errors.password?.message}
        autoComplete="new-password"
        tabIndex={3}
      />
      <Input
        {...register('repeatPassword')}
        type="password"
        label="Repeat Password"
        placeholder="e.g. ••••••••••"
        required
        invalid={!!errors.repeatPassword}
        error={errors.repeatPassword?.message}
        autoComplete="new-password"
        tabIndex={4}
      />
      <p className="text-md font-normal text-primary-700">
        By clicking &#8220;Create Account&#8221;, you agree to our{' '}
        <Link
          href={routes.home}
          className="font-medium underline underline-offset-4 hover:text-secondary"
        >
          Terms and Conditions
        </Link>{' '}
        and{' '}
        <Link
          href={routes.home}
          className="font-medium underline underline-offset-4 hover:text-secondary"
        >
          Privacy Policy
        </Link>
        .
      </p>
      <Button label="Create Account" tabIndex={5} className="mt-4" />
      <p className="font-medium text-primary-600">
        Already have an account?{' '}
        <Link
          href={routes.auth.login}
          underline
          className="font-semibold text-secondary dark:text-foreground"
          tabIndex={6}
        >
          Login
        </Link>
      </p>
    </form>
  )
}

export default RegistrationForm
