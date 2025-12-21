
import { getAllTripsAdmin } from "@/actions/trip";
import { getMyProfile } from "@/actions/user";
import TripCard from "@/app/(public)/_trips/TripCard";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";

interface SearchParams {
    page?: string;
    limit?: string;
    search?: string;
}

export default async function ExplorePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const { page: pageParam, search: searchParam } = await searchParams;
    const page = Number(pageParam) || 1;
    const limit = 10;
    const search = searchParam || "";

    const response = await getAllTripsAdmin({
        page,
        limit,
        // search,
    });

    console.log(response, "trips page response");

    // Handle different response structures based on API
    const trips = response?.data?.items || [];
    const meta = response?.data?.pagination || { total: 0, page: 1, limit: 10, totalPages: 1 };

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    let userId = "";

    if (token) {
        try {
            const userRes = await getMyProfile();
            userId = userRes.data.profile._id;
            // console.log(userRes.data.profile._id, userId, "user id check from rrot")

        } catch (error) {
            console.error("Failed to fetch user profile", error);
        }
    }
    const isAuthenticated = !!token;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Explore Trips</h1>

            {/* Optional: Add Search Bar here if needed, consistent with User Management */}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {trips.length > 0 ? (
                    trips.map((trip: any) => (
                        <TripCard
                            key={trip._id}
                            trip={trip}
                            isAuthenticated={isAuthenticated}
                            userId={userId}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-10 text-gray-500">
                        No trips found.
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 mt-8">
                <Button
                    variant="outline"
                    disabled={Number(page) <= 1}
                    asChild
                >
                    <Link href={`/trips?page=${Number(page) - 1}&search=${search}`}>
                        Previous
                    </Link>
                </Button>

                <span className="text-sm font-medium">
                    Page {meta?.page} of {meta?.totalPages || 1}
                </span>

                <Button
                    variant="outline"
                    disabled={Number(page) >= (meta?.totalPages || 1)}
                    asChild
                >
                    <Link href={`/trips?page=${Number(page) + 1}&search=${search}`}>
                        Next
                    </Link>
                </Button>
            </div>
        </div>
    );
}
