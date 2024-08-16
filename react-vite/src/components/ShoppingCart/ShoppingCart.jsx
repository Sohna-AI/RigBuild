import { useEffect } from 'react';
import './ShoppingCart.css';
import { useDispatch, useSelector } from 'react-redux';
import * as cartActions from '../../redux/cart';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(cartActions.selectCartDetails);
  const sessionUser = useSelector((state) => state.session.user);
  useEffect(() => {
    if (sessionUser?.id) {
      dispatch(cartActions.getUserCart(sessionUser.id));
    }
  }, [dispatch, sessionUser]);

  const handleDecreaseQuantity = (product) => {
    const newQuantity = product.quantity > 1 ? product.quantity - 1 : 1;
    dispatch(cartActions.thunkUpdateCartQuantity(cart.id, product.id, newQuantity));
  };

  const handleIncreaseQuantity = (product) => {
    const newQuantity =
      product.quantity < product.product.stock_quantity
        ? product.quantity + 1
        : product.product.stock_quantity;
    dispatch(cartActions.thunkUpdateCartQuantity(cart.id, product.id, newQuantity));
  };

  const formattedPrice = (price) => {
    if (typeof price === 'string') {
      return parseFloat(price).toFixed(2);
    } else return price.toFixed(2);
  };

  const handleRemoveItem = (product) => {
    dispatch(cartActions.thunkRemoveFromCart(cart.id, product.id));
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="shopping-cart-container">
      <div className="shopping-cart">
        <div className="shopping-cart-header-container">
          <h5 className="shopping-cart-header">Your Cart</h5>
        </div>
        <div className="shopping-cart-products-container">
          {cart.products.length ? (
            cart.products.map((product, idx) => (
              <motion.div
                key={idx}
                className="shopping-cart-single-product"
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                variants={itemVariants}
              >
                <NavLink to={`/products/${product.product.id}`}>
                  <img
                    src={product.product.product_images[0].image_url}
                    className="shopping-cart-product-image"
                  />
                </NavLink>
                <div className="shopping-cart-product-info">
                  <div className="shopping-cart-product-name">
                    {product.product.name}
                    <div className="shopping-cart-remove-product-button-container">
                      <button
                        onClick={() => handleRemoveItem(product)}
                        className="shopping-cart-remove-product-button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-quantity-price-container">
                    <div className="quantity-container">
                      <div className="quantity">
                        <button
                          className="quantity-button"
                          id="negative"
                          onClick={() => handleDecreaseQuantity(product)}
                        >
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
                        <button
                          className="quantity-button"
                          id="positive"
                          onClick={() => handleIncreaseQuantity(product)}
                        >
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
                    <div className="shopping-cart-product-price">
                      ${formattedPrice(product.product.price)}
                    </div>
                  </div>
                </div>
              </motion.div>
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
              <h4>${formattedPrice(cart.totalPrice)}</h4>
            </div>
          </div>
          <div className="cart-checkout-total-checkout-button">
            <div className="cart-checkout-total">
              <span style={{ fontSize: '20px' }}>$</span>
              {formattedPrice(cart.totalPrice)}
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
