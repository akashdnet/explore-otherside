'use client'

interface FAQItem {
    q: string;
    a: string;
}

interface TourFAQProps {
    faq: FAQItem[];
}

export default function TourFAQ({ faq }: TourFAQProps) {
    return (
        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faq.map((item, i) => (
                    <div key={i} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                        <p className="font-semibold text-gray-800 dark:text-gray-200">Q: {item.q}</p>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">A: {item.a}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
