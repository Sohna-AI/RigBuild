import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkSignup } from '../../redux/session';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import './SignupForm.css';
import { useNavigate } from 'react-router-dom';

function SignupFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const { closeModal, setModalContent } = useModal();
  const ulRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword: 'Passwords do not match',
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        first_name: firstName,
        last_name: lastName,
        password,
      })
    );
    navigate('/products');
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

  const handleLoginClick = () => {
    setErrors({});
    setTransitioning(true);
    setTimeout(() => {
      setModalContent(<LoginFormModal />);
      setTransitioning(false);
    }, 300);
  };

  return (
    <>
      <div className={`signup-form-headers-input-container ${transitioning ? 'fade-out' : ''}`}>
        <div className="signup-form-headers-container">
          <div>
            <img src="../../../public/short-logo-light-mode.svg" className="signup-form-short-logo" />
          </div>
          <p className="signup-form-header-subtext">
            Find all the parts you need for your new RIG whether it is for work, school or just kicking back
            to game
          </p>
        </div>
        {!transitioning && errors.server && <p className="signup-error">{errors.server}</p>}
        <form onSubmit={handleSubmit} className="signup-form-input-container">
          <h1>Create your account</h1>
          <label className="label-input-group">
            <div className="signup-form-label-error">
              Email
              {!transitioning && errors.email && <span className="signup-error">{errors.email}</span>}
            </div>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="label-input-group">
            <div className="signup-form-label-error">
              Username
              {!transitioning && errors.username && <span className="signup-error">{errors.username}</span>}
            </div>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label className="label-input-group">
            <div className="signup-form-label-error">
              First Name
              {!transitioning && errors.first_name && (
                <span className="signup-error">{errors.first_name}</span>
              )}
            </div>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
          <label className="label-input-group">
            <div className="signup-form-label-error">
              Last Name
              {!transitioning && errors.last_name && <span className="signup-error">{errors.last_name}</span>}
            </div>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
          <label className="label-input-group">
            <div className="signup-form-label-error">
              Password
              {!transitioning && errors.password && <span className="signup-error">{errors.password}</span>}
            </div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label className="label-input-group">
            <div className="signup-form-label-error">
              Confirm Password
              {!transitioning && errors.confirmPassword && (
                <span className="signup-error">{errors.confirmPassword}</span>
              )}
            </div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <div className="signup-form-signup-button-container">
            <button type="submit" className="signup-form-signup-button">
              Sign Up
            </button>
          </div>
          <div className="signup-form-existing-container">
            <div>Already have an account?</div>
            <button className="signup-form-login-button" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
