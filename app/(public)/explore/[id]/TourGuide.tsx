'use client'

import { Star } from 'lucide-react';

interface TourGuideProps {
    guide: {
        name: string;
        image: string;
        experience: string;
        languages: string[];
        rating: number;
        totalReviews: number;
    };
}

export default function TourGuide({ guide }: TourGuideProps) {
    return (
        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">👨‍🏫 Meet Your Guide</h2>
            <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-blue-200">
                    <img
                        src={guide.image || 'https://via.placeholder.com/96?text=Guide'}
                        alt={guide.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold">{guide.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{guide.experience}</p>
                    <p className="text-sm text-gray-500 mt-1">Languages: {guide.languages.join(', ')}</p>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(guide.rating)
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                                    }`}
                            />
                        ))}
                        <span className="text-sm text-gray-600">
                            {guide.rating} ({guide.totalReviews} reviews)
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
