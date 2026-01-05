import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Plane, Shield, Wallet } from "lucide-react";

const travelTips = [
  {
    id: 1,
    Icon: Lightbulb,
    title: "Pack Smart",
    description: "Roll your clothes instead of folding to save space and reduce wrinkles in your luggage."
  },
  {
    id: 2,
    Icon: Plane,
    title: "Book in Advance",
    description: "Secure the best deals by booking flights and accommodations 2-3 months ahead."
  },
  {
    id: 3,
    Icon: Shield,
    title: "Travel Insurance",
    description: "Always purchase travel insurance to protect against unexpected cancellations."
  },
  {
    id: 4,
    Icon: Wallet,
    title: "Budget Wisely",
    description: "Set a daily spending limit and track expenses to avoid overspending."
  }
];

export default function TravelTips() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Expert <span className="text-amber-500">Travel Tips</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Essential advice to make your journey smooth and memorable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {travelTips.map((tip) => {
            const IconComponent = tip.Icon;
            return (
              <Card key={tip.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{tip.title}</h3>
                  <p className="text-slate-600">{tip.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready for Your Next Adventure?</h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Join thousands of travelers who have found their perfect travel companions with Explore Otherside
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-amber-600 hover:bg-slate-100 font-bold py-3 px-8 rounded-full text-lg transition-colors">
              Start Planning
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white/10 font-bold py-3 px-8 rounded-full text-lg transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}