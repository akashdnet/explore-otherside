import { Caveat } from "next/font/google";
import Link from "next/link";
import LogoAnimation from "./AnimatedIcons/Logo";

const caveat = Caveat({ subsets: ["latin"] });

export default function Footer() {
    return (
        <footer className="bg-amber-200 pb-4 mt-5  ">
            <div className="container mx-auto md:max-w-6xl">
                <div className="grid grid-cols-3 justify-between ">
                    <div className="col-span-2">
                        <div className="flex items-center -ml-12">
                            <LogoAnimation />
                            <h1 className={`text-5xl font-extrabold ${caveat.className} -ml-9`}>Explore Otherside</h1>
                        </div>
                        <p className="-mt-9">
                            At Explore Otherside, we believe that every journey tells a story. Our mission is to turn your travel dreams into unforgettable experiences by offering personalized itineraries, seamless planning, and exceptional service. Whether you’re seeking a relaxing beach holiday, a cultural city escape, or an adventurous trek through nature, we design trips that match your unique interests and budget.
                        </p>
                    </div>
                    <div className="py-9 justify-self-end  ">

                        <h1 className="text-xl font-bold">Quick Links</h1>
                        <ul >
                            <li>
                                <Link
                                    className="inline-block relative after:block after:h-[2px] after:bg-[#FE9A00] after:w-0 hover:after:w-full after:transition-all after:duration-300"
                                    href={"/"}>Home</Link>
                            </li>
                            <li>
                                <Link
                                    className="inline-block relative after:block after:h-[2px] after:bg-[#FE9A00] after:w-0 hover:after:w-full after:transition-all after:duration-300"
                                    href={"/explore"}>Explore</Link>
                            </li>
                            <li>
                                <Link
                                    className="inline-block relative after:block after:h-[2px] after:bg-[#FE9A00] after:w-0 hover:after:w-full after:transition-all after:duration-300"
                                    href={"/about"}>About</Link>
                            </li>
                            <li>
                                <Link
                                    className="inline-block relative after:block after:h-[2px] after:bg-[#FE9A00] after:w-0 hover:after:w-full after:transition-all after:duration-300"
                                    href={"/contact"}>Contact</Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
            <hr className="my-5 border-gray-300 " />
            <div className="flex justify-center ">
                <p>Copyright © 2025 Explore Otherside. All rights reserved.</p>
            </div>
        </footer>
    )
}
