'use client'

import { ResetPassSchema, ResetPassSchemaObject } from "@/lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Button from "../base/Button"
import Input from "../base/Input"
import Link from "../base/Link"
import { resetPassword } from "@/services/auth"
import toast from "../base/Toast"
import { useRouter } from "next/navigation"

interface ResetPassFormProps {
    token: string
}

const ResetPassForm = ({ token }: ResetPassFormProps) => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ResetPassSchema>({
        resolver: zodResolver(ResetPassSchemaObject),
        mode: 'onBlur'
    })

    const onSubmit = async (inputData: ResetPassSchema) => {
        try {
            const { code, message } = await resetPassword(token, inputData)

            if (code === 200) {
                toast.success(message)
                return router.push('/login')
            }

            toast.error(message)
        } catch (error) {
            toast.error('An unexpected error occured. Try again later')
        }
    }

    return (
        <>
            <header>
                <h1 className="font-bold text-2xl">Set new password</h1>
                <p className="font-medium text-primary-600">
                    Must be at least 8 characters long and contain a number, uppercase letter and a special character.
                </p>
            </header>

            <form
                className="flex flex-col gap-y-4"
                onSubmit={handleSubmit(onSubmit)}>
                <Input
                    {...register('password')}
                    type="password"
                    label="New Password"
                    placeholder="Enter your new password"
                    required
                    invalid={!!errors.password}
                    error={errors.password?.message}
                />
                <Input
                    {...register("confirmPassword")}
                    type="password"
                    label="Repeat new Password"
                    placeholder="Re-enter your password"
                    required
                    invalid={!!errors.confirmPassword}
                    error={errors.confirmPassword?.message}
                />
                <Button label="Reset my Password" className="mt-5" />
                <p className="font-medium text-primary-600">
                    Remembered your password?{" "}
                    <Link
                        href="/login"
                        underline
                        className="font-semibold text-secondary dark:text-foreground">
                        Back to Login
                    </Link>
                </p>
            </form>
        </>
    )
}

export default ResetPassForm