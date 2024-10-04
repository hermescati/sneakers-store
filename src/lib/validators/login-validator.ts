import { z } from "zod";

export const LoginValidationSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required." })
    .email({ message: "Please provide a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export type TLoginValidationSchema = z.infer<typeof LoginValidationSchema>;
