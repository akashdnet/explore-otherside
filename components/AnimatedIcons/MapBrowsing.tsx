"use client"
import Icon from "@/public/lotties/MapBrowsing.json";
import Lottie from "lottie-react";

const MapBrowsingAnimation = ({ width, height }: { width: number; height: number }) => (
    <span className={`w-${width} h-${height}`}>
        <Lottie animationData={Icon} loop={true} />
    </span>
)
export default MapBrowsingAnimation;