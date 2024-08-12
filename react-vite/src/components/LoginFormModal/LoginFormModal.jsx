import { useState, useRef, useEffect } from 'react';
import { thunkLogin } from '../../redux/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';
import SignupFormModal from '../SignupFormModal';
import * as sessionActions from '../../redux/session';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const { closeModal, setModalContent } = useModal();
  const ulRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
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

  const handleDemoLogin = async () => {
    try {
      await dispatch(sessionActions.loginAsDemoUser()).then(closeModal);
    } catch (error) {
      console.error('Demo Login failed:', error);
    }
  };

  const handleSignupClick = () => {
    setErrors({});
    setTransitioning(true);
    setTimeout(() => {
      setModalContent(<SignupFormModal />);
      setTransitioning(false);
    }, 300);
  };

  return (
    <div className={`login-form-modal-container ${transitioning ? 'fade-out' : ''}`}>
      <div className="login-form-modal-headers">
        <h1 className="login-form-modal-text">
          <img src="../../../public/short-logo-light-mode.svg" className="login-form-short-logo" />{' '}
          <div className="login-form-modal-subtext">Welcome</div>
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="login-form-container">
        <div className="login-form-label-container">
          <label className="login-label-input-group">
            <div className="login-form-label-error">
              Email
              {errors.email && <p className="login-form-error">{errors.email}</p>}
            </div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-form-email"
              required
            />
          </label>
          <label className="login-label-input-group">
            <div className="login-form-label-error">
              Password
              {errors.password && <p className="login-form-error">{errors.password}</p>}
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-form-password"
              required
            />
          </label>
        </div>
        <div className="login-form-login-demo-container">
          <div>
            <button type="submit" className="login-form-login-button" disabled={!email || !password}>
              Log In
            </button>
          </div>
          <div>
            <button className="login-form-demo-login" onClick={handleDemoLogin}>
              Login as Demo User
            </button>
          </div>
        </div>
      </form>
      <div className="login-form-signup-container">
        Don&apos;t have an account?{' '}
        {/* <OpenModalMenuItem
          itemText={<button className="login-form-signup-button">Signup</button>}
          modalComponent={<SignupFormModal />}
          onItemClick={closeMenu}
        /> */}
        <button className="login-form-signup-button" onClick={handleSignupClick}>
          Signup
        </button>
      </div>
    </div>
  );
}

export default LoginFormModal;
