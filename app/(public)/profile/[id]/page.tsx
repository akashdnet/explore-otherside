"use client";

import { getMyProfile, getUserById } from "@/actions/user";
import LoadingAnimation from "@/components/AnimatedIcons/loading";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileCover from "./ProfileCover";
import ProfileDetails from "./ProfileDetails";
import ProfileSidebar from "./ProfileSidebar";
import ProfileTrips from "./ProfileTrips";

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
        const res = await getMyProfile();
        if (res?.success && res?.data) {
          const fetchedUser = res.data;
          if (fetchedUser.profile) {
            setUser(fetchedUser);
          } else {
            setUser({
              profile: fetchedUser,
              overview: { upcomingTripList: [] }
            });
          }
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
            setUser({
              profile: fetchedUser,
              overview: { upcomingTripList: [] }
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
      <LoadingAnimation />
    )
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
    <div className="pb-20">
      <ProfileCover email={user?.profile?.email} />

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <ProfileSidebar
            user={user}
            isMe={isMe}
            fetchUserProfile={fetchUserProfile}
          />

          <div className="lg:w-2/3 space-y-6 lg:mt-20">
            <ProfileDetails profile={user?.profile} />
            <ProfileTrips overview={user?.overview} />
          </div>
        </div>
      </div>
    </div>
  );
}











