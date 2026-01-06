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
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
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
                            <div className="font-medium">{g.name}</div>
                            <div className="text-sm text-muted-foreground">{g.email}</div>
                        </TableCell>
                        <TableCell>
                            <Badge
                                className={`py-1 px-2 text-white ${g.status === "active" ? "bg-green-500" : "bg-red-500"}`}

                            >
                                {g.status}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <Button variant="link" size="sm">
                                View
                            </Button>
                        </TableCell>
                        <TableCell className="space-x-2">
                            {g.status === "active" ? (
                                <Button variant="destructive" size="sm" >
                                    Make Block
                                </Button>
                            ) : <Button variant="secondary" size="sm" >
                                Make Unblock
                            </Button>}

                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
