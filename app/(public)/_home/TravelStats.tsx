import { Calendar, MapPin, Star, Users } from 'lucide-react';
import StatsGridLayout from './StatsGridLayout';

const stats = [
    { id: 1, name: 'Happy Travelers', value: '50K+', icon: Users },
    { id: 2, name: 'Destinations', value: '1.2K+', icon: MapPin },
    { id: 3, name: 'Trips Organized', value: '15K+', icon: Calendar },
    { id: 4, name: 'User Rating', value: '4.9/5', icon: Star },
];

export default function TravelStats() {
    return (
        <section className="py-10 bg-amber-50 rounded-3xl ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-[#FE9A00] dark:text-white tracking-tight mb-4">
                        Our Impact in Numbers
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We've helped thousands of travelers find their perfect companions and destinations. Join our growing community today.
                    </p>
                </div>
                <StatsGridLayout />
            </div>
        </section>
    );
}
