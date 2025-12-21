"use client";
import Icon from "@/public/lotties/404.json";
import Lottie from "lottie-react";

const SignUpAnimation = () => (
    <span className="flex justify-center items-center rounded-2xl w-full">
        <Lottie
            animationData={Icon}
            loop={true}
            style={{ width: "50%", height: "50%" }}
        />
    </span>
);

export default SignUpAnimation;
