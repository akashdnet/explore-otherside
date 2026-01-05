import { Caveat } from "next/font/google";
import Link from "next/link";
import LogoAnimation from "./AnimatedIcons/Logo";
import AuthBtton from "./header-right-buttons/auth-buton";

const caveat = Caveat({ subsets: ["latin"] });

export default function Header() {

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm sticky top-0 z-50 transition-all duration-300 mb-3">
            <section className="container mx-auto flex items-center justify-between md:max-w-6xl py-3 px-4">
                {/* logo  */}
                <Link href="/" className="flex items-center group">
                    <div className="transition-transform w-18 duration-300 group-hover:scale-110">
                        <LogoAnimation header />
                    </div>
                    <h1 className={`text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-900 to-slate-700 ${caveat.className} -ml-3`}>
                        Explore Otherside
                    </h1>
                </Link>

                {/* menu */}
                <nav className="hidden md:block">
                    <ul className="flex font-semibold text-slate-600 space-x-8">
                        {['Home', 'Explore', 'About', 'Contact'].map((item) => (
                            <li key={item} className="relative group">
                                <Link
                                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    className="hover:text-amber-500 transition-colors duration-300"
                                >
                                    {item}
                                </Link>
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full" />
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* login, sign up, profile, dashboard buttons */}
                <AuthBtton />
            </section>
        </header>
    )
}
