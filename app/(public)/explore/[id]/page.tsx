'use client';

import TourCardGroup from '@/components/TourCardGroup';
import { recommendedTours, tour } from '@/utils/dummy-data';
import { useState } from 'react';
import TourFAQ from './TourFAQ';
import TourGuide from './TourGuide';
import TourHero from './TourHero';
import TourHighlights from './TourHighlights';
import TourInclusionsExclusions from './TourInclusionsExclusions';
import TourInfoCards from './TourInfoCards';
import TourItinerary from './TourItinerary';
import TourReviews from './TourReviews';

export default function TourPage() {


    const [isBooked, setIsBooked] = useState(false);


    const pricePerDay = (tour.price / tour.days).toFixed(1);

    return (
        <section className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-14">
            <TourHero
                tour={tour}
                isBooked={isBooked}
                setIsBooked={setIsBooked}
                pricePerDay={pricePerDay}
            />

            <TourInfoCards tour={tour} />

            <TourHighlights highlights={tour.highlights} />

            <TourItinerary itinerary={tour.itinerary} />

            <TourInclusionsExclusions
                inclusions={tour.inclusions}
                exclusions={tour.exclusions}
            />

            <TourGuide guide={tour.guide} />

            <TourReviews reviews={tour.reviews} />

            <TourFAQ faq={tour.faq} />

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Recommended Tours</h2>
            <TourCardGroup title="" data={recommendedTours} row={4} />
        </section>
    );
}
