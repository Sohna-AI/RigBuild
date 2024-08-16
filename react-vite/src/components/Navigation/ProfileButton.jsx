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

const ProfileButton = ({ user }) => {
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
                    <div className="profile-dropdown-email-container">
                      <div className="profile-dropdown-email">{user.email}</div>
                    </div>
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
                <li>
                  <NavLink to="/user/current/wishlist" onClick={closeMenu} style={{ textDecoration: 'none' }}>
                    Wishlist
                  </NavLink>
                </li>
                <li>
                  <div className="logout-button-container">
                    <button onClick={logout} className="logout-button-dropdown">
                      Log Out
                    </button>
                  </div>
                </li>
              </>
            ) : (
              <li>
                <div className="login-signup-button-container">
                  <div className="login-button-container">
                    <OpenModalButton
                      buttonText="Log In"
                      modalComponent={<LoginFormModal />}
                      onButtonClick={closeMenu}
                      profileDropdownLogin={true}
                    />
                  </div>
                  <div className="signup-button-container">
                    <OpenModalButton
                      buttonText="Sign Up"
                      modalComponent={<SignupFormModal navigate={navigate} />}
                      onButtonClick={closeMenu}
                      profileDropdownSignup={true}
                    />
                  </div>
                </div>
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfileButton;
