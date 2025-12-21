'use client'

import { Star } from 'lucide-react';

interface Review {
    user: string;
    rating: number;
    date: string;
    comment: string;
}

interface TourReviewsProps {
    reviews: Review[];
}

export default function TourReviews({ reviews }: TourReviewsProps) {
    return (
        <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">💬 Traveler Reviews</h2>
            <div className="space-y-4">
                {reviews.map((rev, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-bold">{rev.user}</p>
                                <p className="text-sm text-gray-500">{rev.date}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, j) => (
                                    <Star
                                        key={j}
                                        className={`w-4 h-4 ${j < rev.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">"{rev.comment}"</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
