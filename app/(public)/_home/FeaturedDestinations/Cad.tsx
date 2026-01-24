import { Button } from "@/components/ui/button";
import { Group, Users2 } from "lucide-react";

export default function Card({ src }: { src: string }) {
    return (
        <section
            className=" h-[500px] relative rounded-2xl "
            style={{
                backgroundImage:
                    `url('${src}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >

            {/* featured banner */}
            <div className="absolute z-10 top-4 -left-6 bg-linear-to-r from-[#FE9A00] to-[#FFCC70] px-4 py-1  rounded-xl shadow-lg">
                <h1 className="text-white font-bold  tracking-wide uppercase drop-shadow-md">
                    Featured Destinations
                </h1>
            </div>










            {/* fro gradient overlay */}
            <div className={`absolute bottom-[220px] w-full h-20 bg-linear-to-t from-white/80 to-transparent`}></div>

            {/* info section */}
            <section className={`px-4  absolute bottom-0 w-full h-[220px] bg-white/80 space-y-3`}>

                {/* titles  */}
                <div className="flex justify-between">
                    <div>
                        <h1 className="font-bold text-lg">title</h1>
                        <h2 className="text-sm font-semibold">location</h2>
                    </div>
                    <div>
                        <h1 className="font-bold text-lg text-end">$856</h1>
                        {/* icons */}
                        <div className="flex gap-5 justify-end">

                            <div className="flex items-center gap-1">
                                <Users2 size={16} className="font-bold" />
                                <h1 className="text-sm font-semibold">10</h1>
                            </div>

                            <div className="flex items-center gap-1">
                                <Group size={16} />
                                <h1 className="text-sm font-semibold">10</h1>
                            </div>
                            <div className="flex items-center gap-1">
                                <Group size={16} />
                                <h1 className="text-sm font-semibold">10</h1>
                            </div>
                        </div>
                    </div>
                </div>





                {/* more one liner info */}
                <div className="grid grid-cols-3 gap-2">
                    <div>
                        <h1 className="text-sm font-semibold">Start Date</h1>
                        <div className="flex flex-col">
                            <p>10-11-2024</p>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-sm font-semibold">Duration</h1>
                        <p className="text-sm">4 Days</p>
                    </div>
                    <div>
                        <h1 className="text-sm font-semibold">category</h1>
                        <div className="flex flex-col text-sm">
                            <p>Adventure 1</p>
                        </div>
                    </div>
                </div>

                {/* action btn  */}
                <div className="flex flex-col gap-2">
                    <Button className="bg-[#FE9A00] hover:bg-[#e18905]/90">Book Now</Button>
                    <Button variant={"outline"} className="border border-[#FE9A00] bg-transparent/90 text-[#FE9A00] hover:text-[#FE9A00] hover:bg-white transition-all duration-200" >View Details</Button>
                </div>
            </section>


        </section>



    );
}
