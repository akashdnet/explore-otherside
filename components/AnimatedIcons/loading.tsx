"use client";
import Icon from "@/public/lotties/loading-icon.json";
import Lottie from "lottie-react";

const LoadingAnimation = () => (
    <span className="flex justify-center items-center rounded-2xl ">
        <Lottie
            animationData={Icon}
            loop={true}
            style={{ width: "100%", height: "100%" }}
        />
    </span>
);

export default LoadingAnimation;
