import DestinationItem from './DestinationItem';
import { Destination } from './types';

interface PreferredDestinationsProps {
  destinations: Destination[];
}

const PreferredDestinations = ({ destinations }: PreferredDestinationsProps) => {
  return (
    <div className="rounded-xl bg-card dark:bg-card-dark p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Preferred Destinations</h2>
      <div className="space-y-3">
        {destinations.map((destination) => (
          <DestinationItem key={destination.id} destination={destination} />
        ))}
      </div>
    </div>
  );
};

export default PreferredDestinations;