import { z } from 'zod'

export const SignUpValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: 'First name is required.' })
    .min(2, { message: 'First name munst be at least 2 characters long' }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: 'Last name is required.' })
    .min(2, { message: 'Last name must be at least 2 characters long.' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Please provide a valid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter.'
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter.'
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Password must contain at least one special character.'
    })
})

export const LoginValidationSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Please provide a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' })
})

export const DiscountCodeSchema = z.object({
  code: z.string().trim().min(1, { message: 'Invalid disount code.' })
})

export type TSignUpValidationSchema = z.infer<typeof SignUpValidationSchema>
export type TLoginValidationSchema = z.infer<typeof LoginValidationSchema>
export type TDiscountCodeSchema = z.infer<typeof DiscountCodeSchema>
