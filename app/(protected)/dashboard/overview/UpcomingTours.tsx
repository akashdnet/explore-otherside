import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarDays, MapPin } from "lucide-react";

const upcomingTours = [
    { id: 1, title: "Sundarbans Adventure", date: "2026-01-15", status: "upcoming", location: "Khulna" },
    { id: 2, title: "Cox's Bazar Beach Trip", date: "2026-02-02", status: "upcoming", location: "Chittagong" },
    { id: 3, title: "St. Martin's Island", date: "2026-02-20", status: "pending", location: "Cox's Bazar" },
];

export default function UpcomingToursTable() {
    return (
        <Card className="shadow-md border-none h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100">Upcoming Adventures</CardTitle>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">View All</Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {upcomingTours.map((tour) => (
                        <div key={tour.id} className="flex items-center justify-between p-3 bg-muted/40 rounded-xl hover:bg-muted/60 transition-colors group">
                            <div className="flex flex-col gap-1">
                                <div className="font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                    {tour.title}
                                </div>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <CalendarDays className="w-3 h-3" />
                                        {new Date(tour.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {tour.location}
                                    </span>
                                </div>
                            </div>
                            <Badge variant={tour.status === "upcoming" ? "default" : "secondary"} className="capitalize shadow-none">
                                {tour.status}
                            </Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

// Alternative Table View if preferred
export function UpcomingToursTableClassic() {
    return (
        <Card className="shadow-md border-none">
            <CardHeader>
                <CardTitle>Upcoming Tours</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {upcomingTours.map((tour) => (
                            <TableRow key={tour.id}>
                                <TableCell className="font-medium">{tour.title}</TableCell>
                                <TableCell>{tour.date}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{tour.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">View</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
