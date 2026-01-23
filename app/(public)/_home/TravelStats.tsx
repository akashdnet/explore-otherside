import { Calendar, MapPin, Star, Users } from 'lucide-react';

const stats = [
    { id: 1, name: 'Happy Travelers', value: '50K+', icon: Users },
    { id: 2, name: 'Destinations', value: '1.2K+', icon: MapPin },
    { id: 3, name: 'Trips Organized', value: '15K+', icon: Calendar },
    { id: 4, name: 'User Rating', value: '4.9/5', icon: Star },
];

export default function TravelStats() {
    return (
        <section className="py-20 bg-amber-50 rounded-3xl my-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Impact in Numbers
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We've helped thousands of travelers find their perfect companions and destinations. Join our growing community today.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <div key={stat.id} className="flex flex-col items-center p-2 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-2 bg-amber-100 rounded-xl mb-4 text-amber-600">
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                                {stat.value}
                            </span>
                            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                                {stat.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
