import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, loadReviewsByProductId } from '../../redux/reviews';
import * as reviewActions from '../../redux/reviews';
import StarRating from '../StarRating/StarRating';
import { useModal } from '../../context/Modal';
import './CreateReviews.css';

const CreateReviews = ({ productId, edit, reviewId }) => {
  const reviews = useSelector(reviewActions.selectReviews);
  const [starRating, setStarRating] = useState(0);
  const [review, setReview] = useState('');
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleStarRatingChange = (rating) => {
    setStarRating(rating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewPayload = {
      review: review,
      rating: starRating,
    };

    if (reviewPayload) {
      try {
        if (edit && reviewId) {
          await dispatch(reviewActions.editReviewById(reviewPayload, reviewId));
        } else {
          await dispatch(createReview(reviewPayload, productId));
        }
        await dispatch(loadReviewsByProductId(productId));
        closeModal();
      } catch (error) {
        console.error('failed to create review', error);
      }
    }
  };

  useEffect(() => {
    if (edit && reviewId) {
      const review = reviews[productId]?.reviews[reviewId];
      if (review) {
        setReview(review.review);
        setStarRating(review.rating);
      }
    }
  }, [edit, reviewId, productId, reviews]);

  const reviewLength = review.length < 10;
  const rating = starRating === 0;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="create-review-container">
          <div className="create-review-page">
            <h1 className="create-review-title">{edit ? 'Edit your review' : 'Rate this product'}</h1>
            <main className="create-review-main-container">
              <textarea
                name="review"
                value={review}
                onChange={handleReviewChange}
                rows={5}
                cols={30}
                className="create-review-form-style"
                placeholder="Leave your review here..."
                required
              ></textarea>
              <div>
                <StarRating value={starRating} onChange={handleStarRatingChange} />
              </div>
            </main>
            <footer>
              <div className="create-review-button-container">
                <button className="create-review-button" type="submit" disabled={reviewLength || rating}>
                  {edit ? 'Update your review' : 'Submit your review'}
                </button>
              </div>
              <div className="create-review-cancel-button-container">
                <button className="create-review-cancel-button" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </footer>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateReviews;
