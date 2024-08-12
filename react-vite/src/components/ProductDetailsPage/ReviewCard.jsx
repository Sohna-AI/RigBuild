import { IoStar } from 'react-icons/io5';
import { formatDistanceToNow } from 'date-fns';
import './ReviewCard.css';
import { useSelector } from 'react-redux';
import DeleteReview from '../DeleteReview/DeleteReview';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import CreateReviews from '../CreateReviews/CreateReviews';

export default function ReviewCard({ id, rating, review, created_at, user, author, product_id }) {
  const sessionUser = useSelector((state) => state.session.user);
  const formattedDate = formatDistanceToNow(new Date(created_at), { addSuffix: true });
  const owner = sessionUser?.id === author;

  const StarRating = ({ rating }) => {
    const filledStars = [];
    for (let i = 0; i < 5; i++) {
      filledStars.push(<IoStar key={i} color={i < rating ? '#e99f4c' : 'gray'} size={20} />);
    }
    return <div className="rating-stars">{filledStars}</div>;
  };

  return (
    <>
      <div className="review-card" key={id}>
        <div className="review-card-stars">
          <StarRating rating={rating} />
          <div>
            {owner && (
              <>
                <div className="review-card-edit-delete-container">
                  <OpenModalButton
                    buttonText={
                      <svg
                        className="review-card-edit-icon"
                        fill="none"
                        height="22.5"
                        viewBox="0 0 18 20.5"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g stroke="blue" strokeLinecap="round" strokeWidth="2">
                          <path d="m20 20h-16"></path>
                          <path
                            clipRule="evenodd"
                            d="m14.5858 4.41422c.781-.78105 2.0474-.78105 2.8284 0 .7811.78105.7811 2.04738 0 2.82843l-8.28322 8.28325-3.03046.202.20203-3.0304z"
                            fillRule="evenodd"
                          ></path>
                        </g>
                      </svg>
                    }
                    modalComponent={<CreateReviews edit={true} reviewId={id} productId={product_id} />}
                    reviewEdit={true}
                  />
                  <OpenModalButton
                    buttonText={
                      <svg
                        viewBox="0 0 15 17.5"
                        height="17.5"
                        width="15"
                        xmlns="http://www.w3.org/2000/svg"
                        className="review-card-delete-icon"
                      >
                        <path
                          transform="translate(-2.5 -1.25)"
                          d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
                          id="Fill"
                        ></path>
                      </svg>
                    }
                    modalComponent={<DeleteReview reviewId={id} productId={product_id} />}
                    reviewDelete={true}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="review-card-date">{formattedDate}</div>
        <div className="review-card-review">{review}</div>
        <div className="review-card-user">- {user}</div>
      </div>
    </>
  );
}
