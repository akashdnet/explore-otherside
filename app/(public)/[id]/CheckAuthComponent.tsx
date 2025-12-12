import Link from "next/link";
import { PiSupersetProperOfLight } from "react-icons/pi";

export const checkAuth = (email: string) => {

    if (email) {
        return <>
            <Link href="/">
                <button className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white font-medium transition-colors cursor-pointer">
                    <PiSupersetProperOfLight className="size-4" />Return  Home
                </button>
            </Link>

            {/* <Link href="/dashboard">
                <button className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white font-medium transition-colors cursor-pointer">
                    <Settings className="size-4" /> Dashboard
                </button>
            </Link> */}
        </>
    } else {
        return <>


            <Link href="/">
                <button className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white font-medium transition-colors cursor-pointer">
                    <PiSupersetProperOfLight className="size-4" />Return  Home
                </button>
            </Link>

            {/* <Link href="/login">
                <button className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white font-medium transition-colors cursor-pointer">
                    <Settings className="size-4" /> Login
                </button>
            </Link> */}

        </>
    }


}