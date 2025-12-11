"use client";

import { updateMyTrip } from "@/actions/trip";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const editTripSchema = z.object({
    destination: z.string().min(1, "Destination is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    budget: z.coerce.number().min(0, "Budget must be positive"),
    travelType: z.string().min(1, "Travel type is required"),
    description: z.string().min(1, "Description is required"),
    maxGroupSize: z.coerce.number().min(2, "Group size must be at least 2"),
    activities: z.string().optional(),
});

type TEditTrip = z.infer<typeof editTripSchema>;

interface EditTripFormProps {
    trip: any;
    onSuccess?: () => void;
}

export default function EditTripForm({ trip, onSuccess }: EditTripFormProps) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [existingPhotos, setExistingPhotos] = useState<string[]>(
        Array.isArray(trip.photos) ? trip.photos : []
    );

    const form = useForm<TEditTrip>({
        resolver: zodResolver(editTripSchema) as any,
        defaultValues: {
            destination: trip.destination || "",
            startDate: trip.startDate ? new Date(trip.startDate).toISOString().split('T')[0] : "",
            endDate: trip.endDate ? new Date(trip.endDate).toISOString().split('T')[0] : "",
            budget: trip.budget || 0,
            travelType: Array.isArray(trip.travelType) ? trip.travelType.join(", ") : trip.travelType || "",
            description: trip.description || "",
            maxGroupSize: trip.maxGroupSize || 2,
            activities: Array.isArray(trip.activities) ? trip.activities.join(", ") : trip.activities || "",
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const totalImages = files.length + selectedFiles.length + existingPhotos.length;

        // Check total number of files
        if (totalImages > 5) {
            toast({
                title: "Error",
                description: "Maximum 5 images allowed",
                variant: "destructive",
            });
            e.target.value = ''; // Reset input
            return;
        }

        // Check individual file sizes (5MB max per file)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        const oversizedFiles = files.filter(file => file.size > maxSize);

        if (oversizedFiles.length > 0) {
            toast({
                title: "Error",
                description: `Some files are too large. Maximum size is 5MB per image.`,
                variant: "destructive",
            });
            e.target.value = ''; // Reset input
            return;
        }

        setSelectedFiles(prev => [...prev, ...files]);

        // Create previews
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeNewImage = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingPhoto = (index: number) => {
        setExistingPhotos(prev => prev.filter((_, i) => i !== index));
    };

    const onSubmit = async (values: TEditTrip) => {
        setIsLoading(true);
        try {
            const formData = new FormData();

            // Append required fields
            formData.append("destination", values.destination);
            formData.append("startDate", values.startDate);
            formData.append("endDate", values.endDate);
            formData.append("budget", values.budget.toString());
            formData.append("description", values.description);
            formData.append("maxGroupSize", values.maxGroupSize.toString());

            // Handle travelType
            if (values.travelType) {
                const types = values.travelType.split(",").map(s => s.trim()).filter(s => s);
                types.forEach(type => {
                    formData.append("travelType[]", type);
                });
            }

            // Handle activities
            if (values.activities) {
                const acts = values.activities.split(",").map(s => s.trim()).filter(s => s);
                acts.forEach(activity => {
                    formData.append("activities[]", activity);
                });
            }

            // Append existing photo URLs
            existingPhotos.forEach(url => {
                formData.append("existingPhotos[]", url);
            });

            // Handle new photo files
            selectedFiles.forEach(file => {
                formData.append("photos", file);
            });

            const res = await updateMyTrip(trip._id, formData);
            if (res?.success) {
                toast({
                    title: "Success",
                    description: "Trip updated successfully",
                    className: "bg-green-500 text-white",
                });
                onSuccess?.();
            } else {
                toast({
                    title: "Error",
                    description: res?.message || "Failed to update trip",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const totalImages = existingPhotos.length + selectedFiles.length;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="destination"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Destination</FormLabel>
                                <FormControl>
                                    <Input placeholder="Paris, France" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Budget</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="1000" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="travelType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Travel Type (comma separated)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Adventure, Leisure" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="maxGroupSize"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Max Group Size</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <textarea
                                    className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Tell us about the trip..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="activities"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Activities (comma separated, optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="Hiking, Sightseeing" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Image Upload Section */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Trip Photos (max 5)</label>
                    <div className="flex flex-wrap gap-3">
                        {/* Existing Photos */}
                        {existingPhotos.map((photo, index) => (
                            <div key={`existing-${index}`} className="relative w-20 h-20 rounded-lg overflow-hidden border">
                                <Image
                                    src={photo}
                                    alt={`Existing ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeExistingPhoto(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        ))}

                        {/* New Preview Images */}
                        {previews.map((preview, index) => (
                            <div key={`new-${index}`} className="relative w-20 h-20 rounded-lg overflow-hidden border border-blue-300">
                                <Image
                                    src={preview}
                                    alt={`New ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeNewImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                                <span className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white text-[10px] text-center">New</span>
                            </div>
                        ))}

                        {/* Add Image Button */}
                        {totalImages < 5 && (
                            <label className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <ImagePlus className="h-6 w-6 text-gray-400" />
                            </label>
                        )}
                    </div>
                    <p className="text-xs text-gray-500">{totalImages}/5 images</p>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update Trip"}
                </Button>
            </form>
        </Form>
    );
}
