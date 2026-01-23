"use client";

import { getMyProfileOverview } from "@/actions/user";
import { useEffect, useState } from "react";
import CompletedToursTable from "./CompletedTours";
import OverviewHeader from "./OverviewHeader";
import StatCards from "./StatCards";
import TourStatisticsChart from "./TourStatisticsChart";
import UpcomingToursTable from "./UpcomingTours";

interface OverviewData {
    cardStats: {
        totalTours: number;
        upcoming: number;
        completed: number;
    };
    chartStats: { name: string; tours: number }[];
    upcomingAdventures: { id: string | number; name: string; date: string; location?: string; status: string }[];
    recentHistory: { id: string | number; name: string; date: string; status: string }[];
}

export default function OverviewPage({ user }: { user?: any }) {
    const [data, setData] = useState<OverviewData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getMyProfileOverview();
                if (res.success) {
                    setData(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch overview data", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    if (!data) {
        return <div className="p-6">Failed to load data.</div>;
    }

    const upcomingTours = data.upcomingAdventures.map(t => ({ ...t, title: t.name }));
    const completedTours = data.recentHistory.map(t => ({ ...t, title: t.name }));

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Header Section */}
            <OverviewHeader user={user} />

            {/* Quick Stats */}
            <StatCards
                totalTours={data.cardStats.totalTours}
                upcomingTours={data.cardStats.upcoming}
                completedTours={data.cardStats.completed}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Charts & Upcoming */}
                <div className="lg:col-span-2 space-y-6">
                    <TourStatisticsChart data={data.chartStats} />
                    <CompletedToursTable tours={completedTours} />
                </div>

                {/* Right Column: Recent Activity/Notifications */}
                <div className="space-y-6">
                    <UpcomingToursTable tours={upcomingTours} />

                    {/* Placeholder for potentially another widget like "Notifications" or "Profile Quick View" */}
                    <div className="bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                        <h3 className="text-xl font-bold mb-2">Ready for your next trip?</h3>
                        <p className="text-indigo-100 mb-4 text-sm">Explore new destinations and book your next adventure today.</p>
                        <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-lg transition-colors border border-white/20">
                            Find Trips
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
