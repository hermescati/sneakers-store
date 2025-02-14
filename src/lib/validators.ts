import { z } from 'zod'

const trimString = (val: unknown) => typeof val === 'string' ? val.trim() : val

export const RegistrationSchemaObject = z.object({
  firstName: z.preprocess(
    trimString,
    z.string().trim().min(2, { message: `C'mon, you gotta have a first name!` })
  ),
  lastName: z.preprocess(
    trimString,
    z.string().trim().min(2, { message: `You ain't a ghost, keep it real!` })
  ),
  email: z.preprocess(
    trimString,
    z.string().trim().email({ message: `That email doesn't look right, try again.` })
  ),
  password: z.string()
    .min(8, { message: `Passwords gotta be at least 8 characters, no weak links!` })
    .regex(/[A-Z]/, { message: `Add at least one uppercase letter, make it strong.` })
    .regex(/[a-z]/, { message: `One lowercase letter won't hurt, right?` })
    .regex(/[0-9]/, { message: `Throw in a number for extra security.` })
    .regex(/[^a-zA-Z0-9]/, { message: `One special character, just to spice things up.` })
})

export const LoginSchemaObject = z.object({
  email: z.preprocess(
    trimString,
    z.string().email({ message: `That email doesn't look right, try again.` })
  ),
  password: z.string().min(1, { message: `Password's required. No free passes!` })
})

export const ForgotPassSchemaObject = LoginSchemaObject.pick({ email: true })

export type RegistrationSchema = z.infer<typeof RegistrationSchemaObject>
export type LoginSchema = z.infer<typeof LoginSchemaObject>
export type ForgotPassSchema = z.infer<typeof ForgotPassSchemaObject>

export const DiscountCodeSchema = z.object({
  code: z.string().trim().min(1, { message: 'Invalid disount code.' })
})

export type TDiscountCodeSchema = z.infer<typeof DiscountCodeSchema>
