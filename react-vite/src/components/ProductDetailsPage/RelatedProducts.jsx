import { useNavigate } from 'react-router-dom';
import { IoStar } from 'react-icons/io5';
import './RelatedProducts.css';

export default function RelatedProducts({ id, name, price, rating, product_image }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${id}`);
  };

  const StarRating = ({ rating }) => {
    const filledStars = [];
    for (let i = 0; i < 5; i++) {
      filledStars.push(<IoStar key={i} color={i < rating ? '#e99f4c' : 'gray'} size={20} />);
    }
    return <div className="rating-stars">{filledStars}</div>;
  };

  return (
    <>
      <div className="related-product-card" onClick={handleClick}>
        <div className="related-product-image-container">
          <img src={product_image} className="related-product-iamge" />
        </div>
        <div className="related-product-name">
          <p>{name}</p>
        </div>
        <div className="related-product-rating">
          <div>
            <StarRating rating={rating} />
          </div>
        </div>
        <div className="related-product-price-cart">
          <div>${price}</div>
          <div className='related-product-cart-button-container'>
            <button className="related-product-cart-button">
              {' '}
              <span className="related-product-IconContainer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                  fill="rgb(17, 17, 17)"
                  className="related-product-cart-icon"
                >
                  <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                </svg>
              </span>
              <p className="related-product-cart-text">Add to Cart</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
