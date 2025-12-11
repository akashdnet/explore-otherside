import { FaStar, FaStarHalfStroke } from 'react-icons/fa6';
import ReviewItem from './ReviewItem';
import { Review } from './types';

interface ReviewsSectionProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

const ReviewsSection = ({ reviews, rating, reviewCount }: ReviewsSectionProps) => {
  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(
          <span key={i} className="material-symbols-outlined text-lg text-primary"><FaStar color='#0DF2F2' /></span>
        );
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(
          <span key={i} className="material-symbols-outlined text-lg text-primary"><FaStarHalfStroke color='#0DF2F2' /> </span>
        );
      } else {
        stars.push(
          <span key={i} className="material-symbols-outlined text-lg text-border-light dark:text-border-dark"><FaStar color='#0DF2F2' /></span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="rounded-xl bg-card dark:bg-card-dark p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold tracking-tight">What Other Travelers Say</h2>
        <div className="flex items-center gap-2">
          <div className="flex text-primary">
            {renderRatingStars(rating)}
          </div>
          <span className="font-bold text-sm">{rating.toFixed(1)}</span>
          <span className="text-sm text-text-secondary dark:text-text-secondary-dark">({reviewCount} reviews)</span>
        </div>
      </div>
      <div className="space-y-6">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;