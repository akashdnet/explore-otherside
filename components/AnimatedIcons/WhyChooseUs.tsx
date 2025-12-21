"use client";
import Icon from "@/public/lotties/WhyChooseUs.json";
import Lottie from "lottie-react";

const WhyChooseUsAnimation = () => (
    <span className="flex justify-center items-center  rounded-2xl ">
        <Lottie
            animationData={Icon}
            loop={true}
            style={{ width: "70%", height: "70%" }}
        />
    </span>
);

export default WhyChooseUsAnimation;
