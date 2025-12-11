"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import EditTripForm from "./EditTripForm";

interface EditTripModalProps {
    trip: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export default function EditTripModal({ trip, open, onOpenChange, onSuccess }: EditTripModalProps) {
    const handleSuccess = () => {
        onOpenChange(false);
        onSuccess?.();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Trip</DialogTitle>
                </DialogHeader>
                <EditTripForm trip={trip} onSuccess={handleSuccess} />
            </DialogContent>
        </Dialog>
    );
}
