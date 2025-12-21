'use client'

import { Mountain } from 'lucide-react';

interface TourHeroProps {
    tour: {
        image: string;
        name: string;
        availability: number;
        difficulty: string;
        description: string;
        price: number;
    };
    isBooked: boolean;
    setIsBooked: (booked: boolean) => void;
    pricePerDay: string;
}

export default function TourHero({ tour, isBooked, setIsBooked, pricePerDay }: TourHeroProps) {
    return (
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
                src={tour.image}
                alt={tour.name}
                className="w-full h-[400px] sm:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-8 text-white max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-[#FE9A00] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        Only {tour.availability} spots left!
                    </span>
                    <span className="flex items-center text-sm">
                        <Mountain className="w-4 h-4 mr-1" />
                        {tour.difficulty}
                    </span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-bold leading-tight">{tour.name}</h1>
                <p className="mt-3 text-base sm:text-lg opacity-90">{tour.description}</p>
                <div className="mt-4 flex flex-wrap gap-4 items-center">
                    <div className="text-3xl font-extrabold text-[#FE9A00]">${tour.price}</div>
                    <div className="text-sm opacity-80">(${pricePerDay}/day)</div>
                    <button
                        onClick={() => setIsBooked(true)}
                        disabled={isBooked}
                        className={`px-6 py-2.5 rounded-lg font-semibold transition ${isBooked
                            ? 'bg-green-600 cursor-default'
                            : 'bg-white text-[#1E3A8A] hover:bg-gray-100'
                            }`}
                    >
                        {isBooked ? '✅ Request Sent!' : 'Send Request'}
                    </button>
                </div>
            </div>
        </div>
    );
}
