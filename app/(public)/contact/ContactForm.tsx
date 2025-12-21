'use client';

import { Mail, MessageCircle, User } from 'lucide-react';
import { useState } from 'react';

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            // Reset after 3s
            setTimeout(() => setIsSubmitted(false), 3000);
        }, 1000);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <MessageCircle className="w-6 h-6" />
                Send us a message
            </h2>

            {isSubmitted ? (
                <div className="text-center py-8">
                    <div className="inline-block p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                        <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-green-600 dark:text-green-400">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">We’ll get back to you within 24 hours.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Full Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="w-4 h-4 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-[#FE9A00] focus:border-[#FE9A00] outline-none transition"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="w-4 h-4 text-slate-400" />
                            </div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-[#FE9A00] focus:border-[#FE9A00] outline-none transition"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Your Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            required
                            className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-[#FE9A00] focus:border-[#FE9A00] outline-none transition"
                            placeholder="Hi! I’d like to know more about the Swiss Alps tour..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2.5 px-4 rounded-lg font-semibold text-white transition ${isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#FE9A00] hover:bg-[#e08700] shadow-md hover:shadow-lg'
                            }`}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            )}
        </div>
    );
}
