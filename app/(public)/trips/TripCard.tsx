"use client";

import { cancelJoinRequest, requestToJoinTrip } from "@/actions/trip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginModal from "../../../components/auth/LoginModal";

interface TripCardProps {
    trip: any;
    isAuthenticated?: boolean;
    userId?: string | null;
}

export default function TripCard({ trip, isAuthenticated, userId }: TripCardProps) {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    const isOwner = userId && trip.userId._id === userId;
    const isPending = userId && trip.participants?.pending?.includes(userId);
    const isApproved = userId && trip.participants?.approved?.includes(userId)

    // console.log(trip, "trip data")




    const handleJoinRequest = async () => {
        if (!isAuthenticated) {
            setLoginModalOpen(true);
            return;
        }

        setIsLoading(true);
        try {
            let res;
            if (isApproved) {
                res = await cancelJoinRequest(trip._id);
            } else {
                res = await requestToJoinTrip(trip._id, userId!);
            }

            if (res?.success) {
                toast({
                    title: "Success",
                    description: isApproved ? "Left trip successfully" : "Join request sent successfully",
                    className: "bg-green-500 text-white",
                });
                router.refresh();
            } else {
                toast({
                    title: "Error",
                    description: res?.message || (isApproved ? "Failed to leave trip" : "Failed to send join request"),
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const getButtonText = () => {
        if (!isAuthenticated) return "Login to Join";
        if (isLoading) return "Processing...";
        if (isOwner) return "Owned";
        if (isPending) return "Pending Request";
        if (isApproved) return "Upcoming Trip";
        return "Request to Join";
    };

    return (
        <>
            <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full group">
                    {/* Trip Image or Fallback */}
                    {trip.photos && trip.photos.length > 0 ? (
                        <Image
                            src={trip.photos[0]}
                            alt={trip.destination}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                            <MapPin className="h-10 w-10" />
                        </div>
                    )}
                    <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs font-semibold uppercase">
                        {trip.travelType}
                    </div>
                </div>

                <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-xl font-bold line-clamp-1" title={trip.destination}>
                            {trip.destination}
                        </CardTitle>
                        <span className="font-semibold text-primary">
                            ${trip.budget?.toLocaleString()}
                        </span>
                    </div>
                </CardHeader>

                <CardContent className="p-4 grow space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {trip.description}
                    </p>

                    <div className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>
                                {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="p-4 pt-0 flex flex-col gap-2">
                    <Button
                        className="w-full"
                        onClick={() => router.push(`/trips/${trip._id}`)}
                    >
                        View Details
                    </Button>
                    <Button
                        className={`w-full ${isOwner ? "bg-green-500" : ""} ${!isAuthenticated ? "bg-fuchsia-200" : ""}`}
                        onClick={handleJoinRequest}
                        disabled={isLoading || isOwner || isPending}
                        variant={isAuthenticated ? "default" : "secondary"}
                    >
                        {getButtonText()}
                    </Button>
                </CardFooter>
            </Card>

            <LoginModal
                isOpen={loginModalOpen}
                onClose={() => setLoginModalOpen(false)}
                onSuccess={() => {
                }}
            />
        </>
    );
}
