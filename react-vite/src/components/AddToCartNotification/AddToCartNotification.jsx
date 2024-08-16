import { AnimatePresence, motion } from 'framer-motion';

const AddToCartNotification = ({ isVisible, message }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="add-to-cart-notification"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddToCartNotification;
