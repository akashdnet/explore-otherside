import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";

const featuredDestinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    description: "Experience the tropical paradise with beautiful beaches and rich culture",
    image: "https://images.unsplash.com/photo-1537214729498-8d5b1ca79b5e?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    price: "$899",
    duration: "7 days"
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    description: "Discover the perfect blend of traditional culture and modern technology",
    image: "https://images.unsplash.com/photo-1544025162-9c3d3b7d6e0c?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
    price: "$1299",
    duration: "10 days"
  },
  {
    id: 3,
    name: "Santorini, Greece",
    description: "Breathtaking views and romantic sunsets in this Mediterranean gem",
    image: "https://images.unsplash.com/photo-1526342191185-bc03a3e506c7?q=80&w=2070&auto=format&fit=crop",
    rating: 4.7,
    price: "$1499",
    duration: "8 days"
  }
];

export default function FeaturedDestinations() {
  return (
    <section className="py-20 bg-linear-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Featured <span className="text-amber-500">Destinations</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover our most popular travel destinations curated just for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden rounded-2xl border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="relative h-60 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="text-amber-500 font-bold">★</span>
                  <span className="font-semibold">{destination.rating}</span>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-slate-900">{destination.name}</h3>
                  <span className="text-2xl font-bold text-amber-500">{destination.price}</span>
                </div>

                <p className="text-slate-600 mb-4">{destination.description}</p>

                <div className="flex items-center gap-4 mb-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>Beach</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>Groups</span>
                  </div>
                </div>

                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-6 text-lg font-semibold">
                  Explore Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
