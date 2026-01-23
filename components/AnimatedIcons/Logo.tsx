"use client"
import Logo from "@/public/logo.json";
import Lottie from "lottie-react";

const LogoAnimation = ({ header }: { header?: boolean }) => (
    <span className={`${!header ? "w-48 h-48 absolute -left-10" : "w-16 h-16"}  `}>
        <Lottie animationData={Logo} loop={true} />
    </span>
)
export default LogoAnimation;