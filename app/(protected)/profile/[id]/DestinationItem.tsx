import { Destination } from './types';

interface DestinationItemProps {
  destination: Destination;
}

const DestinationItem = ({ destination }: DestinationItemProps) => {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-background-light dark:bg-background-dark">
      <span className="material-symbols-outlined text-text-secondary dark:text-text-secondary-dark text-2xl">
        {destination.icon}
      </span>
      <div>
        <p className="font-bold">{destination.name}</p>
        <p className="text-sm text-text-secondary dark:text-text-secondary-dark">{destination.description}</p>
      </div>
    </div>
  );
};

export default DestinationItem;