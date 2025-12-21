'use client';

import { Plane } from "lucide-react";
import { MdOutlineModeOfTravel } from "react-icons/md";

interface ProfileTripsProps {
    overview: any;
}

export default function ProfileTrips({ overview }: ProfileTripsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-600 text-white rounded-3xl p-8 shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-1">Upcoming Trips</h2>
                    <ul className="space-y-2 mt-4">
                        {overview?.upcomingTripList && overview?.upcomingTripList.length > 0 ? (
                            overview?.upcomingTripList.map((trip: any, index: number) => (
                                <li key={index} className="flex items-center gap-2">
                                    <MdOutlineModeOfTravel className="shrink-0" />
                                    <span>{trip?.destination}</span>
                                </li>
                            ))
                        ) : (
                            <p className="text-blue-100 text-sm">No upcoming trips planned</p>
                        )}
                    </ul>
                </div>
                <div className="absolute top-0 right-0 -mr-16 -mt-16 size-48 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 size-48 rounded-full bg-black/10 blur-2xl" />
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Completed Trips</h2>
                    <Plane className="text-blue-600 size-6" />
                </div>
                <p className="text-slate-500 text-sm">No completed trips yet</p>
            </div>
        </div>
    );
}
