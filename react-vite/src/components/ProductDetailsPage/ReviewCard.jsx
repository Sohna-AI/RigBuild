import { IoStar } from 'react-icons/io5';
import { formatDistanceToNow } from 'date-fns';
import './ReviewCard.css'

export default function ReviewCard({ id, rating, review, created_at, user }) {
  const StarRating = ({ rating }) => {
    const filledStars = [];
    for (let i = 0; i < 5; i++) {
      filledStars.push(<IoStar key={i} color={i < rating ? '#e99f4c' : 'gray'} size={20} />);
    }
    return <div className="rating-stars">{filledStars}</div>;
  };

  let formattedDate = formatDistanceToNow(new Date(created_at), { addSuffix: true });

  return (
    <>
      <div className="review-card">
        <div className='review-card-stars'>
          <StarRating rating={rating} />
        </div>
        <div className='review-card-date'>{formattedDate}</div>
        <div className='review-card-review'>{review}</div>
        <div className='review-card-user'>- {user}</div>
      </div>
    </>
  );
}
