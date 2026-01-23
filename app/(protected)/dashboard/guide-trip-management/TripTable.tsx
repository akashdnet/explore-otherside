"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

interface TripTableProps {
    trips: any[];
    onEdit: (trip: any) => void;
    onDelete: (id: string) => void;
}

export default function TripTable({ trips, onEdit, onDelete }: TripTableProps) {
    if (!trips || trips.length === 0) {
        return <div className="text-center py-10">No trips found.</div>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Photo</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {trips.map((trip) => (
                    <TableRow key={trip.id || trip._id}>
                        <TableCell>
                            <img
                                src={trip.photos?.[0] || trip.image || "/placeholder.jpg"}
                                alt="Trip"
                                className="w-10 h-10 rounded object-cover"
                            />
                        </TableCell>
                        <TableCell>
                            <div className="font-medium">{trip.name || trip.title}</div>
                            <div className="text-sm text-muted-foreground">{trip.location}</div>
                        </TableCell>
                        <TableCell>
                            <div className="text-sm">
                                {trip.startDate ? new Date(trip.startDate).toLocaleDateString() : "TBD"}
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge
                                className={`py-1 px-2 text-white bg-linear-to-r ${trip.status === "Open" ? "from-green-600 to-green-400" :
                                        trip.status === "Full" ? "from-yellow-600 to-yellow-400" :
                                            "from-slate-600 to-slate-400"
                                    }`}
                            >
                                {trip.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="space-x-2">
                            <Button variant="default" asChild size="sm">
                                <Link href={`/explore/${trip.id || trip._id}`}>View</Link>
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => onEdit(trip)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => onDelete(trip.id || trip._id)}
                            >
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
