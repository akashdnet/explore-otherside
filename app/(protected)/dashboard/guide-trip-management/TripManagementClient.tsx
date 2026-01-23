"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { deleteMyTrip } from "@/actions/trip";
import { toast } from "sonner";
import TripForm from "./_form/Form"; // Assuming we renamed it or using existing path
import Pagination from "./Pagination";
import TripFilters from "./TripFilters";
import TripTable from "./TripTable";

interface TripManagementClientProps {
    data: any; // The whole response from getMyTrips
    searchParams: any; // For passing to Pagination
}

export default function TripManagementClient({ data, searchParams }: TripManagementClientProps) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTrip, setEditingTrip] = useState<any>(null);

    // Provide a way to refresh server data efficiently or strict reload
    const handleSuccess = () => {
        setIsModalOpen(false);
        setEditingTrip(null);
        router.refresh();
    };

    const handleCreate = () => {
        setEditingTrip(null);
        setIsModalOpen(true);
    };

    const handleEdit = (trip: any) => {
        setEditingTrip(trip);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this trip?")) {
            try {
                const res = await deleteMyTrip(id);
                if (res?.success) {
                    toast.success("Trip deleted successfully");
                    router.refresh();
                } else {
                    toast.error(res?.error || "Failed to delete trip");
                }
            } catch (error) {
                console.error(error);
                toast.error("An error occurred");
            }
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-4xl font-bold">Trips Management</h2>
                <Button onClick={handleCreate} className="gap-2">
                    <Plus className="h-4 w-4" /> Create Trip
                </Button>
            </div>

            {/* Search + Sort Filters */}
            <TripFilters />

            {/* Table */}
            <TripTable
                trips={data?.data?.items || []} // mapping API response structure
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Pagination */}
            <Pagination
                totalItems={data?.data?.pagination?.total || 0}
                itemsPerPage={data?.data?.pagination?.limit || 10}
                currentPage={data?.data?.pagination?.page || 1}
            />

            {/* Edit/Create Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingTrip ? "Edit Trip" : "Create New Trip"}</DialogTitle>
                        <DialogDescription>
                            {editingTrip ? "Update the details of your trip." : "Fill in the form to publish a new trip."}
                        </DialogDescription>
                    </DialogHeader>

                    <TripForm
                        initialData={editingTrip}
                        onSuccess={handleSuccess}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
