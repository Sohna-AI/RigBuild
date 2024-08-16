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
  const location = useLocation();
  const hasMountedRef = useRef(false);
  // useEffect(() => {
  //   dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  // }, [dispatch]);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => {
      setIsLoaded(true);
    });
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
        <Navigation isLoaded={isLoaded} />
        <AnimatePresence initial={false} mode="wait">
          {isLoaded && (
            <motion.div
              key={location.pathname}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              // transition={{ duration: 0.3 }}
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
