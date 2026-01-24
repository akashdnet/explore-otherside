import { Pacifico } from "next/font/google";
const pacifico = Pacifico({ subsets: ["latin"], weight: "400", });

export default function Banner() {
    const img = "https://images.unsplash.com/photo-1524467128837-00f6644866d7"
    return (
        <section
            className="relative w-full rounded-3xl overflow-hidden flex items-center justify-center h-96 shadow-2xl"
            style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="absolute inset-0 bg-black/5"></div>
            <h1
                className={`${pacifico.className} text-6xl text-[#FE9A00]  [-webkit-text-stroke:1px_#F7F4EA] font-extrabold text-center`}

            >
                Your Best <br />Tourism Partner Platform
            </h1>

        </section>
    );
}
