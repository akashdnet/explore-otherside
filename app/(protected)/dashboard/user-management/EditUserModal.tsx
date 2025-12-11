"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import EditUserForm from "./EditUserForm";
import { User } from "./UserTable";

interface EditUserModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function EditUserModal({ user, isOpen, onClose, onSuccess }: EditUserModalProps) {
    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>
                <EditUserForm user={user} onSuccess={onSuccess} />
            </DialogContent>
        </Dialog>
    );
}
