import { IoStar } from 'react-icons/io5';

export default function ReviewCard({ id, rating, review, created_at, user }) {
  const StarRating = ({ rating }) => {
    const filledStars = [];
    for (let i = 0; i < 5; i++) {
      filledStars.push(<IoStar key={i} color={i < rating ? '#e99f4c' : 'gray'} size={20} />);
    }
    return <div className="rating-stars">{filledStars}</div>;
  };
  return (
    <>
      <div className="review-card">
        <div>{review}</div>
        <div>{created_at}</div>
        <div>{user}</div>
        <div>
          <StarRating rating={rating} />
        </div>
      </div>
    </>
  );
}
