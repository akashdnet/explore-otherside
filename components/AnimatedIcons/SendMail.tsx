"use client";
import Icon from "@/public/lotties/SendMail.json";
import Lottie from "lottie-react";

const SendMailAnimation = () => (
    <span className="flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl ">
        <Lottie
            animationData={Icon}
            loop={true}
            style={{ width: "100%", height: "100%" }}
        />
    </span>
);

export default SendMailAnimation;
