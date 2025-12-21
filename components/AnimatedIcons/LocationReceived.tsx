"use client"
import Icon from "@/public/lotties/LocationReceived.json";
import Lottie from "lottie-react";

const LocationReceivedAnimation = () => (
    <span className={`    flex justify-center items-center bg-[#F2F2F2] rounded-2xl `}>
        <Lottie
            animationData={Icon}
            loop={false}
            style={{ width: "70%", height: "70%" }}
        />
    </span>
)
export default LocationReceivedAnimation;