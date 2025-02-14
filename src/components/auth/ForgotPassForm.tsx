import { ForgotPassSchema, ForgotPassSchemaObject } from "@/lib/validators"
import { forgotPassword } from "@/services/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Button from "../base/Button"
import Input from "../base/Input"
import Link from "../base/Link"
import toast from "../base/Toast"

interface ForgotPassFormProps {
    onBack: VoidFunction
}

const ForgotPassForm = ({ onBack }: ForgotPassFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ForgotPassSchema>({
        resolver: zodResolver(ForgotPassSchemaObject)
    })

    const onSubmit = async ({ email }: ForgotPassSchema) => {
        try {
            const { code, message } = await forgotPassword(email)

            if (code !== 200) {
                toast.error(message)
            }

            toast.success(message)
            onBack()
        } catch (error) {
            toast.error('An unexpected error occured. Try again later.')
        }
    }

    return (
        <>
            <header>
                <h1 className='font-bold text-2xl'>Forgot Your Password?</h1>
                <p className='font-medium text-primary-600'>
                    Please enter your email address below. You will receive a link shortly to reset your password.
                </p>
            </header>

            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}>
                <Input
                    {...register('email')}
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    required
                    invalid={!!errors.email}
                    error={errors.email?.message}
                />
                <div className="flex flex-col gap-4">
                    <Button label="Reset my password" />
                    <p className="font-medium text-primary-600">
                        Remembered your password?{" "}
                        <Link
                            underline
                            onClick={onBack}
                            className="font-semibold text-secondary dark:text-foreground">
                            Back to Login
                        </Link>
                    </p>
                </div>
            </form>
        </>
    )
}

export default ForgotPassForm