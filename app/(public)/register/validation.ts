import { z } from "zod";

export const userRegistrationValidation = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Please use a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    bio: z.string().max(100, "Bio cannot exceed 100 characters").optional(),
    about: z.string().optional(),
    photo: z.union([
        z.string().url("Photo must be a valid URL"),
        z.any().refine((file) => file instanceof File, "Photo must be a file")
    ]).optional(),
    age: z.preprocess((val) => {
        if (typeof val === "string") {
            if (val.trim() === "") return val;
            if (/^\d+$/.test(val)) return Number(val);
            return Number.NaN;
        }
        return val;
    }, z.number("Age is required").refine((n) => !Number.isNaN(n), "Age must be a number")),
    gender: z.enum(["Male", "Female"]),
    travelInterests: z.array(z.string()).optional(),
    visitedCountries: z.array(z.string()).optional(),
    currentLocation: z.string().optional(),
    contactNumber: z.string().optional(),
    role: z.enum(["user", "guide"]).default("user"),
    isVerified: z.boolean().optional().default(false),
});

export const userRegistrationClientSchema = userRegistrationValidation
    .extend({
        confirmPassword: z.string().min(1, "Confirm password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type UserRegistrationClientValues = z.infer<
    typeof userRegistrationClientSchema
>;