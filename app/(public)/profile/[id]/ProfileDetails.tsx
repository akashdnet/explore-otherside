'use client';

interface ProfileDetailsProps {
    profile: any;
}

export default function ProfileDetails({ profile }: ProfileDetailsProps) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                {profile?.about || "No bio provided yet."}
            </p>

            <div className="mt-8">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Travel Interests</h3>
                <div className="flex flex-wrap gap-2">
                    {profile?.travelInterests && profile?.travelInterests.length > 0 ? (
                        profile?.travelInterests.map((interest: string, index: number) => (
                            <span key={index} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-full text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-default">
                                {interest}
                            </span>
                        ))
                    ) : (
                        <span className="text-slate-500">No interests added yet</span>
                    )}
                </div>
            </div>

            {profile?.visitedCountries && profile?.visitedCountries.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Visited Countries</h3>
                    <div className="flex flex-wrap gap-2">
                        {profile?.visitedCountries.map((country: string, index: number) => (
                            <span key={index} className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 rounded-full text-sm font-medium">
                                {country}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
