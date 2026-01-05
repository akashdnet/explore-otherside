"use client";

import { loginUser } from "@/actions/auth";
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
import { loginSchema, TLogin } from "@/lib/validation/auth";
import { user_credentials } from "@/utils/dummy-data";
import { zodResolver } from "@hookform/resolvers/zod";
import { TriangleAlertIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function LoginForm() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const form = useForm<TLogin>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: TLogin) => {
        setIsLoading(true);
        setError("");
        try {
            const res = await loginUser(values);
            if (res?.success) {
                toast({
                    title: "Success",
                    description: "Login successful",
                    className: "bg-green-500 text-white",
                });
                router.push("/dashboard");
            } else {
                setError(res?.message || "Login failed");
            }
        } catch (err: any) {
            console.error(err);
            setError("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 max-w-sm mx-auto"
            >

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="you@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="••••••••" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold h-12 rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/30" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                </Button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-200"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-slate-500 font-medium">Quick Access Demo</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pb-4">
                    {user_credentials.map((demo, key) => (
                        <Button
                            key={demo.email}
                            type="button"
                            variant="outline"
                            onClick={() => {
                                form.setValue('email', demo.email);
                                form.setValue('password', demo.password);
                            }}
                            className={`flex flex-col h-auto py-3 gap-1 hover:border-amber-500 hover:bg-amber-50 group ${demo.email == 'superadmin@travbud.com' && 'col-span-2'}`}
                        >
                            <span className="text-xs font-bold text-slate-700 group-hover:text-amber-600">{demo.label}</span>
                            <span className="text-[10px] text-slate-400">{demo.subLabel}</span>
                        </Button>
                    ))}
                </div>

                {error && <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-semibold border border-red-100 shadow-sm"><TriangleAlertIcon className="size-4" /> {error}</div>}
            </form>
        </Form>
    );
}
