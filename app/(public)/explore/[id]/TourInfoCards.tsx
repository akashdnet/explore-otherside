'use client'

import { Calendar, Clock, MapPin, Users } from 'lucide-react';

interface TourInfoCardsProps {
    tour: {
        duration: string;
    };
}

export default function TourInfoCards({ tour }: TourInfoCardsProps) {
    const infoItems = [
        { icon: MapPin, label: 'Location', value: 'Interlaken, CH' },
        { icon: Calendar, label: 'Dates', value: 'Dec 25–27, 2025' },
        { icon: Clock, label: 'Duration', value: tour.duration },
        { icon: Users, label: 'Group', value: '8 max' },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {infoItems.map((item, i) => {
                const Icon = item.icon;
                return (
                    <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
                        <Icon className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                        <p className="font-medium mt-1">{item.value}</p>
                    </div>
                );
            })}
        </div>
    );
}
