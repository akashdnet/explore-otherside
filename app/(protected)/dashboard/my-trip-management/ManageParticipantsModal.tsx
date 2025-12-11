
"use client";

import { approveJoinRequest } from "@/actions/trip";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface ManageParticipantsModalProps {
    trip: any; // Using any for now as Trip type might need update
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function ManageParticipantsModal({ trip, isOpen, onClose, onSuccess }: ManageParticipantsModalProps) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const pendingParticipants = trip?.participants?.pending || [];

    const handleApprove = async (userId: string) => {
        setIsLoading(true);
        try {
            const res = await approveJoinRequest({ tripId: trip._id, participantId: userId });
            if (res?.success) {
                toast({
                    title: "Success",
                    description: "User approved successfully",
                    className: "bg-green-500 text-white",
                });
                onSuccess?.();
            } else {
                toast({
                    title: "Error",
                    description: res?.message || "Failed to approve user",
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

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Manage Join Requests</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    {pendingParticipants.length === 0 ? (
                        <p className="text-center text-slate-500">No pending requests.</p>
                    ) : (
                        <ul className="space-y-2">
                            {pendingParticipants.map((participant: any, index: number) => {
                                // Handle both populated object and ID string cases
                                const userId = typeof participant === 'string' ? participant : participant?._id;
                                const userName = typeof participant === 'string' ? participant : participant?.name || participant?.email || "Unknown User";

                                return (
                                    <li key={userId || index} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border">
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                className="h-8 bg-green-600 hover:bg-green-700 text-white px-3"
                                                onClick={() => handleApprove(userId)}
                                                disabled={isLoading}
                                            >
                                                Accept
                                            </Button>
                                        </div>
                                        <span className="font-medium text-sm truncate max-w-[150px]" title={userName}>
                                            {userName}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
