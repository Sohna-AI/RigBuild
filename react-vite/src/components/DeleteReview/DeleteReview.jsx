import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteReviewById } from '../../redux/reviews';
import './DeleteReview.css';

const DeleteReview = ({ reviewId, productId }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const confirmDelete = () => {
    dispatch(deleteReviewById(reviewId, productId));
    closeModal();
  };

  return (
    <>
      <div>
        <div className="delete-review-container">
          <h1 className="delete-modal-title">Confirm Delete</h1>
          <h3 className="delete-modal-subtitle">Are you sure you want to delete your review for this product?</h3>
          <div className="delete-cancel-button-container">
            <div className="delete-review-delete-button-container">
              <button onClick={confirmDelete} className="delete-review-button">
                Delete
              </button>
              <button onClick={closeModal} className="delete-review-cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteReview;
