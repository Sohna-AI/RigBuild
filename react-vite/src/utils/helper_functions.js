import { IoStar } from 'react-icons/io5';
export const StarRating = ({ rating }) => {
  const filledStars = [];
  for (let i = 0; i < 5; i++) {
    filledStars.push(<IoStar key={i} color={i < rating ? '#e99f4c' : 'gray'} size={20} />);
  }
  return <div className="rating-stars">{filledStars}</div>;
};

export const avgRating = (reviews) => {
  let ratings = 0;
  reviews.map((review) => {
    ratings += review.rating;
  });
  return (ratings / reviews.length).toFixed(2);
};
