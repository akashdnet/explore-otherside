import { Pacifico } from "next/font/google";
const pacifico = Pacifico({ subsets: ["latin"], weight: "400", });

export default function Banner() {
    const img = "https://images.unsplash.com/photo-1524467128837-00f6644866d7?q=80&w=1156&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    return (
        <section
            className="relative w-full rounded-3xl overflow-hidden flex items-center justify-center py-20 my-10 shadow-2xl"
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
