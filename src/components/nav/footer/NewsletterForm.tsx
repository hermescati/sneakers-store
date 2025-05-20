'use client'

import Button from '@/components/base/button/Button'
import Input from '@/components/base/input/Input'
import { NewsletterSchema, NewsletterSchemaObject } from '@/lib/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const NewsletterForm = () => {
  const pathname = usePathname()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<NewsletterSchema>({
    resolver: zodResolver(NewsletterSchemaObject)
  })

  const onSubmit = async (inputData: NewsletterSchema) => {
    console.log(inputData)
  }

  useEffect(() => {
    reset()
  }, [pathname])

  return (
    <div className="flex flex-col gap-2 p-6 rounded-2xl bg-primary-100 dark:bg-primary-200 shadow-md">
      <h2 className="font-bold text-2xl">Newsletter</h2>
      <p className="font-medium text-primary-700">
        Drop your email below, and get your weekly dose of new releases and special offers.
      </p>

      <form
        noValidate
        className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start gap-3 my-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          {...register('email')}
          type="email"
          placeholder="e.g. you@example.com"
          required
          invalid={!!errors.email}
          error={errors.email?.message}
        />
        <Button
          intent="secondary"
          label="Sign up"
          className="w-full sm:w-fit md:w-full lg:w-1/3 dark:text-background"
        />
      </form>

      <p className="text-md text-primary-700">
        Opt out at any time by clicking{' '}
        <span className="font-bold text-primary-800">&quot;Unsubscribe&quot;</span> at the bottom of
        any of our emails.
      </p>
    </div>
  )
}

export default NewsletterForm
