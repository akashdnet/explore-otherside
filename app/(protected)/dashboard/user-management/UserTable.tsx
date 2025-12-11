
"use client";

import { deleteUserById } from "@/actions/user";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import EditUserModal from "./EditUserModal";

export interface User {
    _id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    status: "active" | "blocked";
    createdAt: string;
}

interface props {
    data: User[];
    isLoading?: boolean;
    onRefresh?: () => void;
}

const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
        case "active":
            return "bg-green-100 text-green-700";
        case "blocked":
            return "bg-red-100 text-red-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

export default function UserTable({ data, onRefresh, isLoading }: props) {
    const { toast } = useToast();
    const [deletingUser, setDeletingUser] = useState<User | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const handleEditClick = (user: User) => {
        setEditingUser(user);
        setEditModalOpen(true);
    };

    const handleDeleteClick = (user: User) => {
        setDeletingUser(user);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!deletingUser) return;

        setIsDeleting(true);
        try {
            const res = await deleteUserById(deletingUser._id);
            if (res?.success) {
                toast({
                    title: "Success",
                    description: "User deleted successfully",
                    className: "bg-green-500 text-white",
                });
                setDeleteDialogOpen(false);
                setDeletingUser(null);
                onRefresh?.();
            } else {
                toast({
                    title: "Error",
                    description: res?.message || "Failed to delete user",
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
            setIsDeleting(false);
        }
    };





    if (data?.length === 0 && !onRefresh) { // Basic check
        return <div className="text-center py-10 text-gray-500">No users found</div>;
    }




    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left">Name</TableHead>
                        <TableHead className="text-left">Email</TableHead>
                        <TableHead className="text-center">Role</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center hidden md:table-cell">Joined At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data?.map((user, idx) => (
                        <TableRow
                            key={user._id}
                            className={clsx(
                                "transition-colors",
                                idx % 2 === 0 ? "bg-gray-50/60" : "bg-white"
                            )}
                        >
                            <TableCell className="text-left font-medium">
                                {user.name}
                            </TableCell>

                            <TableCell className="text-left">
                                {user.email}
                            </TableCell>

                            <TableCell className="text-center">
                                <span className={clsx("px-2 py-1 rounded-full text-xs font-semibold capitalize",
                                    user.role === 'admin' ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700")}>
                                    {user.role}
                                </span>
                            </TableCell>

                            <TableCell className="text-center">
                                <span
                                    className={clsx(
                                        "px-2 py-0.5 rounded-full text-xs font-semibold uppercase",
                                        getStatusColor(user.status)
                                    )}
                                >
                                    {user.status}
                                </span>
                            </TableCell>

                            <TableCell className="text-center hidden md:table-cell">
                                <span>
                                    {user.createdAt
                                        ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })
                                        : "N/A"}
                                </span>
                            </TableCell>

                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                                        <DropdownMenuItem onClick={() => handleEditClick(user)}>
                                            <Pencil className="mr-2 h-4 w-4" /> Edit User
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="text-red-600 focus:text-red-600"
                                            onClick={() => handleDeleteClick(user)}
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}

                    {data?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                                No users found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Edit User Modal */}
            <EditUserModal
                user={editingUser}
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                onSuccess={() => {
                    setEditModalOpen(false);
                    onRefresh?.();
                }}
            />

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the user{" "}
                            <strong>{deletingUser?.name}</strong>. This action cannot
                            be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
