'use client';

import { Calendar, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import EditProfileModal from "./EditProfileModal";

interface ProfileSidebarProps {
    user: any;
    isMe: boolean;
    fetchUserProfile: () => void;
}

export default function ProfileSidebar({ user, isMe, fetchUserProfile }: ProfileSidebarProps) {
    const profile = user?.profile;

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-800">
                <div className="relative -mt-20 mb-6 text-center lg:text-left">
                    <div className="relative inline-block">
                        <Image
                            src={profile?.photo || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"}
                            alt={profile?.name}
                            className="size-36 lg:size-40 rounded-full border-[6px] border-white dark:border-slate-900 shadow-lg object-cover"
                            width={150}
                            height={150}
                        />
                    </div>
                </div>

                <div className="text-center lg:text-left mb-6">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                        {profile?.name}
                    </h1>
                    <p className="text-blue-600 font-medium mb-3">{profile?.bio || "Travel Enthusiast"}</p>
                    <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-500 dark:text-slate-400 text-sm">
                        <MapPin className="size-4" />
                        <span>{profile?.currentLocation || "Location not set"}</span>
                    </div>
                </div>

                <div className="flex gap-4 justify-center lg:justify-start mb-8">
                    {isMe && <EditProfileModal currentUser={profile} onSuccess={fetchUserProfile} />}
                    <button className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <Mail className="size-5" />
                    </button>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                        <Mail className="size-5 text-slate-400" />
                        <span className="text-sm">{profile?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                        <Phone className="size-5 text-slate-400" />
                        <span className="text-sm">{profile?.contactNumber || "Not provided"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                        <Calendar className="size-5 text-slate-400" />
                        <span className="text-sm">
                            Joined {new Date(profile?.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-lg border border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4">
                <StatItem label="Age" value={profile?.age || 0} />
                <StatItem label="Countries" value={profile?.visitedCountries?.length || 0} />
                <StatItem label="Interests" value={profile?.travelInterests?.length || 0} />
                <StatItem label="Gender" value={profile?.gender || "N/A"} />
            </div>
        </div>
    );
}

function StatItem({ label, value }: { label: string, value: any }) {
    return (
        <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</div>
        </div>
    );
}
