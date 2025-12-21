'use client'

import { Calendar } from 'lucide-react';

interface TourItineraryProps {
    itinerary: string[];
}

export default function TourItinerary({ itinerary }: TourItineraryProps) {
    return (
        <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" /> Itinerary
            </h2>
            <div className="space-y-4">
                {itinerary.map((day, i) => (
                    <div key={i} className="p-4 border-l-4 border-blue-500 bg-white dark:bg-gray-800 rounded-r-lg">
                        <h3 className="font-bold text-lg">Day {i + 1}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">{day}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
