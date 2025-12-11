import { logoutUser } from "@/actions/auth";
import { cookies } from "next/headers";
import Link from "next/link";
import { RiFlightTakeoffFill } from "react-icons/ri";

export default async function Header() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("accessToken")?.value;

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-4 sm:px-10 py-3">
      <div className="flex items-center gap-4 text-slate-900 dark:text-slate-50">
        <div className="text-primary">
          <span className="material-symbols-outlined text-3xl"><RiFlightTakeoffFill /></span>
        </div>
        <h2 className="text-slate-900 dark:text-slate-50 text-lg font-bold leading-tight tracking-[-0.015em]">Travel Buddy</h2>
      </div>
      <div className="hidden lg:flex flex-1 justify-center gap-9">
        <Link className="text-slate-900 dark:text-slate-200 text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary" href="/">
          Home
        </Link>
        <Link className="text-slate-900 dark:text-slate-200 text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary" href="/trips">
          Explore Trips
        </Link>
        <Link className="text-slate-900 dark:text-slate-200 text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary" href="#">
          Find Travel Buddy
        </Link>
      </div>
      <div className="flex gap-2">
        {authToken ? (
          <>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em]">
              <Link href="/dashboard" className="truncate">Dashboard</Link>
            </button>
            <form action={logoutUser}>
              <button type="submit" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-red-500 text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Logout</span>
              </button>
            </form>
          </>
        ) : (
          <>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]">
              <Link href="/login" className="truncate">Login</Link>
            </button>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em]">
              <Link href="/register" className="truncate">Register</Link>
            </button>
          </>
        )}
      </div>
    </header>
  )
}