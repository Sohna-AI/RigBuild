import { useNavigate } from 'react-router-dom';
import { IoStar } from 'react-icons/io5';
import './ProductCard.css';

export default function ProductCard({ id, name, price, rating, stock_quantity, product_image }) {
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
          <div className="product-add-to-cart-button">
            <button>Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
}
