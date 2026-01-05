"use server";

import { envList } from "@/lib/config";





// ============ Explore Routes ============
export async function fetchHome() {
    try {
        const fullUrl = `${envList.NEXT_PUBLIC_API_URL}/explorer/home`;
        console.log("Fetching home data from:", fullUrl);
        const res = await fetch(fullUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        const json = await res.json();
        console.log("Home data response:", json);
        return json.data;
    } catch (error) {
        console.error("Get home error:", error);
        return { trips: [], reviews: [] };
    }
}


export async function subscribeToNewsletter(email: string) {
    try {
        const fullUrl = `${envList.NEXT_PUBLIC_API_URL}/explorer/subscribe`;
        const res = await fetch(fullUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
            cache: "no-store",
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Newsletter subscription error:", error);
        throw error;
    }
}