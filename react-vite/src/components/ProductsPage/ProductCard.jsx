import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoStar } from 'react-icons/io5';
import { deleteWishlistProduct, setWishlistProduct } from '../../redux/wishlist';
import * as cartActions from '../../redux/cart';
import DeleteProduct from '../DeleteProduct/DeleteProduct';

import './ProductCard.css';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import AddToCartNotification from '../AddToCartNotification/AddToCartNotification';
import { useTheme } from '../../context/Theme';

export default function ProductCard({
  id,
  name,
  price,
  rating,
  description,
  stock_quantity,
  product_image,
  user_products,
  showWishlistButton = false,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const wishlist = showWishlistButton ? useSelector((state) => state.wishlist) : null;
  const isProductInWishlist = wishlist ? Boolean(wishlist.products[id]) : false;
  const cart = useSelector(cartActions.selectCartDetails);
  const [isWishlisted, setIsWishlisted] = useState(isProductInWishlist);
  const [showNotification, setShowNotification] = useState(false);
  const { theme } = useTheme();
  const [key, setKey] = useState(0);

  let productDescription;
  if (description) {
    productDescription = description.split('').slice(0, 200).join('') + '...';
  }
  const [visibleDescription, setVisibleDescription] = useState(productDescription);
  const [showFullDes, setShowFullDes] = useState(false);

  useEffect(() => {
    setIsWishlisted(isProductInWishlist);
  }, [isProductInWishlist]);

  const handleClick = () => {
    navigate(`/products/${id}`);
  };

  const handleShowFullDescription = () => {
    setShowFullDes(true);
    setVisibleDescription(description);
  };

  const handleShowLessDescription = () => {
    setShowFullDes(false);
    setVisibleDescription(productDescription);
  };

  const StarRating = ({ rating }) => {
    const filledStars = [];
    for (let i = 0; i < 5; i++) {
      filledStars.push(<IoStar key={i} color={i < rating ? '#e99f4c' : 'gray'} size={20} />);
    }
    return <div className="rating-stars">{filledStars}</div>;
  };

  const handleEditButton = () => {
    navigate(`/products/${id}/edit`);
  };

  const handleWishlistChange = () => {
    if (sessionUser) {
      if (!isWishlisted) {
        dispatch(setWishlistProduct(id));
      } else {
        dispatch(deleteWishlistProduct(id));
      }
      setIsWishlisted(!isWishlisted);
    }
  };

  useEffect(() => {
    if (sessionUser?.id) {
      dispatch(cartActions.getUserCart(sessionUser.id));
    }
  }, [dispatch, sessionUser]);

  const handleAddToCart = async () => {
    if (!sessionUser) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    } else {
      const product = {
        cartId: cart?.id,
        productId: id,
      };
      await dispatch(cartActions.thunkAddToCart(product.cartId, product.productId));
      await dispatch(cartActions.getUserCart(sessionUser?.id));

      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 1000);
    }
  };

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [theme]);

  return (
    <>
      {!user_products && (
        <div className="product-card">
          <div className="product-image-container">
            <img src={product_image} className="product-image" onClick={handleClick} />
          </div>
          <div className="product-name">
            <p>{name}</p>
          </div>
          <div className="rating-quantity-container">
            <div className="product-rating">
              <StarRating rating={rating} />
            </div>
            <div className="product-quantity">
              <span style={{ paddingRight: '5px' }}>Quantity:</span>
              {stock_quantity}
            </div>
          </div>
          <div className="product-price-add-cart-container">
            <div className="product-price">${price}</div>
            {!showWishlistButton ? (
              <div className="product-page-add-to-cart-button">
                <button className="product-page-cart-button" onClick={() => handleAddToCart()}>
                  {' '}
                  <span className="product-page-IconContainer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 576 512"
                      fill="rgb(17, 17, 17)"
                      className="product-page-cart-icon"
                    >
                      <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                    </svg>
                  </span>
                  <p className="product-page-cart-text">Add to Cart</p>
                </button>
                <div className="item-added-to-cart-container">
                  {sessionUser && (
                    <AddToCartNotification isVisible={showNotification} message="Item added to cart!" />
                  )}
                  {!sessionUser && (
                    <div>
                      <AddToCartNotification
                        isVisible={showNotification}
                        message="Login to add to the cart!"
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
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
                    viewBox="0 0 24 22"
                    height="15"
                    width="15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </label>
              </div>
            )}
          </div>
        </div>
      )}
      {user_products && (
        <div key={key}>
          {theme === 'light' ? (
            <div className="users-product-card">
              <div className="users-product-image-container">
                <img
                  src={product_image}
                  className="users-product-image"
                  onClick={handleClick}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div className="users-product-info-container">
                <div className="users-product-name-description-container">
                  <p className="users-product-name">{name}</p>
                  {!showFullDes && description.length >= 200 && (
                    <div className="users-product-description">
                      {visibleDescription}
                      <button
                        className="users-product-show-full-des-button"
                        onClick={handleShowFullDescription}
                      >
                        show more
                      </button>
                    </div>
                  )}
                  {showFullDes && description.length >= 200 && (
                    <div className="users-product-description">
                      {visibleDescription}
                      <button
                        className="users-product-show-less-des-button"
                        onClick={handleShowLessDescription}
                      >
                        show less
                      </button>
                    </div>
                  )}
                </div>
                <div className="users-product-rating-price-edit-delete-button">
                  <div className="users-product-rating-price-container">
                    <StarRating rating={rating} />
                    <span className="users-product-price">${price}</span>
                  </div>
                  <div className="users-product-edit-delete-container">
                    <button className="users-product-edit-button" onClick={handleEditButton}>
                      <svg
                        className="user-product-card-edit-icon"
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
                    </button>
                    <OpenModalButton
                      buttonText={
                        <svg
                          viewBox="0 0 15 17.5"
                          height="17.5"
                          width="15"
                          xmlns="http://www.w3.org/2000/svg"
                          className="user-product-card-delete-icon"
                        >
                          <path
                            transform="translate(-2.5 -1.25)"
                            d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
                            id="Fill"
                          ></path>
                        </svg>
                      }
                      modalComponent={<DeleteProduct productId={id} current={true} />}
                      productDeleteOnCurrent={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="users-product-card-dark">
              <div className="users-product-image-container">
                <img
                  src={product_image}
                  className="users-product-image"
                  onClick={handleClick}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div className="users-product-info-container">
                <div className="users-product-name-description-container">
                  <p className="users-product-name">{name}</p>
                  {!showFullDes && description.length >= 200 && (
                    <div className="users-product-description">
                      {visibleDescription}
                      <button
                        className="users-product-show-full-des-button"
                        onClick={handleShowFullDescription}
                      >
                        show more
                      </button>
                    </div>
                  )}
                  {showFullDes && description.length >= 200 && (
                    <div className="users-product-description">
                      {visibleDescription}
                      <button
                        className="users-product-show-less-des-button"
                        onClick={handleShowLessDescription}
                      >
                        show less
                      </button>
                    </div>
                  )}
                </div>
                <div className="users-product-rating-price-edit-delete-button">
                  <div className="users-product-rating-price-container">
                    <StarRating rating={rating} />
                    <span className="users-product-price">${price}</span>
                  </div>
                  <div className="users-product-edit-delete-container">
                    <button className="users-product-edit-button" onClick={handleEditButton}>
                      <svg
                        className="user-product-card-edit-icon"
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
                    </button>
                    <OpenModalButton
                      buttonText={
                        <svg
                          viewBox="0 0 15 17.5"
                          height="17.5"
                          width="15"
                          xmlns="http://www.w3.org/2000/svg"
                          className="user-product-card-delete-icon"
                        >
                          <path
                            transform="translate(-2.5 -1.25)"
                            d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
                            id="Fill"
                          ></path>
                        </svg>
                      }
                      modalComponent={<DeleteProduct productId={id} current={true} />}
                      productDeleteOnCurrent={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
