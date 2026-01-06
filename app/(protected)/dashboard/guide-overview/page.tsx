"use client";

import CompletedToursTable from "./CompletedTours";
import OverviewHeader from "./OverviewHeader";
import StatCards from "./StatCards";
import TourStatisticsChart from "./TourStatisticsChart";
import UpcomingToursTable from "./UpcomingTours";

const upcomingTours = [
    { id: 1, title: "Sundarbans Adventure", date: "2026-01-15", status: "upcoming" },
    { id: 2, title: "Cox's Bazar Beach Trip", date: "2026-02-02", status: "upcoming" },
];

const completedTours = [
    { id: 1, title: "Bandarban Trek", date: "2025-12-20", status: "completed" },
    { id: 2, title: "Sylhet Tea Garden", date: "2025-11-10", status: "completed" },
];

export default function UserOverviewPage() {
    const totalCompleted = completedTours.length;
    const totalUpcoming = upcomingTours.length;
    const totalTours = totalCompleted + totalUpcoming;

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Header Section */}
            <OverviewHeader />

            {/* Quick Stats */}
            <StatCards
                totalTours={totalTours}
                upcomingTours={totalUpcoming}
                completedTours={totalCompleted}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Charts & Upcoming */}
                <div className="lg:col-span-2 space-y-6">
                    <TourStatisticsChart />
                    <CompletedToursTable />
                </div>

                {/* Right Column: Recent Activity/Notifications */}
                <div className="space-y-6">
                    <UpcomingToursTable />


                </div>
            </div>
        </div>
    );
}
