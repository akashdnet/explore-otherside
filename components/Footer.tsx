import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { Caveat } from "next/font/google";
import Link from "next/link";
import LogoAnimation from "./AnimatedIcons/Logo";

const caveat = Caveat({ subsets: ["latin"] });

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 mt-20">
            <div className="container mx-auto md:max-w-6xl px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <div className="flex items-center -ml-4 relative">
                            <LogoAnimation />
                            <h1 className={`text-4xl font-extrabold text-white ${caveat.className} ml-28 mb-5`}>Explore Otherside</h1>
                        </div>
                        <p className="text-slate-400 max-w-md leading-relaxed">
                            At Explore Otherside, we believe that every journey tells a story. Our mission is to turn your travel dreams into unforgettable experiences by offering personalized itineraries, seamless planning, and exceptional service.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <Link href="#" className="p-2 bg-slate-800 hover:bg-amber-500 hover:text-white rounded-full transition-all duration-300">
                                <Facebook className="size-5" />
                            </Link>
                            <Link href="#" className="p-2 bg-slate-800 hover:bg-amber-500 hover:text-white rounded-full transition-all duration-300">
                                <Instagram className="size-5" />
                            </Link>
                            <Link href="#" className="p-2 bg-slate-800 hover:bg-amber-500 hover:text-white rounded-full transition-all duration-300">
                                <Twitter className="size-5" />
                            </Link>
                            <Link href="#" className="p-2 bg-slate-800 hover:bg-amber-500 hover:text-white rounded-full transition-all duration-300">
                                <Youtube className="size-5" />
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-white text-lg font-bold">Quick Links</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link href="/explore" className="hover:text-amber-500 transition-colors">Explore</Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-amber-500 transition-colors">About Us</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-amber-500 transition-colors">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-white text-lg font-bold">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="size-5 text-amber-500 shrink-0" />
                                <span>123 Travel Lane, Adventure City, World 45678</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="size-5 text-amber-500 shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="size-5 text-amber-500 shrink-0" />
                                <span>hello@exploreotherside.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>Copyright © 2025 Explore Otherside. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-amber-500 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
