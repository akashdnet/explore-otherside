"use client";
import Icon from "@/public/lotties/TourMate.json";
import Lottie from "lottie-react";

const TourMateAnimation = () => (
    <span className="flex justify-center items-center bg-[#F2F2F2] rounded-2xl ">
        <Lottie
            animationData={Icon}
            loop={true}
            style={{ width: "50%", height: "50%" }}
        />
    </span>
);

export default TourMateAnimation;
