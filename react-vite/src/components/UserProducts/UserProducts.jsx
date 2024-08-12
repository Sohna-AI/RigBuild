import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from '../ProductsPage/ProductCard';
import * as productActions from '../../redux/products';
import './UserProducts.css';

const UserProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const products = useSelector(productActions.selectProducts);

  useEffect(() => {
    const fetchUserProducts = async () => {
      await dispatch(productActions.getUserProducts());
      setIsLoaded(true);
    };

    fetchUserProducts();
  }, [dispatch]);

  const avgRating = (reviews) => {
    let ratings = 0;
    reviews.map((review) => {
      ratings += review.rating;
    });
    return (ratings / reviews.length).toFixed(2);
  };

  const handleClick = () => {
    navigate('/products/new');
  };

  return (
    <>
      <div className="single-product-for-user-container">
        {isLoaded && products.allIds.length ? (
          products.allIds.length &&
          products.allIds.map((productId) => {
            const product = products.products[productId];
            return (
              <div className="user-product" key={product.id}>
                <ProductCard
                  id={productId}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  rating={avgRating(product.reviews)}
                  stock_quantity={product.stock_quantity}
                  product_image={product.product_images[0]?.image_url}
                  user_products={true}
                />
              </div>
            );
          })
        ) : (
          <>
            <div className="users-no-products-container">
              <h1>You have not listed any products</h1>

              <button className="users-no-products-sell-button" onClick={handleClick}>
                Sell your Product
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserProducts;
