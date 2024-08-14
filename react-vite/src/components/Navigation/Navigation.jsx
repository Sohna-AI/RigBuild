import { useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useSelector } from 'react-redux';
import ShoppingCart from '../../components/ShoppingCart/ShoppingCart';
import OpenModalButton from '../OpenModalButton/OpenModalButton';

function Navigation({ isLoaded }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionUser === null) {
      setIsLoggedIn(false);
    } else setIsLoggedIn(true);
  }, [sessionUser]);

  const handleClick = () => {
    if (sessionUser) navigate('/products');
    else navigate('/');
  };

  const handleSellProductClick = () => {
    navigate('/products/new');
  };
  return (
    <ul className="navigation-top-container">
      <li className="short-logo-container">
        <div className="short-logo-container" onClick={handleClick}>
          <img src="/short-logo-light-mode.png" className="short-logo" />
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
            buttonText={<AiOutlineShoppingCart className="cart" />}
            modalComponent={<ShoppingCart />}
            shoppingCartButton={true}
          />
          <ProfileButton user={sessionUser} />
        </li>
      )}
      {!isLoggedIn && isLoaded && (
        <li className="profile-cart-container">
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
