import { FaRegUserCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import * as sessionActions from '../../redux/session';
import './ProfileButton.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import OpenModalMenuItem from './OpenModalMenuItem';

const ProfileButton = ({ user, toggleTheme, theme }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ulRef = useRef();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.thunkLogout());
    navigate('/');
    closeMenu();
  };

  const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');
  return (
    <div className="profile-dropdown-container">
      {theme === 'light' ? (
        <>
          <FaRegUserCircle className="profile-button" onClick={toggleMenu} />
          <AnimatePresence>
            {showMenu && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={ulClassName}
                ref={ulRef}
              >
                {user ? (
                  <>
                    <li className="profile-dropdown-user-info-container">
                      <div className="profile-dropdown-user-info">
                        <span className="profile-dropdown-username">Welcome, {user.username}</span>
                      </div>
                    </li>
                    <li className="profile-dropdown-manage-listing-container">
                      <NavLink
                        to="/products/current"
                        className="profile-dropdown-manage-listing"
                        onClick={closeMenu}
                      >
                        Manage Listings
                      </NavLink>
                    </li>
                    <li className="profile-dropdown-wishlist-container">
                      <NavLink
                        to="/user/current/wishlist"
                        onClick={closeMenu}
                        className="profile-dropdown-wishlist"
                      >
                        Wishlist
                      </NavLink>
                    </li>
                    <li className="logout-button-dropdown-container">
                      <div onClick={logout} className="logout-button-dropdown">
                        Log Out
                      </div>
                    </li>
                  </>
                ) : (
                  <>
                    <OpenModalMenuItem
                      itemText={<div className="profile-dropdown-login">Login</div>}
                      modalComponent={<LoginFormModal />}
                      onItemClick={closeMenu}
                      profileDropdownLogin={true}
                    />
                    <OpenModalMenuItem
                      itemText={<div className="profile-dropdown-signup">Signup</div>}
                      modalComponent={<SignupFormModal navigate={navigate} />}
                      onItemClick={closeMenu}
                      profileDropdownSignup={true}
                    />
                  </>
                )}
                <li className="theme-toggle-container">
                  <div className="theme-toggle-button" onClick={toggleTheme}>
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </div>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </>
      ) : (
        <>
          <FaRegUserCircle className="profile-button" onClick={toggleMenu} />
          <AnimatePresence>
            {showMenu && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={ulClassName}
                ref={ulRef}
              >
                {user ? (
                  <>
                    <li className="profile-dropdown-user-info-container">
                      <div className="profile-dropdown-user-info">
                        <span className="profile-dropdown-username">Welcome, {user.username}</span>
                      </div>
                    </li>
                    <li className="profile-dropdown-manage-listing-container">
                      <NavLink
                        to="/products/current"
                        className="profile-dropdown-manage-listing"
                        onClick={closeMenu}
                        style={{ textDecoration: 'none' }}
                      >
                        Manage Listings
                      </NavLink>
                    </li>
                    <li className="profile-dropdown-wishlist-container">
                      <NavLink
                        to="/user/current/wishlist"
                        onClick={closeMenu}
                        className="profile-dropdown-wishlist"
                      >
                        Wishlist
                      </NavLink>
                    </li>
                    <li className="logout-button-dropdown-container">
                      <div onClick={logout} className="logout-button-dropdown">
                        Log Out
                      </div>
                    </li>
                  </>
                ) : (
                  <>
                    <OpenModalMenuItem
                      itemText={<div className="profile-dropdown-login">Login</div>}
                      modalComponent={<LoginFormModal />}
                      onItemClick={closeMenu}
                      profileDropdownLogin={true}
                    />
                    <OpenModalMenuItem
                      itemText={<div className="profile-dropdown-signup">Signup</div>}
                      modalComponent={<SignupFormModal navigate={navigate} />}
                      onItemClick={closeMenu}
                      profileDropdownSignup={true}
                    />
                  </>
                )}
                <li className="theme-toggle-container">
                  <div className="theme-toggle-button" onClick={toggleTheme}>
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </div>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default ProfileButton;
