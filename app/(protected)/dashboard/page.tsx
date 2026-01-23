"use client";

import { getMyProfile } from "@/actions/user";
import { useEffect, useState } from "react";
import OverviewPage from "./overview/page";

export default function Page() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getMyProfile();
        if (res?.success) {
          setUser(res.data?.profile || res.data || null);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);


  if (user?.role === "admin" || user?.role === "guide" || user?.role === "user") {
    return <OverviewPage user={user} />;
  } else if (user?.email) {
    return <h1>Something went wrong</h1>;
  } else {
    return <h1>Access denied</h1>;
  }
}
