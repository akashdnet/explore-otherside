import { FaCalendarAlt } from "react-icons/fa";
import { UserProfile } from './types';

interface AvailabilityProps {
  availability: UserProfile['availability'];
}

const Availability = ({ availability }: AvailabilityProps) => {
  return (
    <div className="rounded-xl bg-card dark:bg-card-dark p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Availability</h2>
      <div className="flex items-center gap-4 p-3 rounded-lg bg-background-light dark:bg-background-dark">
        <span className="material-symbols-outlined text-text-secondary dark:text-text-secondary-dark text-2xl">
          <FaCalendarAlt />
        </span>
        <div>
          <p className="font-bold">Next Available</p>
          <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
            {availability.start} - {availability.end}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Availability;