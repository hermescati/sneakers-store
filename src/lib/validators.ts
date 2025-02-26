import { z } from 'zod'

const trimString = (val: unknown) => typeof val === 'string' ? val.trim() : val

const emailValidation = z.preprocess(trimString, z.string().email({ message: `That email doesn't look right, try again.` }))
const passwordValidation = z.string()
  .min(8, { message: `Passwords gotta be at least 8 characters, no weak links!` })
  .regex(/[A-Z]/, { message: `Add at least one uppercase letter, make it strong.` })
  .regex(/[a-z]/, { message: `One lowercase letter won't hurt, right?` })
  .regex(/[0-9]/, { message: `Throw in a number for extra security.` })
  .regex(/[^a-zA-Z0-9]/, { message: `One special character, just to spice things up.` })

export const RegistrationSchemaObject = z.object({
  name: z.preprocess(trimString, z.string().min(2, { message: `C'mon, you gotta have a name!` })),
  email: emailValidation,
  password: passwordValidation,
  repeatPassword: z.string()
}).refine(({ password, repeatPassword }) => password === repeatPassword, {
  path: ['repeatPassword'],
  message: `Passwords don't match, double-check 'em!`
})

export const LoginSchemaObject = z.object({
  email: emailValidation,
  password: z.string().min(1, { message: `Password's required. No free passes!` })
})

export const ForgotPassSchemaObject = z.object({
  email: emailValidation
})

export const ResetPassSchemaObject = z.object({
  password: passwordValidation,
  confirmPassword: passwordValidation
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
  path: ['confirmPassword'],
  message: `Passwords don't match, double-check 'em!`
})

export const DiscountCodeSchema = z.object({
  code: z.string().trim().min(1, { message: 'Invalid disount code.' })
})

export type RegistrationSchema = z.infer<typeof RegistrationSchemaObject>
export type LoginSchema = z.infer<typeof LoginSchemaObject>
export type ForgotPassSchema = z.infer<typeof ForgotPassSchemaObject>
export type ResetPassSchema = z.infer<typeof ResetPassSchemaObject>
export type TDiscountCodeSchema = z.infer<typeof DiscountCodeSchema>
