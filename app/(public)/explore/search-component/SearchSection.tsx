'use client';

import { Calendar, XCircle } from 'lucide-react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function SearchSection() {
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isStartOpen, setIsStartOpen] = useState(false);
    const [isEndOpen, setIsEndOpen] = useState(false);

    const handleSearch = () => {
        console.log({ searchQuery, startDate, endDate });
    };

    const handleClearDates = () => {
        setStartDate(null);
        setEndDate(null);
    };

    return (
        <section className="flex justify-center items-center w-fit mx-auto">
            <div className="w-full">
                <p className="text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-2">
                    Only tours that start between the selected Start and End dates will be shown
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-3 mb-6 w-fit mx-auto">

                    {(startDate || endDate) && (
                        <button
                            type="button"
                            onClick={handleClearDates}
                            className="flex items-center gap-1 px-3 py-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 text-sm font-medium transition-colors"
                        >
                            <XCircle size={16} />
                            Clear
                        </button>
                    )}

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsStartOpen(!isStartOpen)}
                            className="flex items-center gap-2 px-3 py-3 border border-[#FE9A00]/30 rounded-lg transition-colors"
                        >
                            <Calendar size={20} className="text-gray-600" />
                            <span className="text-gray-700 text-sm">
                                {startDate ? `Start: ${startDate.toLocaleDateString()}` : 'Start Date'}
                            </span>
                        </button>
                        {isStartOpen && (
                            <div className="absolute z-10 mt-1">
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date: Date | null) => {
                                        setStartDate(date);
                                        setIsStartOpen(false);
                                    }}
                                    inline
                                    calendarClassName="!rounded-lg !shadow-lg"
                                />
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsEndOpen(!isEndOpen)}
                            className="flex items-center gap-2 px-3 py-3 border border-[#FE9A00]/30 rounded-lg transition-colors"
                        >
                            <Calendar size={20} className="text-gray-600" />
                            <span className="text-gray-700 text-sm">
                                {endDate ? `End: ${endDate.toLocaleDateString()}` : 'End Date'}
                            </span>
                        </button>
                        {isEndOpen && (
                            <div className="absolute z-10 mt-1">
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date: Date | null) => {
                                        setEndDate(date);
                                        setIsEndOpen(false);
                                    }}
                                    inline
                                    calendarClassName="!rounded-lg !shadow-lg"
                                />
                            </div>
                        )}
                    </div>

                    <div className="relative w-full sm:w-64 flex items-center justify-center">
                        <input
                            type="text"
                            placeholder="Search tours..."
                            className="w-full px-4 py-2.5 pr-10 border border-[#FE9A00]/30 rounded-lg focus:ring-2/50 focus:ring-[#FE9A00]/50 focus:border-[#FE9A00] outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleSearch}
                        className="w-full sm:w-auto bg-[#FE9A00] hover:bg-[#FE9A00]/80 text-white px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
                    >
                        Search
                    </button>
                </div>
            </div>
        </section>
    );
}
