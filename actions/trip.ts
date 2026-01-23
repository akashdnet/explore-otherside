"use server";

import { envList } from "@/lib/config";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// ============ Creator Routes ============

export async function registerTrip(data: FormData | any) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) { return { success: false, error: "Unauthorized", data: null } }

    try {
        const isFormData = data instanceof FormData;
        const headers: any = {
            Authorization: `${token}`,
        };

        if (!isFormData) {
            headers["Content-Type"] = "application/json";
        }

        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/trips/register`, {
            method: "POST",
            headers,
            body: isFormData ? data : JSON.stringify(data),
            cache: "no-store",
        });

        const result = await res.json();
        if (result.success) {
            revalidatePath("/dashboard/guide-trip-management");
            revalidatePath("/explore");
        }
        return result;
    } catch (error) {
        console.error("Register trip error:", error);
        throw error;
    }
}


export interface TripQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    status?: string;
    minBudget?: number;
    maxBudget?: number;
    travelType?: string;
    startDate?: string;
    endDate?: string;
}

export async function getMyTrips(params?: TripQueryParams) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) return { data: { items: [], pagination: { total: 0, page: 1, limit: 10, totalPages: 0 } } };

    try {
        // Build query string
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.search) queryParams.append('search', params.search);
        if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
        if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);
        if (params?.status) queryParams.append('status', params.status);
        if (params?.minBudget) queryParams.append('minBudget', params.minBudget.toString());
        if (params?.maxBudget) queryParams.append('maxBudget', params.maxBudget.toString());
        if (params?.travelType) queryParams.append('travelType', params.travelType);
        if (params?.startDate) queryParams.append('startDate', params.startDate);
        if (params?.endDate) queryParams.append('endDate', params.endDate);

        const queryString = queryParams.toString();
        const url = `${envList.NEXT_PUBLIC_API_URL}/trips/all-my-trips${queryString ? `?${queryString}` : ''}`;

        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `${token}`,
            },
            cache: "no-store",
        });

        return await res.json();
    } catch (error) {
        console.error("Get my trips error:", error);
        throw error;
    }
}

export async function updateMyTrip(id: string, data: FormData | any) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) { return { success: false, error: "Unauthorized", data: null } }

    try {
        const isFormData = data instanceof FormData;
        const headers: any = {
            Authorization: `${token}`,
        };

        if (!isFormData) {
            headers["Content-Type"] = "application/json";
        }

        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/trips/update/${id}`, {
            method: "PATCH",
            headers,
            body: isFormData ? data : JSON.stringify(data),
            cache: "no-store",
        });

        const result = await res.json();
        if (result.success) {
            revalidatePath("/dashboard/guide-trip-management");
            revalidatePath("/explore");
        }
        return result;
    } catch (error) {
        console.error("Update my trip error:", error);
        throw error;
    }
}

export async function approveJoinRequest(data: { tripId: string; participantId: string }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) { return { success: false, error: "Unauthorized", data: null } }

    try {
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/trips/approve`, {
            method: "POST",
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            cache: "no-store",
        });

        const result = await res.json();
        if (result.success) {
            revalidatePath("/dashboard/guide-trip-management");
        }
        return result;
    } catch (error) {
        console.error("Approve join request error:", error);
        throw error;
    }
}

export async function deleteMyTrip(id: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) { return { success: false, error: "Unauthorized", data: null } }

    try {
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/trips/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `${token}`,
            },
            cache: "no-store",
        });

        const result = await res.json();
        if (result.success) {
            revalidatePath("/dashboard/guide-trip-management");
            revalidatePath("/explore");
        }
        return result;
    } catch (error) {
        console.error("Delete my trip error:", error);
        throw error;
    }
}

// ============ Participant Routes ============

export async function requestToJoinTrip(tripId: string, participantId: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) { return { success: false, error: "Unauthorized", data: null } }

    try {

        // body তে tripId, participentId যাবে 
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/trips/request/${tripId}`, {
            method: "POST",
            headers: {
                Authorization: `${token}`,
            },
            cache: "no-store",
            body: JSON.stringify({ tripId, participantId }),
        });

        const result = await res.json();
        if (result.success) {
            revalidatePath("/dashboard/guide-trip-management");
            revalidatePath("/explore");
        }
        return result;
    } catch (error) {
        console.error("Request to join trip error:", error);
        throw error;
    }
}

export async function getAllMyJoinRequests() {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) return { data: [] };

    try {
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/trips/all-my-join-requests`, {
            method: "GET",
            headers: {
                Authorization: `${token}`,
            },
            cache: "no-store",
        });

        return await res.json();
    } catch (error) {
        console.error("Get all my join requests error:", error);
        throw error;
    }
}

export async function cancelJoinRequest(id: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) { return { success: false, error: "Unauthorized", data: null } }

    try {
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/trips/cancel/${id}`, {
            method: "PATCH",
            headers: {
                Authorization: `${token}`,
            },
            cache: "no-store",
        });

        return await res.json();
    } catch (error) {
        console.error("Cancel join request error:", error);
        throw error;
    }
}

// ============ Admin Routes ============

export async function getAllTripsAdmin(params?: {
    page?: number;
    limit?: number;
    status?: string;
    destination?: string;
}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    // if (!token) { return { success: false, error: "Unauthorized", data: null } }

    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.status) queryParams.append("status", params.status);
    if (params?.destination) queryParams.append("destination", params.destination);

    try {
        const res = await fetch(
            `${envList.NEXT_PUBLIC_API_URL}/trips/admin/all-trips?${queryParams.toString()}`,
            {
                method: "GET",
                headers: {
                    Authorization: `${token}`,
                },
                cache: "no-store",
            }
        );

        return await res.json();
    } catch (error) {
        console.error("Get all trips admin error:", error);
        throw error;
    }
}

export async function updateTripAdmin(id: string, formData: FormData) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) { return { success: false, error: "Unauthorized", data: null } }

    try {
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/trips/admin/update/${id}`, {
            method: "PATCH",
            headers: {
                Authorization: `${token}`,
            },
            body: formData,
            cache: "no-store",
        });

        return await res.json();
    } catch (error) {
        console.error("Update trip admin error:", error);
        throw error;
    }
}

export async function getTripByIdAdmin(id: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) { return { success: false, error: "Unauthorized", data: null } }

    try {
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/trips/admin/${id}`, {
            method: "GET",
            headers: {
                Authorization: `${token}`,
            },
            cache: "no-store",
        });

        return await res.json();
    } catch (error) {
        console.error("Get trip by id admin error:", error);
        throw error;
    }
}

export async function deleteTripAdmin(id: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) { return { success: false, error: "Unauthorized", data: null } }

    try {
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/trips/admin/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `${token}`,
            },
            cache: "no-store",
        });

        return await res.json();
    } catch (error) {
        console.error("Delete trip admin error:", error);
        throw error;
    }
}

export async function getAllTrips(params?: TripQueryParams) {
    try {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.search) queryParams.append("search", params.search);
        if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
        if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);
        if (params?.minBudget) queryParams.append("minBudget", params.minBudget.toString());
        if (params?.maxBudget) queryParams.append("maxBudget", params.maxBudget.toString());
        if (params?.travelType) queryParams.append("travelType", params.travelType);
        if (params?.startDate) queryParams.append("startDate", params.startDate);
        if (params?.endDate) queryParams.append("endDate", params.endDate);

        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/trips?${queryParams.toString()}`, {
            method: "GET",
            headers: {
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

export async function getTripById(id: string) {
    try {
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/trips/admin/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        return await res.json();
    } catch (error) {
        console.error("Get trip by id error:", error);
        throw error;
    }
}





