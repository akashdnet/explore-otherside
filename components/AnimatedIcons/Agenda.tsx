"use client";
import Icon from "@/public/lotties/Agenda.json";
import Lottie from "lottie-react";

const AgendaAnimation = () => (
    <span className="flex justify-center items-center bg-[#F2F2F2] rounded-2xl ">
        <Lottie
            animationData={Icon}
            loop={true}
            style={{ width: "100%", height: "100%" }}
        />
    </span>
);

export default AgendaAnimation;
