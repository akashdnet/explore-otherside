import LoadingAnimation from "@/components/AnimatedIcons/loading";
import { Suspense } from "react";
import TripManagementPage from "./TripManagementPage";

export default function Page() {
    return <div className="w-full max-w-5xl mx-auto p-3 md:p-4">
        <Suspense fallback={<LoadingAnimation />}>
            <TripManagementPage />
        </Suspense>
    </div>;
}
