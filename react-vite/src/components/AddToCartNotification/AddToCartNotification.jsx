import { AnimatePresence, motion } from 'framer-motion';
import './AddToCartNotification.css';

const AddToCartNotification = ({ isVisible, message, wishlist, addToCart,addToCartNotLoggedIn }) => {
  const chooseClassName = () => {
    if (wishlist) return 'wishlist-notification';
    if (addToCart) return 'add-to-cart-notification';
    if (addToCartNotLoggedIn) return 'add-cart-not-logged-in-notification'
  };
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
          className={chooseClassName()}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddToCartNotification;
