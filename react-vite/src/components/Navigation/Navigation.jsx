import { useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCart from '../../components/ShoppingCart/ShoppingCart';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import * as cartActions from '../../redux/cart';

function Navigation({ isLoaded, toggleTheme, theme }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const cart = useSelector(cartActions.selectCartDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionUser === null) {
      setIsLoggedIn(false);
    } else setIsLoggedIn(true);
  }, [sessionUser]);

  const handleClick = () => {
    if (sessionUser) navigate('/products');
    else navigate('/');
  };

  useEffect(() => {
    if (sessionUser?.id) {
      dispatch(cartActions.getUserCart(sessionUser.id));
    }
  }, [dispatch, sessionUser]);

  const handleSellProductClick = () => {
    navigate('/products/new');
  };
  return (
    <ul className={theme === 'light' ? 'navigation-top-container' : 'navigation-top-container-dark'}>
      {theme === 'light' ? (
        <>
          <li className="short-logo-container">
            <div className="short-logo-container" onClick={handleClick}>
              <img src="/short-logo-light-mode.svg" className="short-logo" />
            </div>
          </li>
          <li>
            <div className="search-bar-container">
              <svg className="search-bar-icon" aria-hidden="true" viewBox="0 0 24 24">
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
              <input placeholder="Search" type="search" className="search-bar-input" />
            </div>
          </li>
          {isLoggedIn && isLoaded && (
            <li className="profile-cart-container">
              <button className="sell-product-button" onClick={handleSellProductClick}>
                Sell your Product
              </button>

              <OpenModalButton
                buttonText={
                  <div className="cart-icon-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.5em"
                      viewBox="0 0 576 512"
                      fill="rgb(17, 17, 17)"
                      className="cart-icon"
                    >
                      <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                    </svg>
                    {cart.total_items > 0 && <span className="cart-item-count">{cart.total_items}</span>}
                  </div>
                }
                modalComponent={<ShoppingCart />}
                shoppingCartButton={true}
              />
              <ProfileButton user={sessionUser} toggleTheme={toggleTheme} theme={theme} />
            </li>
          )}
          {!isLoggedIn && isLoaded && (
            <li className="profile-cart-container">
              <ProfileButton user={sessionUser} toggleTheme={toggleTheme} theme={theme} />
            </li>
          )}
        </>
      ) : (
        <>
          <li className="short-logo-container-dark">
            <div className="short-logo-container-dark" onClick={handleClick}>
              <img src="/short-logo-dark-mode.svg" className="short-logo-dark" />
            </div>
          </li>
          <li>
            <div className="search-bar-container-dark">
              <svg className="search-bar-icon-dark" aria-hidden="true" viewBox="0 0 24 24">
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
              <input placeholder="Search" type="search" className="search-bar-input-dark" />
            </div>
          </li>
          {isLoggedIn && isLoaded && (
            <li className="profile-cart-container-dark">
              <button className="sell-product-button-dark" onClick={handleSellProductClick}>
                Sell your Product
              </button>

              <OpenModalButton
                buttonText={
                  <div className="cart-icon-container-dark">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.5em"
                      viewBox="0 0 576 512"
                      fill="#FFFFFF"
                      className="cart-icon-dark"
                    >
                      <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                    </svg>
                    {cart.total_items > 0 && <span className="cart-item-count-dark">{cart.total_items}</span>}
                  </div>
                }
                modalComponent={<ShoppingCart />}
                shoppingCartButton={true}
              />
              <ProfileButton user={sessionUser} toggleTheme={toggleTheme} theme={theme} />
            </li>
          )}
          {!isLoggedIn && isLoaded && (
            <li className="profile-cart-container-dark">
              <ProfileButton user={sessionUser} toggleTheme={toggleTheme} theme={theme} />
            </li>
          )}
        </>
      )}
    </ul>
  );
}

export default Navigation;
