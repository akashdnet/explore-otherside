import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Tour {
    id: string | number;
    title: string;
    date: string;
    status: string;
    rating?: number;
}

interface CompletedToursTableProps {
    tours: Tour[];
}

export default function CompletedToursTable({ tours }: CompletedToursTableProps) {
    return (
        <Card className="shadow-md border-none">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100">Recent History</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tours.length > 0 ? (
                            tours.map((tour) => (
                                <TableRow key={tour.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                                    <TableCell className="font-medium">{tour.title}</TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {new Date(tour.date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
                                            {tour.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center text-muted-foreground">
                                    No recent history found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
