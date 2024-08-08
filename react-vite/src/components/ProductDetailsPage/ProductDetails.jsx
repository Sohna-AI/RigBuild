import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

import { IoStar } from 'react-icons/io5';
import * as productActions from '../../redux/products';
import * as reviewActions from '../../redux/reviews';
import * as categoryActions from '../../redux/categories';
import { deleteWishlistProduct, setWishlistProduct } from '../../redux/wishlist';
import ReviewCard from './ReviewCard';
import './ProductDetails.css';
import RelatedProducts from './RelatedProducts';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector(productActions.selectProducts)?.products[productId];
  const wishlist = useSelector((state) => state.wishlist.products);
  const reviews = useSelector(reviewActions.selectReviews);
  const relatedProducts = useSelector((state) =>
    categoryActions.selectProductsByCategory(state, product?.category_id)
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(!!wishlist[productId]);
  const [visibleReviews, setVisibleReviews] = useState(4);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      setIsLoaded(false);

      try {
        await dispatch(productActions.getProductDetailsById(productId));
        await dispatch(reviewActions.loadReviewsByProductId(productId));
        await dispatch(categoryActions.getCategories());
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching product details and reviews:', error);
        setIsLoaded(true);
      }
    };
    fetchProductAndReviews();
  }, [dispatch, productId]);

  useEffect(() => {
    if (product?.category_id) {
      dispatch(categoryActions.getProductsByCategory(product.category_id));
    }
  }, [dispatch, product]);

  const otherProducts = relatedProducts ? relatedProducts.filter((p) => p.id !== product.id).slice(0, 4) : [];

  const handleWishlistChange = () => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) dispatch(setWishlistProduct(product));
    else dispatch(deleteWishlistProduct(productId));
  };

  const handleShowMoreReviews = () => {
    setVisibleReviews(visibleReviews + 5);
  };

  const handleShowLessReviews = () => {
    setVisibleReviews(4);
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
                        {product.reviews.length > 1 ? 'reviews' : ''}{' '}
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
                <div className="product-details-reviews-products-container">
                  <div className="product-details-reviews-container">
                    <div className="product-details-reviews">
                      <h1 className="product-details-reviews-header">Reviews</h1>
                      <ul className="product-details-review-card-container">
                        {reviews[productId]?.allIds.slice(0, visibleReviews).map((reviewId) => {
                          const review = reviews[productId].reviews[reviewId];
                          return (
                            <li className="product-details-review-card" key={review.id}>
                              <ReviewCard
                                id={review.id}
                                rating={review.rating}
                                review={review.review}
                                created_at={review.created_at}
                                user={review.user.username}
                              />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    {visibleReviews < reviews[productId]?.allIds.length && (
                      <div className="show-more-reviews-button-container">
                        {' '}
                        <button onClick={handleShowMoreReviews} className="show-more-reviews-button">
                          Show More Reviews
                        </button>
                      </div>
                    )}
                    {visibleReviews > 4 && (
                      <div className='show-less-reviews-button-container'>
                        <button onClick={handleShowLessReviews} className="show-less-reviews-button">
                          Show Less Reviews
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="product-details-other-products-container">
                    <div className="product-details-other-products">
                      <h1 className="product-details-other-product-header">Other Products</h1>
                      <ul className="product-details-other-products-list-container">
                        {otherProducts.map((relatedProduct) => (
                          <li key={relatedProduct.id} className="product-details-other-product">
                            <RelatedProducts
                              id={relatedProduct.id}
                              name={relatedProduct.name}
                              price={relatedProduct.price}
                              rating={avgRating(relatedProduct.reviews)}
                              product_image={relatedProduct.product_images[0].image_url}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <footer className="product-details-page-footer-container">
                <div className="social-links">
                  <div>
                    <NavLink to="https://github.com/Sohna-AI" className="github-button-container">
                      <button className="github-button">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.296997 12 0.296997Z"
                            fill="white"
                          ></path>
                        </svg>
                        <p className="github-text">Pushpinder Singh</p>
                      </button>
                    </NavLink>
                  </div>
                  <div>
                    <NavLink
                      to="https://www.linkedin.com/in/pushpinder-s-03219b125/"
                      className="linkedin-button-container"
                    >
                      <button className="linked-in-button">
                        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              fill="#ffffff"
                              d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z"
                            ></path>
                          </g>
                        </svg>
                        <p className="linked-in-text">Pushpinder Singh</p>
                      </button>
                    </NavLink>
                  </div>
                </div>
                <div>
                  <NavLink to="/">
                    <img
                      src="../../../public/short-logo-light-mode.png"
                      className="product-page-logo-image"
                    />
                  </NavLink>
                </div>
              </footer>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
