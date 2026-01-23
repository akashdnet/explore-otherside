// app/trips/create/validation.ts
import { z } from "zod";

const objectIdSchema = z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid Guide ID (must be a Mongo ObjectId)" });

const numberFromString = (fieldName: string) =>
    z.preprocess((val) => {
        if (typeof val === "string") {
            const trimmed = val.trim();
            if (trimmed === "") return val; // let zod handle required/number error
            const n = Number(trimmed);
            return Number.isFinite(n) ? n : val;
        }
        return val;
    }, z.number({ message: `${fieldName} must be a number` }));

const intFromString = (fieldName: string) =>
    numberFromString(fieldName).refine((n) => Number.isInteger(n), {
        message: `${fieldName} must be an integer`,
    });

const listItem = (label: string) =>
    z.object({
        text: z.string().trim().min(1, { message: `${label} item is required` }),
    });

const listOf = (label: string, minItems = 1, minMessage?: string) =>
    z.array(listItem(label)).min(minItems, { message: minMessage ?? `${label} is required` });

export const tripClientSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(1, { message: "Tour name is required" })
            .max(100, { message: "Tour name cannot exceed 100 characters" }),

        description: z
            .string()
            .min(1, { message: "Description is required" })
            .max(2000, { message: "Description cannot exceed 2000 characters" }),

        price: numberFromString("Price").refine((n) => n >= 0, {
            message: "Price cannot be negative",
        }),

        days: intFromString("Days").refine((n) => n >= 1, {
            message: "Tour must be at least 1 day",
        }),

        image: z
            .string()
            .min(1, { message: "Main image URL is required" })
            .url({ message: "Main image must be a valid URL" }),

        location: z.string().trim().min(1, { message: "Location is required" }),

        startDate: z.coerce.date({ message: "Invalid start date" }),
        endDate: z.coerce.date({ message: "Invalid end date" }),

        guide: objectIdSchema.optional().or(z.literal("")),

        travelType: z.enum(["Adventure", "Leisure", "Business", "Trekking", "Cultural", "Beach", "Mountain", "Urban"], {
            message: "Travel type is required",
        }),

        // ✅ FAQ-like dynamic arrays
        itinerary: listOf("Itinerary", 1, "Itinerary must contain at least one day"),
        highlights: listOf("Highlights", 1, "Highlights are required"),
        inclusions: listOf("Inclusions", 1, "Inclusions are required"),
        exclusions: listOf("Exclusions", 1, "Exclusions are required"),

        difficulty: z.enum(["Easy", "Moderate", "Challenging", "Moderate to Challenging"], {
            message: "Difficulty level is required",
        }),

        groupSize: intFromString("Group size").refine((n) => n >= 1, {
            message: "Group size must be at least 1",
        }),

        faq: z
            .array(
                z.object({
                    q: z.string().trim().min(1, "FAQ question is required").max(300),
                    a: z.string().trim().min(1, "FAQ answer is required").max(1000),
                })
            )
            .default([]),

        status: z.enum(["Open", "Full", "Completed"]).default("Open"),
    })
    .superRefine(({ startDate, endDate }, ctx) => {
        if (endDate < startDate) {
            ctx.addIssue({
                code: "custom",
                path: ["endDate"],
                message: "End date cannot be before start date",
            });
        }
    });

export type TripFormInput = z.input<typeof tripClientSchema>;
export type TripFormValues = z.output<typeof tripClientSchema>;