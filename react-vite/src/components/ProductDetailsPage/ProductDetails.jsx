import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { IoStar } from 'react-icons/io5';
import * as productActions from '../../redux/products';
import * as reviewActions from '../../redux/reviews';
import './ProductDetails.css';
import { deleteWishlistProduct, setWishlistProduct } from '../../redux/wishlist';
import ReviewCard from './ReviewCard';
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector(productActions.selectProducts)?.products[productId];
  const wishlist = useSelector((state) => state.wishlist.products);
  const reviews = useSelector(reviewActions.selectReviews);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(!!wishlist[productId]);
  const modalRef = useRef(null);
  console.log('REVIEWS', reviews);
  useEffect(() => {
    const fetchProductAndReviews = async () => {
      setIsLoaded(false);

      try {
        await dispatch(productActions.getProductDetailsById(productId));
        await dispatch(reviewActions.loadReviewsByProductId(productId));
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching product details and reviews:', error);
        setIsLoaded(true);
      }
    };
    fetchProductAndReviews();
  }, [dispatch, productId]);

  const handleWishlistChange = () => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) dispatch(setWishlistProduct(product));
    else dispatch(deleteWishlistProduct(productId));
  };

  const StarRating = ({ rating }) => {
    const filledStars = [];
    for (let i = 0; i < 5; i++) {
      filledStars.push(<IoStar key={i} color={i < rating ? '#e99f4c' : 'gray'} size={20} />);
    }
    return <div className="rating-stars">{filledStars}</div>;
  };

  const avgRating = (reviews) => {
    let ratings = 0;
    reviews.map((review) => {
      ratings += review.rating;
    });
    return (ratings / reviews.length).toFixed(2);
  };

  return (
    <>
      {isLoaded && (
        <>
          {product && (
            <>
              <div className="product-details-page-container">
                <div className="product-details-page">
                  <div>
                    <img src={product.product_images[0].image_url} className="product-detail-image" />
                  </div>
                  <div className="product-info-container">
                    <div className="product-name-description-container">
                      <p className="product-detail-name">{product.name}</p>
                      <p>Description:</p>
                      <div className="product-detail-description">{product.description}</div>
                    </div>
                    <div className="product-rating-cart">
                      <div className="product-rating">
                        {product.reviews.length ? product.reviews.length : 'No reviews'}{' '}
                        {product.reviews.length > 1 ? 'reviews' : 'review'}{' '}
                        <StarRating rating={avgRating(product.reviews)} />
                      </div>
                      <div className="product-price-quantity">
                        <div className="product-price">${product.price}</div>
                        <div className="product-quantity">Quantity:{product.stock_quantity}</div>
                      </div>
                    </div>
                    <div className="buttons-cart-wishlist">
                      <div>
                        <button className="cart-button">
                          {' '}
                          <span className="IconContainer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 576 512"
                              fill="rgb(17, 17, 17)"
                              className="cart-icon"
                            >
                              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                            </svg>
                          </span>
                          <p className="cart-text">Add to Cart</p>
                        </button>
                      </div>
                      <div className="product-favorite-button">
                        <input
                          value="favorite-button"
                          name="favorite-checkbox"
                          id="favorite"
                          checked={isWishlisted}
                          onChange={handleWishlistChange}
                          type="checkbox"
                        />
                        <label className="container" htmlFor="favorite">
                          <svg
                            className="feather feather-heart"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 24 24"
                            height="24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                          <div className="action">
                            <span className="option-1">Add to Wishlist</span>
                            <span className="option-2">Added to Wishlist</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="product-details-reviews-container">
            <div>
              <h1>Reviews</h1>
            </div>
            <div>
              <ul>
                {reviews[productId].allIds.map((reviewId) => {
                  const review = reviews[productId].reviews[reviewId];
                  return (
                    <div className="product-details-review-card" key={review.id}>
                      <ReviewCard
                        id={review.id}
                        rating={review.rating}
                        review={review.review}
                        created_at={review.created_at}
                        user={review.user.username}
                      />
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
