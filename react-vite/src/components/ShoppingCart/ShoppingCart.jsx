import { useEffect } from 'react';
import './ShoppingCart.css';
import { useDispatch, useSelector } from 'react-redux';
import * as cartActions from '../../redux/cart';
import { NavLink } from 'react-router-dom';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(cartActions.selectCartDetails);
  const sessionUser = useSelector((state) => state.session.user);
  useEffect(() => {
    if (sessionUser?.id) {
      dispatch(cartActions.getUserCart(sessionUser.id));
    }
  }, [dispatch, sessionUser]);

  return (
    <div className="shopping-cart-container">
      <div className="shopping-cart">
        <div className="shopping-cart-header-container">
          <h5 className="shopping-cart-header">Your Cart</h5>
        </div>
        <div className="shopping-cart-products-container">
          {cart.products.length ? (
            cart.products.map((product, idx) => (
              <div className="shopping-cart-single-product" key={idx}>
                <NavLink to={`/products/${product.product.id}`}>
                  <img
                    src={product.product.product_images[0].image_url}
                    className="shopping-cart-product-image"
                  />
                </NavLink>
                <div className="shopping-cart-product-info">
                  <div className="shopping-cart-product-name">{product.product.name}</div>
                  <div className="cart-quantity-price-container">
                    <div className="quantity-container">
                      <div className="quantity">
                        <button className="quantity-button" id="negative">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            height="14"
                            width="14"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinejoin="round"
                              strokeLinecap="round"
                              strokeWidth="2.5"
                              stroke="#47484b"
                              d="M20 12L4 12"
                            ></path>
                          </svg>
                        </button>
                        <label>{product.quantity}</label>
                        <button className="quantity-button" id="positive">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            height="14"
                            width="14"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinejoin="round"
                              strokeLinecap="round"
                              strokeWidth="2.5"
                              stroke="#47484b"
                              d="M12 4V20M20 12H4"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="shopping-cart-product-price">${product.product.price}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="shopping-cart-empty-container">
              <h1 className="shopping-cart-empty-header">Cart is empty</h1>
            </div>
          )}
        </div>
        <div className="cart-checkout-container">
          <div className="cart-checkout-header-container">
            <h3 className="cart-checkout-header">Checkout</h3>
          </div>
          <div>
            <div className="cart-checkout-subtitle-container">
              <h5 className="cart-checkout-subtitle">Your cart subtotal:</h5>
              <h4>${cart.totalPrice.toFixed(2)}</h4>
            </div>
          </div>
          <div className="cart-checkout-total-checkout-button">
            <div className="cart-checkout-total">
              <span style={{ fontSize: '20px' }}>$</span>
              {cart.totalPrice}
            </div>
            <div>
              <button className="cart-checkout-button">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
