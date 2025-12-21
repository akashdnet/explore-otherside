'use client'

import { Package, Shield } from 'lucide-react';

interface TourInclusionsExclusionsProps {
    inclusions: string[];
    exclusions: string[];
}

export default function TourInclusionsExclusions({ inclusions, exclusions }: TourInclusionsExclusionsProps) {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5" /> Inclusions
                </h3>
                <ul className="space-y-2">
                    {inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <span className="text-teal-500 mt-0.5">•</span>
                            <span className="text-gray-700 dark:text-gray-300">{inc}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                <h3 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" /> Exclusions
                </h3>
                <ul className="space-y-2">
                    {exclusions.map((exc, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <span className="text-rose-500 mt-0.5">•</span>
                            <span className="text-gray-700 dark:text-gray-300">{exc}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
