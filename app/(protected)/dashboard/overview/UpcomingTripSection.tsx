

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Event {
    id: string;
    title: string;
    location: string;
    date: string;
}

interface Props {
    events: Event[];
}

export default function UpcomingTripSection({ events }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Upcoming Trips</CardTitle>
            </CardHeader>
            <CardContent>
                {events?.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No upcoming trips</p>
                ) : (
                    <ul className="space-y-4">
                        {events?.map((event) => (
                            <li
                                key={event.id}
                                className="flex items-center justify-between border-b pb-2 last:border-none"
                            >
                                <div>
                                    <p className="font-semibold">{event.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {event.location} — {event.date}
                                    </p>
                                </div>

                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
}
