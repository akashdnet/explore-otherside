
import { Trip } from '@/lib/types';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';



// const guide = {
//   name: 'Alex Müller',
//   image: GuideImage,
//   rating: 4.8,
//   reviews: 124,
// };

export default function TourCard({ tour }: { tour: Trip }) {
  const formattedStartDate = tour?.startDate ? format(new Date(tour.startDate), 'MMM dd, yyyy') : 'TBA';

  return (
    <div className="max-w-sm w-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Tour Image */}
      <div className="relative h-48 w-full">
        <Image
          src={tour.image}
          alt={tour.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col gap-3">
        {/* Location & Duration */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {tour.location}
          </span>
          <span>{tour.days} days</span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-800 line-clamp-1">{tour.name}</h2>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2">{tour.description}</p>

        {/* Itinerary Preview */}
        <ul className="text-xs text-gray-500 list-disc list-inside mt-1 space-y-0.5">
          {tour.itinerary.slice(0, 2).map((item: any, idx: number) => (
            <li key={idx} className="truncate">
              {item}
            </li>
          ))}
          {tour.itinerary.length > 2 && (
            <li className="text-blue-600 font-medium">
              +{tour.itinerary.length - 2} more days
            </li>
          )}
        </ul>

        {/* Tour Guide Info */}
        <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={tour?.guide?.photo || ""}
              alt={"image"}
              width={100}
              height={100}
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">{tour?.guide?.name}</p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3.5 h-3.5 ${i < Math.floor(tour?.guide?.reviews?.length)
                    ? 'text-yellow-400'
                    : i < tour.guide?.reviews?.length
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                    }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-600 ml-1">
                {tour?.guide?.reviews?.length} ({tour?.guide?.reviews?.length})
              </span>
            </div>
          </div>
        </div>

        {/* Price & Date */}
        <div className="flex justify-between items-center text-sm text-gray-700">
          <span className="font-bold text-green-600">
            ${tour?.price}
            <span className="font-normal text-gray-500"> / person</span>
          </span>
          <span className="text-gray-500">{formattedStartDate}</span>
        </div>

        {/* Dual CTA Buttons */}
        <div className="flex gap-2 pt-1">
          <Button asChild className="flex-1 bg-white border border-[#FE9A00] text-[#FE9A00] hover:bg-[#eee3d2] hover:text-black text-sm px-3 py-2 rounded-lg transition-colors">
            <Link href={`/explore/${tour.id}`}>
              Learn More
            </Link>
          </Button>
          <Button className="flex-1 bg-[#FE9A00] hover:bg-[#FE9A00] text-white text-sm px-3 py-2 rounded-lg transition-colors">
            Send Request
          </Button>
        </div>
      </div>
    </div>
  );
}