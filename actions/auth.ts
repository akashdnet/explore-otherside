"use server";

import { envList } from "@/lib/config";
import { cookies } from "next/headers";

export async function loginUser(data: any) {
    try {
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            cache: "no-store",
        });

        const result = await res.json();

        if (res.ok && result?.data?.accessToken) {
            const cookieStore = await cookies();
            cookieStore.set("accessToken", result.data.accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 24 * 7,
            });
            if (result?.data?.refreshToken) {
                cookieStore.set("refreshToken", result.data.refreshToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 60 * 60 * 24 * 7,
                });
            }
        }

        return result;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

export async function logoutUser() {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
}

export async function refreshToken() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) return null;

    const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ cookies: { refreshToken } }),
        cache: "no-store",
    });

    const result = await res.json();

    if (res.ok && result?.data?.accessToken) {
        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7,
        });
    }
    return result;
}
