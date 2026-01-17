import {z} from "zod";

export const signupValidation = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.email(),
    password: z.string().min(6)
})