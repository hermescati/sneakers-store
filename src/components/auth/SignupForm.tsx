'use client'

import { RegistrationSchema, RegistrationSchemaObject } from "@/lib/validators"
import { createUser } from "@/services/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import Button from "../base/Button"
import Input from "../base/Input"
import Link from "../base/Link"
import toast from "../base/Toast"

const SignupForm = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegistrationSchema>({
        resolver: zodResolver(RegistrationSchemaObject)
    })

    const onSubmit = async (inputData: RegistrationSchema) => {
        try {
            const { code, message, data: sentToEmail } = await createUser(inputData)

            if (code === 409) {
                return toast.warning(message)
            }
            if (code === 201) {
                toast.success(`Verification email sent to ${sentToEmail}`)
                return router.replace('/verify?to=' + sentToEmail)
            }
            toast.error(message)
        } catch (error) {
            toast.error('An unexpected error occured. Try again later')
        }
    }

    return (
        <form
            className="flex flex-col gap-10"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
                <div className='flex flex-col gap-4 lg:flex-row'>
                    <Input
                        {...register('firstName')}
                        label="First Name"
                        placeholder="John"
                        required
                        invalid={!!errors.firstName}
                        error={errors.firstName?.message}
                        autoComplete="new-password"
                        tabIndex={1}
                    />
                    <Input
                        {...register('lastName')}
                        label="Last Name"
                        placeholder="Doe"
                        required
                        invalid={!!errors.lastName}
                        error={errors.lastName?.message}
                        autoComplete="new-password"
                        tabIndex={2}
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
                    tabIndex={3}
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
                    tabIndex={4}
                />
                <p className="font-normal text-primary-700 text-md">
                    By clicking &#8220;Create Account&#8221;, you agree to our{' '}
                    <Link
                        href="/register"
                        className="underline underline-offset-4 font-medium hover:text-secondary"
                    >
                        Terms and Conditions
                    </Link>{' '}
                    and{' '}
                    <Link
                        href="/register"
                        className="underline underline-offset-4 font-medium hover:text-secondary"
                    >
                        Privacy Policy
                    </Link>
                    .
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <Button label="Create Account" tabIndex={5} />
                <p className="font-medium text-primary-600">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        underline
                        className="font-semibold text-secondary dark:text-foreground"
                        tabIndex={6}>
                        Login
                    </Link>
                </p>
            </div>
        </form>
    )
}

export default SignupForm