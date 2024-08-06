import { FaRegUserCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import * as sessionActions from '../../redux/session';
import './ProfileButton.css';
import { NavLink, useNavigate } from 'react-router-dom';

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
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className="profile-dropdown-user-info-container">
              <div className="profile-dropdown-user-info">
                <span className="profile-dropdown-username">Hello, {user.username}</span>
                <div className="profile-dropdown-email-container">
                  <div className="profile-dropdown-email">{user.email}</div>
                </div>
              </div>
            </li>
            <li className="profile-dropdown-manage-listing-container">
              <NavLink
                to="/spots/current"
                className="profile-dropdown-manage-listing"
                onClick={closeMenu}
                style={{ textDecoration: 'none' }}
              >
                Manage Listings
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
                <button className="login-button-dropdown">
                  <OpenModalMenuItem
                    itemText="Log In"
                    modalComponent={<LoginFormModal />}
                    onItemClick={closeMenu}
                  />
                </button>
              </div>
              <div className="signup-button-container">
                <button className="signup-button-dropdown">
                  <OpenModalMenuItem
                    itemText="Sign Up"
                    modalComponent={<SignupFormModal navigate={navigate} />}
                    onItemClick={closeMenu}
                  />
                </button>
              </div>
            </div>
          </li>
        )}
      </ul>
    </>
  );
};

export default ProfileButton;
