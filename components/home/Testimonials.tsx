import { Review } from "@/lib/types";
import { Quote, Star } from "lucide-react";

// const testimonials = [
//   {
//     quote: '"I was hesitant about solo travel, but Explore Otherside helped me find an amazing friend to explore Italy with. It was the trip of a lifetime!"',
//     name: 'Sarah K.',
//     location: 'Italy Trip',
//     rating: 5,
//     image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop',
//   },
//   {
//     quote: '"Finding someone with the same passion for hiking in Peru was incredible. The matching system is fantastic. Highly recommend."',
//     name: 'Mark T.',
//     location: 'Peru Trip',
//     rating: 5,
//     image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop',
//   },
//   {
//     quote: '"As a digital nomad, this platform is a game-changer. I\'ve met so many cool people to co-work and explore with. Best community ever!"',
//     name: 'Emily C.',
//     location: 'Thailand Trip',
//     rating: 5,
//     image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop',
//   },
// ]

export default function Testimonials({ reviews }: { reviews: Review[] }) {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-[#FE9A00] dark:text-white tracking-tight mb-4">
          What Our Travelers Say
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Join thousands of happy travelers who found their perfect travel buddies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews?.map((review, _) => (
          <div key={_} className="relative p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <Quote className="absolute top-8 right-8 text-slate-100 dark:text-slate-800 size-12 z-0 rotate-180" />

            <div className="flex gap-1 mb-6 text-yellow-400">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="size-4 fill-yellow-400" />
              ))}
            </div>

            <p className="text-slate-600 dark:text-slate-300 mb-8 relative z-10 text-lg leading-relaxed">
              {review.comment}
            </p>

            <div className="flex items-center gap-4">
              <img
                className="size-12 rounded-full object-cover ring-2 ring-white dark:ring-slate-800 shadow-md"
                src={review.userId.photo}
                alt={review.userId.name}
              />
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{review.userId.name}</p>
                {/* <p className="text-sm text-slate-500">{review.userId.location}</p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}