import LocationReceivedAnimation from "@/components/AnimatedIcons/LocationReceived";
import TourMateAnimation from "@/components/AnimatedIcons/TourMate";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
    return (
        <section className="space-y-9 leading-relaxed text-lg mb-18 mt-9">

            <div className="space-y-4">
                <h1 className="text-5xl font-bold text-center text-[#FE9A00]">
                    Get Your Destination with Travel Buddies
                </h1>
                <p className="mt-4 text-slate-700 dark:text-slate-300 text-justify">
                    Traveling is not just about reaching a place, it is about the stories you collect,
                    the people you meet, and the memories you create along the way. With Travel Buddies,
                    we make sure your journey is more than a simple trip — it becomes a meaningful adventure.
                    Our platform connects explorers from different backgrounds, allowing them to share costs,
                    experiences, and companionship while discovering new destinations. Whether you are planning
                    a short weekend escape or a long international expedition, Travel Buddies ensures that you
                    never feel alone. We combine smart technology with human connection, offering features like
                    intelligent search tools, curated itineraries, and the Tour Mate option that lets you invite
                    friends or meet new companions. By blending convenience, affordability, and community, we
                    transform travel into a richer, more colorful experience where every destination feels like
                    home and every journey feels like a story worth telling.
                </p>
            </div>

            <div className="grid grid-cols-2 items-center justify-between gap-12">
                <LocationReceivedAnimation />
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold">Smart Travel Search</h1>
                    <p>
                        Our travel agency offers a simple and smart search feature that lets travelers instantly
                        discover destinations, packages, and deals. By typing in their preferred location or trip
                        idea, customers can quickly access the most relevant options and enjoy a smooth, hassle‑free
                        booking experience. Designed to save time and enhance convenience, this intuitive search tool
                        ensures that every traveler finds the perfect journey without unnecessary steps. With clear
                        results and easy navigation, planning your next adventure becomes faster, easier, and more
                        enjoyable.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 items-center justify-between gap-12">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold">Tour Mate Feature</h1>
                    <p>
                        Our travel agency introduces a unique Tour Mate feature that makes every journey more engaging.
                        When a traveler books a tour, they can add participants to join the same trip, creating a shared
                        experience instead of traveling alone. This option allows friends, family, or even new companions
                        to connect through the same itinerary, ensuring that each traveler enjoys not only the destination
                        but also the company of their tour mates.
                    </p>
                </div>
                <TourMateAnimation />
            </div>


            <Button asChild className="w-fit mx-auto text-center text-xl font-bold py-6 px-6 flex justify-center items-center gap-3 bg-[#dc8f1c] hover:bg-[#eb7048]">
                <Link href="/explore" className="flex justify-center items-center gap-3">
                    🔥<span>Explore Tours Now</span>🔥
                </Link>
            </Button>
        </section>
    )
}
