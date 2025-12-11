import { z } from "zod";

export const createTripSchema = z.object({
    destination: z.string().min(1, "Destination is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    budget: z.coerce.number().positive("Budget must be positive"),
    travelType: z.string().min(1, "Travel type is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    maxGroupSize: z.coerce.number().min(2, "Group size must be at least 2"),
    activities: z.string().optional(), // Will be parsed from comma-separated string
    photos: z.string().optional(), // Will be parsed from comma-separated string
});

export type TCreateTrip = z.infer<typeof createTripSchema>;
