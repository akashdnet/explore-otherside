"use client";
import { logoutUser } from '@/actions/auth';
import { getMyProfile } from '@/actions/user';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

export default function AuthBtton() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    const fetchUserProfile = async () => {
        try {
            const res = await getMyProfile();
            if (res?.success && res?.data) {
                const fetchedUser = res.data;
                setUser(fetchedUser.profile ? fetchedUser : { profile: fetchedUser });
            }
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
        }
    }

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const handleLogout = async () => {
        await logoutUser();
        setUser(null);
        router.push('/login');
        router.refresh();
    }

    return (
        <div className="flex items-center gap-4">
            {user ? (
                <>
                    <Link href="/dashboard">
                        <Button variant="ghost" className="font-semibold text-slate-700 hover:text-amber-600 hover:bg-amber-50">
                            Dashboard
                        </Button>
                    </Link>
                    <Button
                        variant="default"
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 rounded-full transition-all"
                    >
                        Logout
                    </Button>
                </>
            ) : (
                <>
                    <Link href="/login">
                        <Button variant="ghost" className="font-semibold text-slate-700 hover:text-amber-600 hover:bg-amber-50">
                            Login
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 rounded-full shadow-lg shadow-amber-500/30 transition-all hover:scale-105">
                            Join Now
                        </Button>
                    </Link>
                </>
            )}
        </div>
    )
}
