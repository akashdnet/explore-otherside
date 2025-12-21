import { Caveat } from "next/font/google";
import Link from "next/link";
import LogoAnimation from "./AnimatedIcons/Logo";
import AuthBtton from "./header-right-buttons/auth-buton";

const caveat = Caveat({ subsets: ["latin"] });

export default function Header() {

    return (
        <header className="text-center bg-amber-200   shadow-2xl mb-5 sticky top-0 z-50">

            <section className="container mx-auto flex items-center justify-between md:max-w-6xl">
                {/* logo  */}
                <div className="flex items-center justify-center ">
                    <LogoAnimation header />
                    <h1 className={`text-3xl font-bold ${caveat.className} -ml-3  `}>Explore Otherside</h1>
                </div>

                {/* menu */}
                <div>
                    <ul className="flex font-bold text-xl space-x-5">
                        <li className="relative inline-block">
                            <Link
                                href="/"
                                className="relative after:block after:h-[2px] after:bg-[#FE9A00] after:w-0 hover:after:w-full after:transition-all after:duration-300"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="relative inline-block">
                            <Link
                                href="/explore"
                                className="relative after:block after:h-[2px] after:bg-[#FE9A00] after:w-0 hover:after:w-full after:transition-all after:duration-300"
                            >
                                Explore
                            </Link>
                        </li>
                        <li className="relative inline-block">
                            <Link
                                href="/about"
                                className="relative after:block after:h-[2px] after:bg-[#FE9A00] after:w-0 hover:after:w-full after:transition-all after:duration-300"
                            >
                                About
                            </Link>
                        </li>
                        <li className="relative inline-block">
                            <Link
                                href="/contact"
                                className="relative after:block after:h-[2px] after:bg-[#FE9A00] after:w-0 hover:after:w-full after:transition-all after:duration-300"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>


                {/* login, sign up, profile, dashboard buttons */}
                <AuthBtton />
            </section>
        </header>
    )
}
