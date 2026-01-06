"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

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
                                className={`py-1 px-2 text-white bg-linear-to-r ${g.status === "upcomming" ? "from-[#fcff9e] to-[#c67700]" : "from-[#1f4037] to-[#99f2c8]"}`}

                            >
                                {g.status == "upcomming" ? "Upcomming" : "Completed"}
                            </Badge>
                        </TableCell>

                        <TableCell className="space-x-2">
                            <Button variant="default" asChild>
                                <Link href={`/explore/${g.id}`}>View</Link>
                            </Button>
                            <Button variant="secondary">Edit</Button>
                            <Button variant="destructive">Delete</Button>

                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
