"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TripTableProps {
    guides: any[];
}

export default function TripTable({ guides }: TripTableProps) {
    if (guides.length === 0) {
        return <div className="text-center py-10">No trips found.</div>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Photo</TableHead>
                    <TableHead>Title by Guide</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {guides.map((g) => (
                    <TableRow key={g.id}>
                        <TableCell>
                            <img src={g.photo} alt="Guide" className="w-10 h-10 rounded" />
                        </TableCell>
                        <TableCell>
                            <div className="font-medium">{g.title}</div>
                            <div className="text-sm text-muted-foreground">by {g.guideName}</div>
                        </TableCell>
                        <TableCell>
                            <Badge
                                className={`py-1 px-2 text-white ${g.status === "completed" ? "bg-gray-500" : g.status === "pending" ? "bg-yellow-500" : "bg-green-500"}`}
                                variant={
                                    g.status === "completed"
                                        ? "secondary"
                                        : g.status === "pending"
                                            ? "destructive"
                                            : "default"
                                }
                            >
                                {g.status == "accepted" ? "Upcomming" : g.status}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <Button variant="link" size="sm">
                                View
                            </Button>
                        </TableCell>
                        <TableCell className="space-x-2">
                            {g.status === "pending" ? (
                                <Button variant="destructive" size="sm" onClick={() => alert("Cancel logic here")}>
                                    Cancel
                                </Button>
                            ) : g.status == "accepted" ? "Upcomming" : <h1>Completed</h1>}

                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
