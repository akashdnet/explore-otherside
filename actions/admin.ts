"use server";

import { envList } from "@/lib/config";
import { cookies } from "next/headers";

// User Management Actions

export async function getAllUsers() {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) { return { success: false, error: "Unauthorized", data: null }; }

    try {
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/users/all-users`, {
            method: "GET",
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        return await res.json();
    } catch (error) {
        console.error("Get all users error:", error);
        throw error;
    }
}

export async function getSingleUser(id: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) { return { success: false, error: "Unauthorized", data: null }; }

    try {
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/users/${id}`, {
            method: "GET",
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        return await res.json();
    } catch (error) {
        console.error("Get single user error:", error);
        throw error;
    }
}

export async function updateUser(id: string, data: any) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) { return { success: false, error: "Unauthorized", data: null }; }

    try {
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/users/update/${id}`, {
            method: "PATCH",
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            cache: "no-store",
        });

        return await res.json();
    } catch (error) {
        console.error("Update user error:", error);
        throw error;
    }
}

export async function deleteUser(id: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) { return { success: false, error: "Unauthorized", data: null }; }

    try {
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/users/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        return await res.json();
    } catch (error) {
        console.error("Delete user error:", error);
        throw error;
    }
}

// Trip Management Actions

export async function getAllTrips() {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) { return { success: false, error: "Unauthorized", data: null }; }

    try {
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/trips/admin/all-trips`, {
            method: "GET",
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        return await res.json();
    } catch (error) {
        console.error("Get all trips error:", error);
        throw error;
    }
}

export async function updateAnyTrip(id: string, data: any) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) { return { success: false, error: "Unauthorized", data: null }; }

    try {
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/trips/admin/update/${id}`, {
            method: "PATCH",
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            cache: "no-store",
        });

        return await res.json();
    } catch (error) {
        console.error("Update any trip error:", error);
        throw error;
    }
}

export async function getSingleTrip(id: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) { return { success: false, error: "Unauthorized", data: null }; }

    try {
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/trips/admin/${id}`, {
            method: "GET",
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        return await res.json();
    } catch (error) {
        console.error("Get single trip error:", error);
        throw error;
    }
}

export async function deleteAnyTrip(id: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) { return { success: false, error: "Unauthorized", data: null }; }

    try {
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/trips/admin/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        return await res.json();
    } catch (error) {
        console.error("Delete any trip error:", error);
        throw error;
    }
}
