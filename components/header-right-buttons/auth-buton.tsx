"use client";
import { getMyProfile } from '@/actions/user';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

export default function AuthBtton() {
    console.log(`AuthBtton`)
    const [user, setUser] = useState<any>(null);

    const fetchUserProfile = async () => {

        try {
            const res = await getMyProfile();
            if (res?.success && res?.data) {
                const fetchedUser = res.data;
                if (fetchedUser.profile) {
                    setUser(fetchedUser);
                    console.log("User profile fetched successfully:", fetchedUser);
                } else {
                    setUser({
                        profile: fetchedUser,
                        overview: { upcomingTripList: [] }
                    });
                }
            }

        } catch (error) {
            console.error("Failed to fetch user profile:", error);

        };




    }






    useEffect(() => {
        fetchUserProfile();
    }, []);





    return (
        <div>
            <ul className="flex items-center space-x-5">

                {user ? (
                    <>
                        <li>
                            <Link className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded" href="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded" onClick={() => { console.log("Logout") }}>Logout</Button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded" href="/login">Login</Link>
                        </li>
                        <li>
                            <Link className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded" href="/register">Register</Link>
                        </li>
                    </>
                )}

            </ul>
        </div>
    )
}
