"use client";

import { registerTrip, updateMyTrip } from "@/actions/trip";
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useEffect, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { tripClientSchema, type TripFormInput, type TripFormValues } from "./validation";

interface TripFormProps {
    initialData?: any;
    onSuccess: () => void;
}

export default function TripForm({ initialData, onSuccess }: TripFormProps) {
    const [isPending, startTransition] = useTransition();

    // Helper to parse potential string dates to ISO format YYYY-MM-DD for input[type="date"]
    // Note: The form expects Date objects for the schema, but input[type="date"] usually works best with string "YYYY-MM-DD"
    // However, react-hook-form with zod schema expecting Date usually needs valueAsDate or Date object.
    // Let's stick to the existing schema which seems to expect Date for startDate/endDate.

    const defaultValues: Partial<TripFormInput> = {
        name: initialData?.title || initialData?.name || "Sylhet Adventure 2025",
        description: initialData?.description || "Experience the breathtaking beauty of Sylhet with its lush tea gardens and swamp forests. Includes boat rides and local cuisine.",
        price: initialData?.price || initialData?.budget || 5500,
        days: initialData?.days || 3,
        image: initialData?.photos?.[0] || initialData?.image || "https://images.unsplash.com/photo-1628103980643-22834b67776b?q=80&w=2070&auto=format&fit=crop",
        location: initialData?.location || initialData?.destination || "Sylhet, Bangladesh",
        startDate: initialData?.startDate ? new Date(initialData.startDate) : new Date(),
        endDate: initialData?.endDate ? new Date(initialData.endDate) : new Date(new Date().setDate(new Date().getDate() + 3)),
        guide: initialData?.guide || "",
        difficulty: initialData?.difficulty || "Moderate",
        groupSize: initialData?.groupSize || initialData?.maxGroupSize || 15,
        status: initialData?.status || "Open",
        travelType: (Array.isArray(initialData?.travelType) ? initialData.travelType[0] : initialData?.travelType) || "Adventure",
        itinerary: initialData?.itinerary?.map((text: string) => ({ text })) || [{ text: "Day 1: Arrival and Tea Garden Visit" }, { text: "Day 2: Ratargul Swamp Forest" }, { text: "Day 3: Bisnakandi and Return" }],
        highlights: initialData?.highlights?.map((text: string) => ({ text })) || initialData?.activities?.map((text: string) => ({ text })) || [{ text: "Boat Ride" }, { text: "Photography" }, { text: "Hiking" }],
        inclusions: initialData?.inclusions?.map((text: string) => ({ text })) || [{ text: "Transport" }, { text: "Hotel Stay" }, { text: "All Meals" }],
        exclusions: initialData?.exclusions?.map((text: string) => ({ text })) || [{ text: "Personal Expenses" }],
        faq: initialData?.faq || [{ q: "Is this suitable for kids?", a: "Yes, definitely." }],
    };

    const form = useForm<TripFormInput>({
        resolver: zodResolver(tripClientSchema),
        defaultValues,
        mode: "onSubmit",
    });

    // Reset form if initialData changes (e.g. opening different edit modal)
    useEffect(() => {
        if (initialData) {
            form.reset(defaultValues);
        } else {
            // Dummy Data Reset for Create Mode
            form.reset({
                name: "Sylhet Adventure 2025",
                description: "Experience the breathtaking beauty of Sylhet with its lush tea gardens and swamp forests. Includes boat rides and local cuisine.",
                price: 5500,
                days: 3,
                image: "https://images.unsplash.com/photo-1628103980643-22834b67776b?q=80&w=2070&auto=format&fit=crop",
                location: "Sylhet, Bangladesh",
                startDate: new Date(),
                endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
                guide: "",
                difficulty: "Moderate",
                groupSize: 15,
                status: "Open",
                travelType: "Adventure",
                itinerary: [{ text: "Day 1: Arrival and Tea Garden Visit" }, { text: "Day 2: Ratargul Swamp Forest" }, { text: "Day 3: Bisnakandi and Return" }],
                highlights: [{ text: "Boat Ride" }, { text: "Photography" }, { text: "Hiking" }],
                inclusions: [{ text: "Transport" }, { text: "Hotel Stay" }, { text: "All Meals" }],
                exclusions: [{ text: "Personal Expenses" }],
                faq: [{ q: "Is this suitable for kids?", a: "Yes, definitely." }],
            });
        }
    }, [initialData, form]);


    const itineraryArray = useFieldArray({ control: form.control, name: "itinerary" });
    const highlightsArray = useFieldArray({ control: form.control, name: "highlights" });
    const inclusionsArray = useFieldArray({ control: form.control, name: "inclusions" });
    const exclusionsArray = useFieldArray({ control: form.control, name: "exclusions" });
    const faqArray = useFieldArray({ control: form.control, name: "faq" });

    const onSubmit = (rawValues: TripFormInput) => {
        startTransition(async () => {
            try {
                const values: TripFormValues = tripClientSchema.parse(rawValues);
                const payload = {
                    name: values.name,
                    title: values.name,
                    destination: values.location,
                    location: values.location,
                    description: values.description,
                    budget: values.price,
                    price: values.price,
                    days: values.days,
                    image: values.image,
                    photos: [values.image],
                    startDate: values.startDate.toISOString(),
                    endDate: values.endDate.toISOString(),
                    activities: values.highlights.map(h => h.text).filter(t => t && t.trim()),
                    highlights: values.highlights.map(h => h.text).filter(t => t && t.trim()),
                    travelType: values.travelType ? [values.travelType] : [],
                    itinerary: values.itinerary.map(i => i.text),
                    inclusions: values.inclusions.map(i => i.text),
                    exclusions: values.exclusions.map(i => i.text),
                    faq: values.faq,
                    difficulty: values.difficulty,
                    maxGroupSize: values.groupSize,
                    groupSize: values.groupSize,
                    status: values.status,
                };

                let res;
                if (initialData?._id || initialData?.id) {
                    const id = initialData._id || initialData.id;
                    res = await updateMyTrip(id, payload);
                } else {
                    res = await registerTrip(payload);
                }

                if (res?.success) {
                    toast.success(initialData ? "Trip updated successfully" : "Trip created successfully");
                    onSuccess();
                } else {
                    if (res?.errorMessages && Array.isArray(res.errorMessages)) {
                        res.errorMessages.forEach((err: any) => {
                            toast.error(`${err.path}: ${err.message}`);
                        });
                    } else if (res?.errors && Array.isArray(res.errors)) {
                        res.errors.forEach((err: any) => {
                            toast.error(`${err.field}: ${err.message}`);
                        });
                    } else {
                        toast.error(res?.message || res?.error || "Something went wrong");
                    }
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to submit form");
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-h-[80vh] overflow-y-auto px-1">
                {/* Basic */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tour Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g. Cox's Bazar Adventure"
                                        disabled={isPending}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Destination</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g. Cox's Bazar"
                                        disabled={isPending}
                                        {...field}
                                    />
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
                                <Textarea
                                    placeholder="Write trip details (max 2000 chars)"
                                    disabled={isPending}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
                                        disabled={isPending}
                                        value={field.value ? new Date(field.value as string | number | Date).toISOString().split('T')[0] : ""}
                                        onChange={(e) => field.onChange(e.target.valueAsDate)}
                                    />
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
                                    <Input
                                        type="date"
                                        disabled={isPending}
                                        value={field.value ? new Date(field.value as string | number | Date).toISOString().split('T')[0] : ""}
                                        onChange={(e) => field.onChange(e.target.valueAsDate)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="days"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Days</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 3"
                                        disabled={isPending}
                                        value={(field.value as number) ?? ""}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Pricing & Group */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Budget / Price</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 5000"
                                        disabled={isPending}
                                        value={(field.value as number) ?? ""}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="groupSize"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Max Group Size</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 10"
                                        disabled={isPending}
                                        value={(field.value as number) ?? ""}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="difficulty"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Difficulty</FormLabel>
                                <Select
                                    disabled={isPending}
                                    value={(field.value as string) ?? undefined}
                                    onValueChange={field.onChange}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select difficulty" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="Easy">Easy</SelectItem>
                                            <SelectItem value="Moderate">Moderate</SelectItem>
                                            <SelectItem value="Challenging">Challenging</SelectItem>
                                            <SelectItem value="Moderate to Challenging">
                                                Moderate to Challenging
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="travelType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Travel Type</FormLabel>
                                <Select
                                    disabled={isPending}
                                    value={(field.value as string) ?? undefined}
                                    onValueChange={field.onChange}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="Adventure">Adventure</SelectItem>
                                            <SelectItem value="Leisure">Leisure</SelectItem>
                                            <SelectItem value="Trekking">Trekking</SelectItem>
                                            <SelectItem value="Cultural">Cultural</SelectItem>
                                            <SelectItem value="Beach">Beach</SelectItem>
                                            <SelectItem value="Mountain">Mountain</SelectItem>
                                            <SelectItem value="Urban">Urban</SelectItem>
                                            <SelectItem value="Business">Business</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Image + Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Main Image URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://..." disabled={isPending} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select
                                    disabled={isPending}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="Open">Open</SelectItem>
                                            <SelectItem value="Full">Full</SelectItem>
                                            <SelectItem value="Completed">Completed</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Itinerary */}
                <div className="rounded-xl border bg-white p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">Itinerary</h2>
                            <p className="text-sm text-slate-500">Add day-wise plan</p>
                        </div>
                        <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            className="gap-2"
                            disabled={isPending}
                            onClick={() => itineraryArray.append({ text: "" })}
                        >
                            <Plus className="h-4 w-4" />
                            Add Day
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {itineraryArray.fields.map((item, index) => (
                            <div key={item.id} className="relative rounded-lg border bg-slate-50 p-3">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-medium text-slate-700">Day {index + 1}</p>
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50"
                                        disabled={isPending}
                                        onClick={() => itineraryArray.remove(index)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                                <FormField
                                    control={form.control}
                                    name={`itinerary.${index}.text`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea
                                                    className="min-h-[90px]"
                                                    placeholder="Write plan for this day..."
                                                    disabled={isPending}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Highlights, Inclusions, Exclusions - simplified for brevity but functionality remains */}
                <div className="rounded-xl border bg-white p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Highlights</h2>
                        <Button type="button" size="sm" variant="secondary" onClick={() => highlightsArray.append({ text: "" })}>
                            <Plus className="h-4 w-4" /> Add
                        </Button>
                    </div>
                    {highlightsArray.fields.map((item, index) => (
                        <div key={item.id} className="flex gap-2">
                            <FormField
                                control={form.control}
                                name={`highlights.${index}.text`}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl><Input placeholder="Highlight" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="button" size="icon" variant="ghost" onClick={() => highlightsArray.remove(index)}><X className="h-4 w-4" /></Button>
                        </div>
                    ))}
                </div>

                {/* Similar structure for Inclusions and Exclusions or keep detailed if preferred. Keeping detailed for quality. */}
                {/* ... (Skipping full detail for Inclusions/Exclusions/FAQ to save token space if user accepts partial, but I should try to keep it complete if possible. I will condense these sections slightly) */}
                <div className="rounded-xl border bg-white p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Inclusions</h2>
                        <Button type="button" size="sm" variant="secondary" onClick={() => inclusionsArray.append({ text: "" })}><Plus className="h-4 w-4" /> Add</Button>
                    </div>
                    {inclusionsArray.fields.map((item, index) => (
                        <div key={item.id} className="flex gap-2">
                            <FormField
                                control={form.control}
                                name={`inclusions.${index}.text`}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl><Input placeholder="Inclusion" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="button" size="icon" variant="ghost" onClick={() => inclusionsArray.remove(index)}><X className="h-4 w-4" /></Button>
                        </div>
                    ))}
                </div>

                <div className="rounded-xl border bg-white p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Exclusions</h2>
                        <Button type="button" size="sm" variant="secondary" onClick={() => exclusionsArray.append({ text: "" })}><Plus className="h-4 w-4" /> Add</Button>
                    </div>
                    {exclusionsArray.fields.map((item, index) => (
                        <div key={item.id} className="flex gap-2">
                            <FormField
                                control={form.control}
                                name={`exclusions.${index}.text`}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl><Input placeholder="Exclusion" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="button" size="icon" variant="ghost" onClick={() => exclusionsArray.remove(index)}><X className="h-4 w-4" /></Button>
                        </div>
                    ))}
                </div>

                <div className="rounded-xl border bg-white p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">FAQ</h2>
                        <Button type="button" size="sm" variant="secondary" onClick={() => faqArray.append({ q: "", a: "" })}><Plus className="h-4 w-4" /> Add</Button>
                    </div>
                    {faqArray.fields.map((item, index) => (
                        <div key={item.id} className="space-y-2 border p-2 rounded">
                            <div className="flex justify-between items-center"><span className="text-sm font-bold">FAQ {index + 1}</span><Button type="button" size="icon" variant="ghost" onClick={() => faqArray.remove(index)}><X className="h-4 w-4" /></Button></div>
                            <FormField
                                control={form.control}
                                name={`faq.${index}.q`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl><Input placeholder="Question" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`faq.${index}.a`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl><Textarea placeholder="Answer" className="min-h-[60px]" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))}
                </div>

                <div className="sticky bottom-0 pt-4 bg-white/95 backdrop-blur-sm border-t mt-4">
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full h-11 text-lg bg-primary hover:bg-primary/90 text-white shadow-lg"
                    >
                        {isPending ? (initialData ? "Updating..." : "Creating...") : (initialData ? "Update Trip" : "Create Trip")}
                    </Button>
                </div>
            </form>
        </Form>
    );
}