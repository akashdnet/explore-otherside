import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export type TLogin = z.infer<typeof loginSchema>;




export const registerSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Name is required" })
        .min(3, { message: "Name must be at least 3 characters long" }),

    email: z
        .email({ message: "Invalid email address" }),

    password: z
        .string()
        .min(1, { message: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters long" }),

    confirmPassword: z
        .string()
        .min(1, { message: "Confirm Password is required" }),

    age: z.coerce.number().min(1, { message: "Age is required" }),

    gender: z.enum(["Male", "Female"], { message: "Gender is required" }),

    bio: z.string().max(100, { message: "Bio must be at most 100 characters" }).optional(),

    about: z.string().optional(),

    currentLocation: z.string().optional(),

    contactNumber: z.string().optional(),

    travelInterests: z.string().optional(), // Comma-separated

    visitedCountries: z.string().optional(), // Comma-separated

    image: z.any().optional(), // File input
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type TRegister = z.infer<typeof registerSchema>;
