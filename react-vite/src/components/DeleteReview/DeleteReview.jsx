import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteReviewById } from '../../redux/reviews';
import { useTheme } from '../../context/Theme';
import './DeleteReview.css';

const DeleteReview = ({ reviewId, productId }) => {
  const { closeModal } = useModal();
  const {theme} = useTheme()
  const dispatch = useDispatch();

  const confirmDelete = () => {
    dispatch(deleteReviewById(reviewId, productId));
    closeModal();
  };

  return (
    <>
      {theme === 'light'? (
         <div className="delete-review-container">
         <h1 className="delete-modal-title">Confirm Delete</h1>
         <h3 className="delete-modal-subtitle">Are you sure you want to delete your review for this product?</h3>
         <div className="delete-cancel-button-container">
           <div className="delete-review-delete-button-container">
             <button onClick={confirmDelete} className="delete-review-button">
             <span className="delete-review-button__text">Delete</span>
           <span className="delete-review-button__icon">
             <svg
               className="svg"
               height="512"
               viewBox="0 0 512 512"
               width="512"
               xmlns="http://www.w3.org/2000/svg"
             >
               <title></title>
               <path
                 d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"
                 style={{
                   fill: 'none',
                   stroke: '#fff',
                   strokeLinecap: 'round',
                   strokeLinejoin: 'round',
                   strokeWidth: '32px',
                 }}
               ></path>
               <line
                 style={{
                   stroke: '#fff',
                   strokeLinecap: 'round',
                   strokeMiterlimit: 10,
                   strokeWidth: '32px',
                 }}
                 x1="80"
                 x2="432"
                 y1="112"
                 y2="112"
               ></line>
               <path
                 d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"
                 style={{
                   fill: 'none',
                   stroke: '#fff',
                   strokeLinecap: 'round',
                   strokeLinejoin: 'round',
                   strokeWidth: '32px',
                 }}
               ></path>
               <line
                 style={{
                   fill: 'none',
                   stroke: '#fff',
                   strokeLinecap: 'round',
                   strokeLinejoin: 'round',
                   strokeWidth: '32px',
                 }}
                 x1="256"
                 x2="256"
                 y1="176"
                 y2="400"
               ></line>
               <line
                 style={{
                   fill: 'none',
                   stroke: '#fff',
                   strokeLinecap: 'round',
                   strokeLinejoin: 'round',
                   strokeWidth: '32px',
                 }}
                 x1="184"
                 x2="192"
                 y1="176"
                 y2="400"
               ></line>
               <line
                 style={{
                   fill: 'none',
                   stroke: '#fff',
                   strokeLinecap: 'round',
                   strokeLinejoin: 'round',
                   strokeWidth: '32px',
                 }}
                 x1="328"
                 x2="320"
                 y1="176"
                 y2="400"
               ></line>
             </svg>
           </span>
             </button>
             <button onClick={closeModal} className="delete-review-cancel-button">
               Cancel
             </button>
           </div>
         </div>
       </div>
      ):(
        <div className="delete-review-container-dark">
        <h1 className="delete-modal-title-dark">Confirm Delete</h1>
        <h3 className="delete-modal-subtitle-dark">Are you sure you want to delete your review for this product?</h3>
        <div className="delete-cancel-button-container">
          <div className="delete-review-delete-button-container">
            <button onClick={confirmDelete} className="delete-review-button">
            <span className="delete-review-button__text">Delete</span>
          <span className="delete-review-button__icon">
            <svg
              className="svg"
              height="512"
              viewBox="0 0 512 512"
              width="512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title></title>
              <path
                d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"
                style={{
                  fill: 'none',
                  stroke: '#fff',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: '32px',
                }}
              ></path>
              <line
                style={{
                  stroke: '#fff',
                  strokeLinecap: 'round',
                  strokeMiterlimit: 10,
                  strokeWidth: '32px',
                }}
                x1="80"
                x2="432"
                y1="112"
                y2="112"
              ></line>
              <path
                d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"
                style={{
                  fill: 'none',
                  stroke: '#fff',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: '32px',
                }}
              ></path>
              <line
                style={{
                  fill: 'none',
                  stroke: '#fff',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: '32px',
                }}
                x1="256"
                x2="256"
                y1="176"
                y2="400"
              ></line>
              <line
                style={{
                  fill: 'none',
                  stroke: '#fff',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: '32px',
                }}
                x1="184"
                x2="192"
                y1="176"
                y2="400"
              ></line>
              <line
                style={{
                  fill: 'none',
                  stroke: '#fff',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: '32px',
                }}
                x1="328"
                x2="320"
                y1="176"
                y2="400"
              ></line>
            </svg>
          </span>
            </button>
            <button onClick={closeModal} className="delete-review-cancel-button">
              Cancel
            </button>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default DeleteReview;
