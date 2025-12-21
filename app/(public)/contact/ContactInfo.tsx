

import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactInfo() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">We’d Love to Hear From You</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Whether you’re planning your dream mountain escape, need help choosing a tour, or just want to share your experience — our team is always happy to assist.
                </p>
            </div>

            {/* Contact Highlights */}
            <div className="space-y-5">
                <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">Email Us</h3>
                        <p className="text-slate-600 dark:text-slate-300">hello@explore-otherside.com</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">Call Us</h3>
                        <p className="text-slate-600 dark:text-slate-300">+880 171 xxxxxx (Mon–Fri, 9AM–5PM GMT+6)</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">Office</h3>
                        <p className="text-slate-600 dark:text-slate-300">G-Block, Kawran Bazar, Dhaka, Bangladesh</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
