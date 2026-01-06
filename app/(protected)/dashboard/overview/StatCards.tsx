import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Map, Plane } from "lucide-react";

interface StatCardsProps {
    totalTours: number;
    upcomingTours: number;
    completedTours: number;
}

export default function StatCards({ totalTours, upcomingTours, completedTours }: StatCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-none shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-900/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Tours</CardTitle>
                    <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <Map className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">{totalTours}</div>
                    <p className="text-xs text-muted-foreground mt-1">Lifetime trips booked</p>
                </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-900 dark:to-slate-900/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Adventures</CardTitle>
                    <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                        <Plane className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">{upcomingTours}</div>
                    <p className="text-xs text-muted-foreground mt-1">Ready for departure</p>
                </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-900 dark:to-slate-900/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Completed Journeys</CardTitle>
                    <div className="h-8 w-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">{completedTours}</div>
                    <p className="text-xs text-muted-foreground mt-1">Memories made</p>
                </CardContent>
            </Card>
        </div>
    );
}
