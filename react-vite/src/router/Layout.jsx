import { useEffect, useState, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ModalProvider, Modal } from '../context/Modal';
import { thunkAuthenticate } from '../redux/session';
import Navigation from '../components/Navigation/Navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../context/Theme';

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const hasMountedRef = useRef(false);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
  }, [location.pathname]);

  return (
    <>
      <ModalProvider>
        <Navigation isLoaded={isLoaded} toggleTheme={toggleTheme} theme={theme} />
        <div>
          {isLoaded && <Outlet />}
          <Modal />
        </div>
      </ModalProvider>
    </>
  );
}
