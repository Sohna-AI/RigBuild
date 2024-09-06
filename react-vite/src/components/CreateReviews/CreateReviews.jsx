import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, loadReviewsByProductId } from '../../redux/reviews';
import * as reviewActions from '../../redux/reviews';
import StarRating from '../StarRating/StarRating';
import { useModal } from '../../context/Modal';
import { useTheme } from '../../context/Theme';
import './CreateReviews.css';

const CreateReviews = ({ productId, edit, reviewId }) => {
  const reviews = useSelector(reviewActions.selectReviews);
  const [starRating, setStarRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [reviewText, setReviewText] = useState('');
  const { closeModal } = useModal();
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleStarRatingChange = (rating) => {
    setStarRating(rating);
  };

  const handleSubmit = async (e) => {
    setErrors({});
    e.preventDefault();

    const reviewPayload = {
      review: reviewText,
      rating: starRating,
    };

    if (edit && reviewId) {
      const existing = await dispatch(reviewActions.editReviewById(reviewPayload, reviewId));
      if (existing) return setErrors(existing);
    } else {
      const newReview = await dispatch(createReview(reviewPayload, productId));
      console.log(newReview);
      if (newReview) return setErrors(newReview);
    }
    await dispatch(loadReviewsByProductId(productId));
    closeModal();
  };

  useEffect(() => {
    if (edit && reviewId) {
      const review = reviews[productId]?.reviews[reviewId];
      if (review) {
        setReviewText(review.review);
        setStarRating(review.rating);
      }
    }
  }, [edit, reviewId, productId, reviews]);

  return (
    <>
      {theme === 'light' ? (
        <form onSubmit={handleSubmit}>
          <div className="create-review-container">
            <div className="create-review-page">
              <h1 className="create-review-title">{edit ? 'Edit your review' : 'Rate this product'}</h1>
              <main className="create-review-main-container">
                <div className="create-review-text-error-container">
                  {errors.review && <p className="error">{errors.review}</p>}
                  <textarea
                    value={reviewText}
                    onChange={handleReviewChange}
                    rows={10}
                    cols={60}
                    className="create-review-form-style"
                    placeholder="Leave your review here..."
                  ></textarea>
                </div>
                <div className="create-review-rating-error-container">
                  {errors.rating && <p className="error">{errors.rating}</p>}
                  <StarRating value={starRating} onChange={handleStarRatingChange} />
                </div>
              </main>
              <div className="create-review-update-cancel-button-container">
                <div className="create-review-button-container">
                  <button className="create-review-button" onClick={handleSubmit}>
                    {edit ? 'Update your review' : 'Submit your review'}
                  </button>
                </div>
                <div className="create-review-cancel-button-container">
                  <button className="create-review-cancel-button" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="create-review-container-dark">
            <div className="create-review-page">
              <h1 className="create-review-title">{edit ? 'Edit your review' : 'Rate this product'}</h1>
              <main className="create-review-main-container">
                <div className="create-review-text-error-container">
                  {errors.review && <p className="error">{errors.review}</p>}
                  <textarea
                    value={reviewText}
                    onChange={handleReviewChange}
                    rows={10}
                    cols={60}
                    aria-rowcount={13}
                    className="create-review-form-style-dark"
                    placeholder="Leave your review here..."
                  ></textarea>
                </div>
                <div className="create-review-rating-error-container-dark">
                  {errors.rating && <p className="error">{errors.rating}</p>}
                  <StarRating value={starRating} onChange={handleStarRatingChange} />
                </div>
              </main>
              <div className="create-review-update-cancel-button-container">
                <div className="create-review-button-container">
                  <button className="create-review-button" onClick={handleSubmit}>
                    {edit ? 'Update your review' : 'Submit your review'}
                  </button>
                </div>
                <div className="create-review-cancel-button-container">
                  <button className="create-review-cancel-button" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default CreateReviews;
