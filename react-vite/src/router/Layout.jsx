import { useEffect, useState, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ModalProvider, Modal } from '../context/Modal';
import { thunkAuthenticate } from '../redux/session';
import Navigation from '../components/Navigation/Navigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [theme, setTheme] = useState('light');
  const location = useLocation();
  const hasMountedRef = useRef(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';

    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme;
  };

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
        <AnimatePresence initial={false} mode="wait">
          {isLoaded && (
            <motion.div
              key={location.pathname}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
            >
              <Outlet />
            </motion.div>
          )}
        </AnimatePresence>
        <Modal />
      </ModalProvider>
    </>
  );
}
