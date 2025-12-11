
import { getAllTripsAdmin } from "@/actions/trip";
import { getMyProfile } from "@/actions/user";
import TripCard from "@/app/(public)/trips/TripCard";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function TrendingDestinations() {
    const { data: tripsData } = await getAllTripsAdmin({ limit: 4 });
    const trips = tripsData?.items || [];

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    let userId = null;

    if (token) {
        try {
            const userRes = await getMyProfile();
            if (userRes && userRes.data) {
                userId = userRes.data.profile?._id || userRes.data._id;
            }
        } catch (error) {
            console.error("Failed to fetch user profile", error);
        }
    }
    const isAuthenticated = !!token;

    return (
        <section className=" bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                            Trending Destinations
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            Discover the most popular trips happening right now.
                        </p>
                    </div>
                    <Button variant="outline" asChild className="hidden sm:inline-flex">
                        <Link href="/trips">View All Trips</Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trips.length > 0 ? (
                        trips.map((trip: any) => (
                            <TripCard key={trip._id} trip={trip} isAuthenticated={isAuthenticated} userId={userId} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10 text-slate-500">
                            No trending trips found at the moment.
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <Button variant="outline" asChild className="w-full">
                        <Link href="/trips">View All Trips</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
