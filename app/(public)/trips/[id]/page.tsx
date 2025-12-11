import { getTripById } from "@/actions/trip";
import { Calendar, CreditCard, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function TripDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const { data: trip } = await getTripById(id);

    if (!trip) {
        return notFound();
    }

    const startDate = new Date(trip.startDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const endDate = new Date(trip.endDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link
                href="/trips"
                className="text-primary hover:underline mb-4 inline-block"
            >
                &larr; Back to Trips
            </Link>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="p-1">
                    {/* Image Grid - No Layout for images as requested */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {trip.photos && trip.photos.length > 0 ? (
                            trip.photos.map((photo: string, index: number) => (
                                <div key={index} className="relative aspect-video w-full rounded-md overflow-hidden">
                                    <Image
                                        src={photo}
                                        alt={`${trip.destination} - Photo ${index + 1}`}
                                        height={400}
                                        width={600}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="relative aspect-video w-full rounded-md overflow-hidden bg-gray-100 flex items-center justify-center text-gray-400">
                                <span>No photos available</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {trip.destination}
                            </h1>
                            <div className="flex items-center text-gray-500 text-sm">
                                <MapPin className="h-4 w-4 mr-1" />
                                {trip.destination}
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-2xl font-bold text-primary">
                                ${trip.budget?.toLocaleString()}
                            </span>
                            <span className="text-gray-500 text-sm">per person</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <Calendar className="h-6 w-6 text-primary mr-3" />
                            <div>
                                <p className="text-sm text-gray-500">Dates</p>
                                <p className="font-semibold">
                                    {startDate} - {endDate}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <Users className="h-6 w-6 text-primary mr-3" />
                            <div>
                                <p className="text-sm text-gray-500">Travel Type</p>
                                <p className="font-semibold capitalize">{trip.travelType}</p>
                            </div>
                        </div>
                        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                            {/* Placeholder for Activities or another metric */}
                            <CreditCard className="h-6 w-6 text-primary mr-3" />
                            <div>
                                <p className="text-sm text-gray-500">Budget</p>
                                <p className="font-semibold">${trip.budget}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">About this Trip</h2>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {trip.description}
                        </p>
                    </div>

                    {/* Action Area - Could integrate Request logic here, but avoiding complex duplicates of TripCard for now.
              Ideally, we reuse a 'JoinButton' component. For now, we can link or just show status. */}


                </div>
            </div>
        </div>
    );
}
