
"use client";

import { deleteTripAdmin } from "@/actions/trip";
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
import { TripStatus } from "../my-trip-management/TripTable";
import AdminEditTripModal from "./AdminEditTripModal";

// Define Trip interface including User info if available for admins
export interface AdminTrip {
    _id: string;
    destination: string;
    description: string;
    startDate: Date;
    endDate: Date;
    budget: number;
    status: TripStatus;
    travelType: string;
    createdAt: Date;
    userId?: { // Assuming populated user
        _id: string;
        name: string;
        email: string;
    };
    photos?: string[];
    maxGroupSize?: number;
    activities?: string[];
}

interface props {
    data: AdminTrip[];
    isLoading?: boolean;
    onRefresh?: () => void;
}

const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
        case "open":
            return "bg-blue-100 text-blue-700";
        case "full":
            return "bg-purple-100 text-purple-700";
        case "completed":
            return "bg-green-100 text-green-700";
        case "cancelled":
            return "bg-red-100 text-red-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

export default function AdminTripTable({ data, onRefresh, isLoading }: props) {
    const { toast } = useToast();
    const [deletingTrip, setDeletingTrip] = useState<AdminTrip | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Edit state
    const [editingTrip, setEditingTrip] = useState<AdminTrip | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const handleEditClick = (trip: AdminTrip) => {
        setEditingTrip(trip);
        setEditModalOpen(true);
    };

    const handleDeleteClick = (trip: AdminTrip) => {
        setDeletingTrip(trip);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!deletingTrip) return;

        setIsDeleting(true);
        try {
            const res = await deleteTripAdmin(deletingTrip._id);
            if (res?.success) {
                toast({
                    title: "Success",
                    description: "Trip deleted successfully (Admin)",
                    className: "bg-green-500 text-white",
                });
                setDeleteDialogOpen(false);
                setDeletingTrip(null);
                onRefresh?.();
            } else {
                toast({
                    title: "Error",
                    description: res?.message || "Failed to delete trip",
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

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left">Destination</TableHead>
                        {/* <TableHead className="text-left">Created By</TableHead> */}
                        <TableHead className="text-center">Travel Type</TableHead>
                        <TableHead className="text-center hidden md:table-cell">Start Date</TableHead>
                        <TableHead className="text-center hidden md:table-cell">End Date</TableHead>
                        <TableHead className="text-right">Budget & Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data?.map((trip, idx) => (
                        <TableRow
                            key={trip._id}
                            className={clsx(
                                "transition-colors",
                                idx % 2 === 0 ? "bg-gray-50/60" : "bg-white"
                            )}
                        >
                            <TableCell className="text-left">
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-gray-800">
                                        {trip.destination}
                                    </span>
                                    {/* <span className="text-xs text-gray-500">
                                        by {trip.userId?.name || "Unknown"}
                                    </span> */}
                                </div>
                            </TableCell>

                            {/* <TableCell className="text-left">
                                <span className="text-sm font-medium">{trip.userId?.name || "N/A"}</span>
                            </TableCell> */}

                            <TableCell className="font-medium text-center">
                                <span className="capitalize">{trip.travelType}</span>
                            </TableCell>

                            <TableCell className="text-center hidden md:table-cell">
                                <span>
                                    {trip?.startDate
                                        ? new Date(trip.startDate).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })
                                        : ""}
                                </span>
                            </TableCell>

                            <TableCell className="text-center hidden md:table-cell">
                                <span>
                                    {trip?.endDate
                                        ? new Date(trip.endDate).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })
                                        : ""}
                                </span>
                            </TableCell>

                            <TableCell className="text-right">
                                <div className="flex flex-col gap-1 items-end">
                                    <span className="flex items-center font-semibold text-gray-800">
                                        ${trip.budget?.toLocaleString()}
                                    </span>
                                    <span
                                        className={clsx(
                                            "px-2 py-0.5 rounded-full text-xs font-semibold uppercase",
                                            getStatusColor(trip.status)
                                        )}
                                    >
                                        {trip.status}
                                    </span>
                                </div>
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

                                        <DropdownMenuItem onClick={() => handleEditClick(trip)}>
                                            <Pencil className="mr-2 h-4 w-4" /> Edit Trip
                                        </DropdownMenuItem>

                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="text-red-600 focus:text-red-600"
                                            onClick={() => handleDeleteClick(trip)}
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
                            <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                                No trips found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Admin Edit Modal */}
            {editingTrip && (
                <AdminEditTripModal
                    trip={editingTrip}
                    open={editModalOpen}
                    onOpenChange={setEditModalOpen}
                    onSuccess={() => {
                        setEditModalOpen(false);
                        setEditingTrip(null);
                        onRefresh?.();
                    }}
                />
            )}

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the trip to{" "}
                            <strong>{deletingTrip?.destination}</strong>. This action cannot
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
