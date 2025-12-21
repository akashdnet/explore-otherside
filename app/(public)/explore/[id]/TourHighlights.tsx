'use client'

interface TourHighlightsProps {
    highlights: string[];
}

export default function TourHighlights({ highlights }: TourHighlightsProps) {
    return (
        <section className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                ✨ <span>Highlights</span>
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                        <span className="text-[#FE9A00] mt-0.5">✓</span>
                        <span className="text-gray-700 dark:text-gray-300">{h}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
