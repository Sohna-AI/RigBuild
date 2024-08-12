import { useNavigate } from 'react-router-dom';
import { IoStar } from 'react-icons/io5';
import './ProductCard.css';
import { useState } from 'react';

export default function ProductCard({
  id,
  name,
  price,
  rating,
  description,
  stock_quantity,
  product_image,
  user_products,
}) {
  const navigate = useNavigate();
  let productDescription;
  if (description) {
    productDescription = description.split('').slice(0, 200).join('') + '...';
  }
  const [visibleDescription, setVisibleDescription] = useState(productDescription);
  const [showFullDes, setShowFullDes] = useState(false);

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

  return (
    <>
      {!user_products && (
        <div className="product-card" onClick={handleClick}>
          <div className="product-image-container">
            <img src={product_image} className="product-image" />
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
            <div className="product-page-add-to-cart-button">
              <button className="product-page-cart-button">
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
            </div>
          </div>
        </div>
      )}
      {user_products && (
        <div className="users-product-card">
          <div className="users-product-image-container">
            <img src={product_image} className="users-product-image" />
          </div>
          <div className="users-product-info-container">
            <div className="users-product-name-description-container">
              <p className="users-product-name">{name}</p>
              {!showFullDes && description.length >= 200 && (
                <div className="users-product-description">
                  {visibleDescription}
                  <button className="users-product-show-full-des-button" onClick={handleShowFullDescription}>
                    show more
                  </button>
                </div>
              )}
              {showFullDes && description.length >= 200 && (
                <div className="users-product-description">
                  {visibleDescription}
                  <button className="users-product-show-less-des-button" onClick={handleShowLessDescription}>
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
                  Edit
                </button>
                <button className="users-product-delete-button">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
