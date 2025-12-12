"use client";
import { getMyProfile, getUserById } from "@/actions/user";
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  Plane
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineModeOfTravel } from "react-icons/md";
import { checkAuth } from "./CheckAuthComponent";
import EditProfileModal from "./EditProfileModal";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const profileId = params?.id as string;
  const isMe = profileId === "me";

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      if (isMe) {
        // Fetch my profile
        const res = await getMyProfile();
        console.log(res, "res");
        if (res?.success && res?.data) {
          const fetchedUser = res.data;
          console.log(fetchedUser, "fetchedUser");
          if (fetchedUser.profile) {
            setUser(fetchedUser);
          } else {
            setUser({
              profile: fetchedUser,
              overview: { upcomingTripList: [] }
            });
          }
          console.log(res.data, "profile fetch")
        } else {
          router.push("/login");
        }
      } else {



        const res = await getUserById(profileId);
        if (res?.success && res?.data) {
          const fetchedUser = res.data;
          if (fetchedUser.profile) {
            setUser(fetchedUser);
          } else {
            // Adapt simple user object to expected structure
            setUser({
              profile: fetchedUser,
              overview: { upcomingTripList: [] } // API might not return this for others, so fallback
            });
          }
        }
      }

    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      if (isMe) {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profileId) {
      fetchUserProfile();
    }
  }, [profileId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-black/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-black/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400">Failed to load profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black/20 pb-20">
      {/* Cover Image Section */}
      <div className="relative h-[250px] md:h-[350px] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')` }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/60" />
        </div>

        <div className="absolute top-6 right-6 flex gap-3">
          {checkAuth(user?.profile?.email)}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar / Profile Card */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-800">
              <div className="relative -mt-20 mb-6 text-center lg:text-left">
                <div className="relative inline-block">
                  <img
                    src={user?.profile?.photo || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"}
                    alt={user?.profile?.name}
                    className="size-36 lg:size-40 rounded-full border-[6px] border-white dark:border-slate-900 shadow-lg object-cover"
                  />

                </div>
              </div>

              <div className="text-center lg:text-left mb-6">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {user?.profile?.name}</h1>
                <p className="text-blue-600 font-medium mb-3">{user?.profile?.bio || "Travel Enthusiast"}</p>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-500 dark:text-slate-400 text-sm">
                  <MapPin className="size-4" />
                  <span>{user?.profile?.currentLocation || "Location not set"}</span>
                </div>
              </div>

              <div className="flex gap-4 justify-center lg:justify-start mb-8">
                {isMe && <EditProfileModal currentUser={user?.profile} onSuccess={fetchUserProfile} />}
                <button className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <Mail className="size-5" />
                </button>
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <Mail className="size-5 text-slate-400" />
                  <span className="text-sm">{user?.profile?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <Phone className="size-5 text-slate-400" />
                  <span className="text-sm">{user?.profile?.contactNumber || "Not provided"}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <Calendar className="size-5 text-slate-400" />
                  <span className="text-sm">Joined {new Date(user?.profile?.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-lg border border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{user?.profile?.age || 0}</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Age</div>
              </div>
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{user?.profile?.visitedCountries?.length || 0}</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Countries</div>
              </div>
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{user?.profile?.travelInterests?.length || 0}</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Interests</div>
              </div>
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <div className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1">
                  {user?.profile?.gender || "N/A"}
                </div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Gender</div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-2/3 space-y-6 lg:mt-20">
            {/* Bio / About */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                {user?.profile?.about || "No bio provided yet."}
              </p>

              <div className="mt-8">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Travel Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {user?.profile?.travelInterests && user?.profile?.travelInterests.length > 0 ? (
                    user?.profile?.travelInterests.map((interest: string, _index: number) => (
                      <span key={_index} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-full text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-default">
                        {interest}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500">No interests added yet</span>
                  )}
                </div>
              </div>

              {user?.profile?.visitedCountries && user?.profile?.visitedCountries.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Visited Countries</h3>
                  <div className="flex flex-wrap gap-2">
                    {user?.profile?.visitedCountries.map((country: string, _index: number) => (
                      <span key={_index} className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 rounded-full text-sm font-medium">
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Upcoming Trips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-600 text-white rounded-3xl p-8 shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-1">Upcoming Trips</h2>
                  {/* <p className="text-blue-100 mb-6">Manage your finances</p> */}
                  {/* <UpcomingTripSection events={user.upcomingTripList} /> */}
                  {/* {user?.overview?.} */}
                  <ul className="space-y-2">
                    {user?.overview?.upcomingTripList?.map((trip: any, index: number) => (
                      <li key={index} className="flex items-center gap-2"> <MdOutlineModeOfTravel />{trip?.destination} {index}</li>
                    ))}
                  </ul>

                </div>
                <div className="absolute top-0 right-0 -mr-16 -mt-16 size-48 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 size-48 rounded-full bg-black/10 blur-2xl" />
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Completed Trips</h2>
                  <Plane className="text-blue-600 size-6" />
                </div>
                <p className="text-slate-500 text-sm">No completed trips yet</p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}











