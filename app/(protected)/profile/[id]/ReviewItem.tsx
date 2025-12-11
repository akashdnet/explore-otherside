import { FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { Review } from './types';

interface ReviewItemProps {
  review: Review;
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <span key={i} className="material-symbols-outlined text-base text-primary text-[#0DF2F2]"><FaStar color="#0DF2F2" /></span>
        );
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(
          <span key={i} className="material-symbols-outlined text-base text-primary "> <FaStarHalfStroke color="#0DF2F2" />  </span>
        );
      } else {
        stars.push(
          <span key={i} className="material-symbols-outlined text-base text-border-light dark:text-border-dark "> <FaStarHalfStroke color="#0DF2F2" />  </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="flex gap-4">
      <div 
        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
        data-alt={`Profile picture of ${review.author}`}
        style={{ backgroundImage: `url("${review.authorImage}")` }}
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold">{review.author}</p>
            <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
              Traveled to {review.location}, {review.date}
            </p>
          </div>
          <div className="flex">
            {renderStars(review.rating)}
          </div>
        </div>
        <p className="mt-2 text-sm">"{review.content}"</p>
      </div>
    </div>
  );
};

export default ReviewItem;