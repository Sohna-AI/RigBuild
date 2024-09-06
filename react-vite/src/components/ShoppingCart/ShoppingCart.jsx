import { useEffect, useState } from 'react';
import './ShoppingCart.css';
import { useDispatch, useSelector } from 'react-redux';
import * as cartActions from '../../redux/cart';
import { NavLink } from 'react-router-dom';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useTheme } from '../../context/Theme';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(cartActions.selectCartDetails);
  const sessionUser = useSelector((state) => state.session.user);
  const { theme } = useTheme();
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (sessionUser?.id) {
      dispatch(cartActions.getUserCart(sessionUser.id));
    }
  }, [dispatch, sessionUser]);

  const handleDecreaseQuantity = async (product) => {
    const newQuantity = product.quantity > 1 ? product.quantity - 1 : 1;
    await dispatch(cartActions.thunkUpdateCartQuantity(cart.id, product.id, newQuantity));
    await dispatch(cartActions.getUserCart(sessionUser.id));
  };

  const handleIncreaseQuantity = async (product) => {
    const newQuantity =
      product.quantity < product.product.stock_quantity
        ? product.quantity + 1
        : product.product.stock_quantity;
    await dispatch(cartActions.thunkUpdateCartQuantity(cart.id, product.id, newQuantity));
    await dispatch(cartActions.getUserCart(sessionUser.id));
  };

  const formattedPrice = (price) => {
    if (typeof price === 'string') {
      return parseFloat(price).toFixed(2);
    } else return price.toFixed(2);
  };

  const handleRemoveItem = async (product) => {
    await dispatch(cartActions.thunkRemoveFromCart(cart.id, product.id));
    await dispatch(cartActions.getUserCart(sessionUser.id));
  };

  const priceMotionValue = useMotionValue(cart.total_price || 0);

  useEffect(() => {
    if (cart.total_price !== undefined) {
      const controls = animate(priceMotionValue, cart.total_price, {
        duration: 0.5,
        onUpdate: (latest) => {
          if (isNaN(latest)) {
            priceMotionValue.set(0);
          }
        },
      });
      return controls.stop;
    }
  }, [cart.total_price, priceMotionValue]);

  const price = useTransform(priceMotionValue, (value) => formattedPrice(value));

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [theme]);

  return (
    <div key={key}>
      {theme === 'light' ? (
        <div className="shopping-cart-container">
          <div className="shopping-cart">
            <div className="shopping-cart-header-container">
              <h5 className="shopping-cart-header">Your Cart</h5>
              <h5>Total items: {cart.total_items ? cart.total_items : 0}</h5>
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
                  <motion.h1
                    className="shopping-cart-empty-header"
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                    variants={itemVariants}
                  >
                    Cart is empty
                  </motion.h1>
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
                  <h4>
                    $<motion.span style={{ display: 'inline-block' }}>{price}</motion.span>
                  </h4>
                </div>
              </div>
              <div className="cart-checkout-total-checkout-button">
                <motion.div
                  key={cart.total_price}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="cart-checkout-total">
                    <span style={{ fontSize: '20px' }}>$</span>
                    <motion.span>{price}</motion.span>
                  </div>
                </motion.div>
                <div>
                  <button className="cart-checkout-button">Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="shopping-cart-container-dark">
          <div className="shopping-cart-dark">
            <div className="shopping-cart-header-container-dark">
              <h5 className="shopping-cart-header-dark">Your Cart</h5>
              <h5>Total items: {cart.total_items ? cart.total_items : 0}</h5>
            </div>
            <div className="shopping-cart-products-container-dark">
              {cart.products.length ? (
                cart.products.map((product, idx) => (
                  <motion.div
                    key={idx}
                    className="shopping-cart-single-product-dark"
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    variants={itemVariants}
                  >
                    <NavLink to={`/products/${product.product.id}`}>
                      <img
                        src={product.product.product_images[0].image_url}
                        className="shopping-cart-product-image-dark"
                      />
                    </NavLink>
                    <div className="shopping-cart-product-info-dark">
                      <div className="shopping-cart-product-name-dark">
                        {product.product.name}
                        <div className="shopping-cart-remove-product-button-container-dark">
                          <button
                            onClick={() => handleRemoveItem(product)}
                            className="shopping-cart-remove-product-button-dark"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="cart-quantity-price-container-dark">
                        <div className="quantity-container-dark">
                          <div className="quantity-dark">
                            <button
                              className="quantity-button-dark"
                              id="negative-dark"
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
                              className="quantity-button-dark"
                              id="positive-dark"
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
                        <div className="shopping-cart-product-price-dark">
                          ${formattedPrice(product.product.price)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="shopping-cart-empty-container-dark">
                  <motion.h1
                    className="shopping-cart-empty-header-dark"
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                    variants={itemVariants}
                  >
                    Cart is empty
                  </motion.h1>
                </div>
              )}
            </div>
            <div className="cart-checkout-container-dark">
              <div className="cart-checkout-header-container-dark">
                <h3 className="cart-checkout-header-dark">Checkout</h3>
              </div>
              <div>
                <div className="cart-checkout-subtitle-container-dark">
                  <h5 className="cart-checkout-subtitle-dark">Your cart subtotal:</h5>
                  <h4>
                    $<motion.span style={{ display: 'inline-block' }}>{price}</motion.span>
                  </h4>
                </div>
              </div>
              <div className="cart-checkout-total-checkout-button-dark">
                <motion.div
                  key={cart.total_price}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="cart-checkout-total-dark">
                    <span style={{ fontSize: '20px' }}>$</span>
                    <motion.span>{price}</motion.span>
                  </div>
                </motion.div>
                <div>
                  <button className="cart-checkout-button-dark">Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
