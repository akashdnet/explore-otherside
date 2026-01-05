import WhyChooseUsAnimation from "../../../components/AnimatedIcons/WhyChooseUs";

export default function WhyChooseUs() {
    return (
        <section className="grid grid-cols-2 gap-10 items-center justify-between">

            {/* image  */}
            <WhyChooseUsAnimation />

            {/* text  */}
            <div className="flex flex-col items-center justify-center space-y-6 leading-relaxed text-lg ">
                <h1 className="text-5xl font-bold text-center text-[#FE9A00]">Why Choose Us</h1>
                <p>We make travel simple, fun, and meaningful. With our smart search, you can quickly find the right destinations, packages, and deals without wasting time. It is easy to use and helps you plan your trip smoothly. Our special Tour Mate feature also makes your journey more enjoyable by letting you add friends or companions to travel with you. This way, you never have to explore alone and can share experiences together. Choosing us means faster planning, better connections, and more memorable adventures.</p>
            </div>
        </section>
    )
}
