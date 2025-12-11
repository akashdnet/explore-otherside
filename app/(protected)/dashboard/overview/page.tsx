

import { getMyProfile } from "@/actions/user";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UpcomingTripSection from "./UpcomingTripSection";

export default async function DashboardPage() {
    const res = await getMyProfile();

    // Fallback if data fetching fails or structure is different
    const profile = res?.data?.profile || res?.data || {};
    const overview = res?.data?.overview || {
        totalPlanTrip: 0,
        totalCompleteTrip: 0,
        upcomingTripList: []
    };

    // Map upcoming trips to component format
    // Assuming backend returns trips with standard trip fields
    const upcomingTrips = overview.upcomingTripList.map((trip: any) => ({
        id: trip._id || trip.id,
        title: trip.destination || "Trip",
        location: trip.destination || "Unknown Location",
        date: trip.startDate ? new Date(trip.startDate).toLocaleDateString() : "TBD"
    }));

    return (
        <div className="p-6 space-y-6">
            {/* Profile Section */}
            <Card className="border-none shadow-md bg-linear-to-r from-primary/10 via-primary/5 to-transparent">
                <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6">
                    <div className="h-24 w-24 rounded-full border-4 border-background shadow-xl overflow-hidden relative bg-muted flex items-center justify-center shrink-0">
                        {profile.photo ? (
                            <img
                                src={profile.photo}
                                alt={profile.name || "User"}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <span className="text-2xl font-bold text-muted-foreground">
                                {profile.name?.charAt(0) || "U"}
                            </span>
                        )}
                    </div>
                    <div className="space-y-2 text-center md:text-left">
                        <h2 className="text-3xl font-bold tracking-tight">{profile.name}</h2>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            <p className="text-muted-foreground">{profile.email}</p>
                            {profile.role && <Badge variant="secondary" className="uppercase">{profile.role}</Badge>}
                        </div>
                        {profile.bio && <p className="text-sm text-muted-foreground max-w-lg">{profile.bio}</p>}
                    </div>
                </CardContent>
            </Card>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Planned Trips</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{overview.totalPlanTrip}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Completed Trips</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{overview.totalCompleteTrip}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Upcoming Trips Section */}
            <UpcomingTripSection events={upcomingTrips} />
        </div>
    );
}
