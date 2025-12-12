import { TravelInterest } from './types';

interface TravelInterestsProps {
  interests: TravelInterest[];
}

const TravelInterests = ({ interests }: TravelInterestsProps) => {
  return (
    <div className="rounded-xl bg-card dark:bg-card-dark p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Travel Interests</h2>
      <div className="flex gap-2 flex-wrap">
        {interests.map((interest) => (
          <div
            key={interest.id}
            className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-background-light dark:bg-background-dark px-4"
          >
            <p className="text-sm font-medium">{interest.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelInterests;