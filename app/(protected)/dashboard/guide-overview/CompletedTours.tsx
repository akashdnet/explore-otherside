import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const completedTours = [
    { id: 1, title: "Bandarban Trek", date: "2025-12-20", status: "completed", rating: 5 },
    { id: 2, title: "Sylhet Tea Garden", date: "2025-11-10", status: "completed", rating: 4 },
    { id: 3, title: "Jaflong Tour", date: "2025-10-05", status: "completed", rating: 5 },
];

export default function CompletedToursTable() {
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
                        {completedTours.map((tour) => (
                            <TableRow key={tour.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                                <TableCell className="font-medium">{tour.title}</TableCell>
                                <TableCell className="text-muted-foreground">{new Date(tour.date).toLocaleDateString()}</TableCell>
                                {/* <TableCell>
                                    <div className="flex text-yellow-500">
                                        {"★".repeat(tour.rating)}
                                        <span className="text-slate-200 dark:text-slate-700">
                                            {"★".repeat(5 - tour.rating)}
                                        </span>
                                    </div>
                                </TableCell> */}
                                <TableCell className="text-right">
                                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
                                        {tour.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
