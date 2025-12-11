"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import EditProfileForm from "./EditProfileForm";

interface EditProfileModalProps {
    currentUser: any;
    onSuccess?: () => void;
}

export default function EditProfileModal({ currentUser, onSuccess }: EditProfileModalProps) {
    const [open, setOpen] = useState(false);

    const handleSuccess = () => {
        setOpen(false);
        onSuccess?.();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-2.5 rounded-xl font-bold hover:opacity-90 transition-opacity">
                    Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <EditProfileForm currentUser={currentUser} onSuccess={handleSuccess} />
            </DialogContent>
        </Dialog>
    );
}
