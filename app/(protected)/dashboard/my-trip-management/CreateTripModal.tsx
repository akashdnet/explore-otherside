"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import CreateTripForm from "./CreateTripForm";

interface CreateTripModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export default function CreateTripModal({ open, onOpenChange, onSuccess }: CreateTripModalProps) {
    const handleSuccess = () => {
        onOpenChange(false);
        onSuccess?.();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Trip</DialogTitle>
                </DialogHeader>
                <CreateTripForm onSuccess={handleSuccess} />
            </DialogContent>
        </Dialog>
    );
}
