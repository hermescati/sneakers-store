'use client'

import { LoginSchema, LoginSchemaObject } from "@/lib/validators"
import { userLogin } from "@/services/auth"
import { useUserStore } from "@/stores/userStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { User } from "payload"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Button from "../base/Button"
import Input from "../base/Input"
import Link from "../base/Link"
import toast from "../base/Toast"
import ForgotPassForm from "./ForgotPassForm"

interface LoginFormProps {
    origin?: string
}

const LoginForm = ({ origin }: LoginFormProps) => {
    const [isForgotPassword, setIsForgotPassword] = useState(false)

    const router = useRouter()
    const { setUser } = useUserStore()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginSchema>({
        resolver: zodResolver(LoginSchemaObject)
    })

    const onSubmit = async (inputData: LoginSchema) => {
        try {
            const { code, message, data } = await userLogin(inputData)
            const user = data as User

            if (code === 401 || !user) {
                return toast.error(message)
            }

            setUser(user)
            toast.success(message)

            router.refresh()
            origin ? router.push(`/${origin}`) : router.push('/')
        } catch (error) {
            toast.error('An unexpected error occured. Try again later.')
        }
    }

    if (isForgotPassword) {
        return <ForgotPassForm onBack={() => setIsForgotPassword(false)} />
    }

    return (
        <>
            <header>
                <h1 className='font-bold text-2xl'>Welcome Back, Sneakerhead</h1>
                <p className='font-medium text-primary-600'>
                    Sign in to track orders, save favorites, and shop effortlessly
                </p>
            </header>

            <form
                className="flex flex-col gap-10"
                onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-3">
                    <Input
                        {...register('email')}
                        type="email"
                        label="Email"
                        placeholder="you@example.com"
                        required
                        invalid={!!errors.email}
                        error={errors.email?.message}
                        tabIndex={1}
                    />
                    <Input
                        {...register('password')}
                        type="password"
                        label="Password"
                        placeholder="Password"
                        required
                        invalid={!!errors.password}
                        error={errors.password?.message}
                        tabIndex={2}
                    />
                    <Link
                        underline
                        onClick={() => setIsForgotPassword(true)}
                        className="w-fit place-self-end -mt-1 font-medium text-primary-600 hover:text-secondary"
                    >
                        Forgot password?
                    </Link>
                </div>
                <div className="flex flex-col gap-4">
                    <Button label="Login" tabIndex={4} />
                    <p className="font-medium text-primary-600">
                        Don&apos;t have an account yet?{" "}
                        <Link
                            href="/register"
                            underline
                            className="font-semibold text-secondary dark:text-foreground"
                            tabIndex={5}>
                            Create one
                        </Link>
                    </p>
                </div>
            </form>
        </>
    )
}

export default LoginForm