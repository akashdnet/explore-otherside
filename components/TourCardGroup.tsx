import { Trip } from "@/lib/types";
import TourCard from "./TourCard";
import { Button } from "./ui/button";




interface TourCardGroupProps {
    title: string;
    data: Trip[];
    row: number;
    exploreButton?: boolean;
}

export default function TourCardGroup({ title, data, row, exploreButton }: TourCardGroupProps) {
    return (
        <section className="space-y-8 flex flex-col items-center py-20">
            <h1 className="text-5xl font-bold text-center text-[#FE9A00]">{title}</h1>

            <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${Number(row)} gap-4`}>
                {data?.map((item: Trip, index: number) => (
                    <TourCard key={index} tour={item} />
                ))}
            </div>

            {exploreButton && <Button className="text-center text-xl font-bold py-6 px-6 flex justify-center items-center gap-3 bg-[#dc8f1c] hover:bg-[#eb7048]">🔥<span>Explore More</span>🔥</Button>}
        </section>
    )
}
